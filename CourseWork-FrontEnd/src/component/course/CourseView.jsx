import React, {  useState } from 'react'; //useEffect
import axios from "axios";
import {FaEdit,FaTrashAlt} from "react-icons/fa";
import { Link } from "react-router-dom";


const CourseView = () => {
  const[courses, setCourses] = useState([]);

  const handleSubmit = async () => {
    const result = await axios.get(
      'http://localhost:8083/api/viewAllCourses',
      {

        validateStatus: () => {
          return true; // resolve if the status code is less than or equal to 505, otherwise reject
        },
      }
    );
    if (result.status === 302) {
      setCourses(result.data);
    }
  };

  const hadleDelete = async (courseId) => {
    await axios.delete(
      `http://localhost:8083/api/delCourse/${courseId}`
    );
    handleSubmit();
  };

  // useEffect(()=>{
  //   loadCourses();
  // }, []);

  // const loadCourses = async () => {
  //   const result = await axios.get(
  //     'http://localhost:8083/api/viewAllCourses',
  //     {

  //       validateStatus: () => {
  //         return true; // resolve if the status code is less than or equal to 505, otherwise reject
  //       },
  //     }
  //   );
  //   if (result.status === 302) {
  //     setCourses(result.data);
  //   }
  // };



  return (
    <section>
      <div className='container my-6 mx-auto'>
      <div className='col-6 ms-2'>
                    <button type='button' className='mx-auto my-2 ms-2 btn btn-primary' onClick={handleSubmit}>
                        List Courses
                    </button>
                </div>
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
        <tr className='text-center'>
            {/* <th>ID</th> */}
            <th>Course Title</th>
            <th>Course Code</th>
            <th colSpan="3">Actions</th>
        </tr>
        </thead>

        <tbody className='text-center'>
            {courses.map((course, index)=>(
                <tr key={index}>
                    {/* <th scope="row" key={index}>
                        {index + 1}
                    </th> */}
                    <td>{course.courseTitle}</td>
                    <td>{course.courseCode}</td>
                    <td className='mx-2'>
                      <Link
                      to={{pathname:`/editcourse/${course.courseId}`}}
                      className='btn btn-warning'><FaEdit />
                      </Link>
                    </td>
                    <td className='mx-2'>
                      <button 
                          className='btn btn-danger'
                          onClick={() => hadleDelete(
                            course.courseId)}><FaTrashAlt /></button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default CourseView