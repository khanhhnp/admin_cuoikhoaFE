import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { updateSubTypeJobServiceThunk } from '../../categorySlice';
import { DoubleLeftOutlined } from '@ant-design/icons';


export default function EditSubTypeJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id1, id2 } = useParams();
 

  useEffect(() => {
    dispatch(updateSubTypeJobServiceThunk({ id2, values: null }))
      .unwrap()
      .then((res) => {
       
        document.getElementById("name").value = res.name;
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, [])

  const onEdit = (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    if (name.trim().length === 0) {
      document.getElementById("spanName").innerText = "Please input your SubTypeJob!"
    } else {
      document.getElementById("spanName").innerText = "";
      let values = { name }

      dispatch(updateSubTypeJobServiceThunk({ id2, values }))
      navigate(`/category/typejob/${id1}`);
    }

  };

  return (
    <div>
      <div className='border-2 p-3 rounded-lg w-96 text-center text-2xl bg-green-500 flex items-center'>
        <div><NavLink className="" to={`/category/typejob/${id1}`}><DoubleLeftOutlined /></NavLink></div>
        <h1 className='' style={{ marginLeft: '75px' }}>
          Edit SubTypeJob
        </h1>
      </div>
      <div className='border-2 rounded-lg p-3 w-96'>
        <form action="">
          <label htmlFor='name' >SubTypeJob: </label> <br />
          <input className='border-2 w-80 p-2 rounded-lg' type="text" id="name" name='name' /><br />
          <span id="spanName" className="text-red-500 my-2 block"></span>

          <input className='border-2 rounded-lg w-24 bg-blue-500 block p-2 mx-auto cursor-pointer hover:text-white hover:shadow-lg' type="submit" name="" id="" value="Edit" onClick={onEdit} />
        </form>
      </div>
    </div>
  )
}
