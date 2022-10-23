import React, { useEffect } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addSubTypeJobServiceThunk, setTypeJobsServiceThunk } from '../../categorySlice';
import { DoubleLeftOutlined } from '@ant-design/icons';

export default function AddNewSubTypeJob() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams()
  
  const { arrayTypeJobs } = useSelector(state => state.categoryReducer);
  
  let index = arrayTypeJobs.findIndex((typeJob) => {

    return typeJob._id === id;
  })
  
  useEffect(() => {
    dispatch(setTypeJobsServiceThunk())
  }, [])

  const onEdit = (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    if (name.trim().length === 0) {
      document.getElementById("spanName").innerText = "Please input your SubTypeJob!";
    } else {
      document.getElementById("spanName").innerText = "";
   
      dispatch(addSubTypeJobServiceThunk({ typeJob: id, name }));
      navigate(`/category/typejob/${id}`);
    }
  };

  return (
    <div>
      <div className='border-2 p-3 rounded-lg w-96 text-center text-2xl bg-green-500 flex items-center'>
        <div><NavLink className="" to={`/category/typejob/${id}`}><DoubleLeftOutlined /></NavLink></div>
        <h1 className='' style={{ marginLeft: '75px' }}>
          Add New SubTypeJob
        </h1>
      </div>
      <div className='border-2 rounded-lg p-2 w-96'>
        <form action="">
          <label htmlFor="typeJob">TypeJob: </label> <br />
          <input className='border-2 p-2 w-80 rounded-lg' type="text" name='typeJob' id='typeJob' value={arrayTypeJobs[index]?.name} disabled={true} /> <br /> <br />  

          <label htmlFor="name">SubTypeJob: </label> <br />
          <input className='border-2 p-2 w-80 rounded-lg' type="text" name='name' id='name' /> <br />
          <span id="spanName" className="text-red-500 my-2 block"></span>

          <input className='border-2 rounded-lg bg-blue-500 block p-2 w-24 mx-auto cursor-pointer hover:text-white hover:shadow-lg' type="submit" name="" id="" value="Add" onClick={onEdit} />
        </form>
      </div>
    </div>
  )
}
