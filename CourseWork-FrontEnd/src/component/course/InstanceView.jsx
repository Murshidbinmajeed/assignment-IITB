import React,{ useEffect, useState, useCallback} from 'react'; //useEffect,
import axios from 'axios';
import { Link } from "react-router-dom";
import {FaEdit,FaTrashAlt} from "react-icons/fa";


const InstanceView = () => {
    let [instances,setInstances] = useState ([]);
    let [selectedSem, setSelectedSem] = useState([]);
    // let [displayData, setDisplayData] = useState([]);
    const [filterData,setFilterData] = useState([]);


    const loadInstances = useCallback(async () => {
        const result = await axios.get(
            "http://localhost:8083/api/viewAllInstances",
            {
                validateStatus: () => {
                    return true;
                },
            }
        );
        if(result.status === 302){
            setInstances(result.data);
        }
    }, []);

    useEffect(() => {
        loadInstances();
    }, [loadInstances]);

    const sems = instances.map(i => i.semester);

    // console.log("Semeseters :: ", sems);

    
    const handleDrop = async (e) =>{
        e.preventDefault();
        setSelectedSem(e.target.value);
        // console.log("Selected sem is :: ", selectedSem);
    };

    
    const handleSubmit = async () => {
        let year = document.getElementById("year").value;

        const filteredInstances = instances.filter(instance => {
            // console.log("I Year::",instance.year, "Instance Semester::", instance.semester);
            return instance.year === parseInt(year, 10) && instance.semester === parseInt(selectedSem,10);
        });
        // console.log("filererd Data1 :: ", filteredInstances);
        setFilterData(filteredInstances);
        // console.log("Filtere Data2 :: ", filterData);
        

        // try{
        //     const res = await axios.get(`http://localhost:8083/api/viewInstances/${year}/${selectedSem}`,
        //     {
        //         validateStatus: () => {
        //             return true;
        //         },
        //     }
        // );
        // if(res.status === 302){
        //     setDisplayData(res.data);
        // }
        // }
        // catch(err){
        //     console.log(err);
        // }
    }
    
    // console.log("Display Data::",displayData);

    const handleDelete = async (courseId) => {
        let year = document.getElementById("year").value;
        console.log("Year : ",year);
        console.log("Sem : ", selectedSem);
        await axios.delete(
            `http://localhost:8083/api/delInstances/${year}/${selectedSem}/${courseId}`
        );
        // handleSubmit();
        window.location.reload();
    }
    
    
  return (
    <section>
        <div className='container mt-4'>
            <div className='mb-3 d-flex justify-content-center align-items-center col-6'>
                <input
                type="text"
                placeholder="Year"
                className='form-control me-2 small-textbox'
                id='year'
                aria-describedby='year'
                />
                <div className='col-6 text-center'>
                    <select className='form-select' aria-label='Default select example' onClick={handleDrop} onChange={handleDrop} value={selectedSem}>
                        <option value="" defaultValue>Select Semester</option>
                        {sems.map((sem, index) => (
                            <option key={index} value={sem}>
                                {sem}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-auto ms-1'>
                    <button type='button' className='ms-2 btn btn-primary' onClick={handleSubmit}>
                        List Instance
                    </button>
                </div>
            </div>
        </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
            <tr className='text-center'>
                <th scope='col'>Course Title</th>
                <th scope='col' >Year-Sem</th>
                <th scope='col'>Course Code</th>
                <th colSpan="3" scope='col'>Actions</th>
            </tr>
        </thead>
        <tbody className='text-center'>
            {filterData.map((i, index)=>(
                <tr key={index}>
                    <td>{i.course.courseTitle}</td>
                    <td>{i.year}-{i.semester}</td>
                    <td>{i.course.courseCode}</td>
                    <td className='mx-2'>
                        <Link to={{pathname:`/courses/${i}/edit`}} 
                        className="btn btn-primary"><FaEdit /></Link>
                    </td>
                    <td className='mx-2'>
                        <button
                        className='btn btn-danger'
                        onClick={() => handleDelete(i.course.courseId
                            )}><FaTrashAlt /></button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default InstanceView
