import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom'; 

const AddInstance = () => {

  let navigate = useNavigate();
  const [course, setCourse] = useState([]);
  let [selectValue, setSelect] = useState('');

  const[instance, setInstance] = useState({
    "semester":'',
    "year":'',
    "courseId":''
  })
  const{year, semester}= instance;


  const loadCourse = async () =>{
    const res = await axios.get(
      `http://localhost:8083/api/viewAllCourses`,{
      validateStatus : () =>{
        return true;
      },
    }
    );
    if(res.status === 302){
      setCourse(res.data);
    }
  }
  useEffect(() => {
    loadCourse();
  }, []);

  // const uniqueCourses = [...new Set(course.map(i => i.courseId))];


  const handleInputChange = (e) => {
    setInstance({...instance,[e.target.name]: e.target.value})
  };

  const saveInstance = async(e) =>{
    console.log("Data Values : ", instance);
    e.preventDefault();
    await axios.post("http://localhost:8083/api/createInstances", instance);
    navigate("/View Instance");
  }

  const handleDrop = async (e) => {
    e.preventDefault();
    // const CourseID = e.target.value;
    // console.log("CourseID :: ", CourseID);
    setSelect(e.target.value);
    setInstance((prevInstance) =>({
      ...prevInstance,
      courseId: selectValue
    }));
  };

//sm-8 py-2 px-5   cancel-sm-2

  // onChange={(e) => handleInputChange(e)}
  return (
    <div className='container mt-4 col-sm-4 py-1 px-3'>
      <form onSubmit={(e) => saveInstance(e)}>
        <div className='col-6 text-center mb-3'>
          <select className='form-select' aria-label='Default select example'  onClick={handleDrop} onChange={handleDrop} value={selectValue}>
            <option value="" defaultValue>Select Course</option>           
            {course.map((i, index) => (
              <option key={index} value={i.courseId} >{i.courseCode}</option>
            ))}
          </select>
        </div>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='Semester'>Semester</label>
          <input 
           className='form-control col-sm-6'
           type='text'
           name='semester'
           id = 'semester'
           required value={semester}
           onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='Year'>Academic Year</label>
          <input
           className='form-control col-sm-6'
           type='text'
           name='year'
           id='year'
           required value={year}
           onChange={(e)=> handleInputChange(e)}
           />
        </div>
        <div className='row mb-5'>
          <div className='col sm-2'>
            <button type='submit' className='btn btn-outline-success btn-lg'>Save</button>
          </div>
          <div className='col sm-2'>
            <Link to={"/View Instance"} type='submit' className='btn btn-outline-warning btn-lg'>Cancel</Link>
          </div>
        </div>
      </form>
      
    </div>
  )
}

export default AddInstance