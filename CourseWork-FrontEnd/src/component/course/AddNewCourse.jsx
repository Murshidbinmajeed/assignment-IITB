import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddNewCourse = () => {

    let navigate = useNavigate();

    const[course, setCourses] = useState({
        courseTitle : '',
        courseCode: '',
        description:''
    })
    const{courseTitle, courseCode, description}= course;
    
    const handleInputChange = (e)=>{
        setCourses({...course,[e.target.name]: e.target.value})
    };
    const saveCourse = async(e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8083/api/createCourses", course);
        navigate("/View-All-courses");
    }
  return (
    <div className='col-sm-8 py-2 px-5'>
        <form onSubmit={(e)=> saveCourse(e)}>
            <div className='input-group mb-5'>
                <label className='input-group-text' htmlFor='courseTitle'>Course Title</label>
                <input
                className='form-control col-sm-6'
                type='text'
                name='courseTitle'
                id="courseTitle"
                required value={courseTitle}
                onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div className='input-group mb-5'>
                <label className='input-group-text' htmlFor='courseCode'>Course Code</label>
                <input
                className='form-control col-sm-6'
                type='text'
                name='courseCode'
                id="courseCode"
                required value={courseCode}
                onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div className='input-group mb-5'>
                <label className='input-group-text' htmlFor='description'>Course Description</label>
                <input
                className='form-control col-sm-6'
                type='text'
                name='description'
                id="description"
                required value={description}
                onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div className='row mb-5'>
                <div className='col-sm-2'>
                    <button type="submit" className='btn btn-outline-success btn-lg'>Save</button>
                </div>
                <div className='col-sm-2'>
                    <Link to={"/view-courses"} type='submit' className='btn btn-outline-warning btn-lg'>Cancel</Link>
                </div>
            </div>
        </form>
      
    </div>
  )
}

export default AddNewCourse
