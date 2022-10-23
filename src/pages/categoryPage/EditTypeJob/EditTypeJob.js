import React, { useEffect } from 'react'
import { useDispatch,  } from 'react-redux';
import { updateTypeJobServiceThunk } from '../categorySlice';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { DoubleLeftOutlined } from '@ant-design/icons';


export default function EditTypeJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  

  useEffect(() => {
    dispatch(updateTypeJobServiceThunk({ id, values: null }))
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
      document.getElementById("spanName").innerText = "Please input your TypeJob!"
    } else {
      let values = { name }
      
      document.getElementById("spanName").innerText = ""; 
      dispatch(updateTypeJobServiceThunk({ id, values }))
      navigate("/category");
    }
  };

  return (
    <div>
      <div className='border-2 p-3 rounded-lg w-96 text-center text-2xl bg-green-500 flex items-center'>
        <div><NavLink className="" to="/category"><DoubleLeftOutlined /></NavLink></div>
        <h1 className='' style={{ marginLeft: '75px' }}>
          Edit TypeJob
        </h1>
      </div>
      <div className='border-2 rounded-lg p-3 w-96'>
        <form action="">
          <label htmlFor='name' >Name Type Job: </label> <br />
          <input className='border-2 w-80 p-2 rounded-lg my-2' type="text" id="name" name='name' />
          <span id="spanName" className="text-red-500 my-2 block"></span>

          <input className='border-2 rounded-lg w-24 bg-blue-500 block p-2 mx-auto cursor-pointer hover:text-white hover:shadow-lg' type="submit" name="" id="" value="Edit" onClick={onEdit} />
        </form>
      </div>
    </div>
  )
}
