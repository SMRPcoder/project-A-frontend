import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Hooks/AdminRoutes'
import TableComponent from '../../Hooks/useTable';
import { Link, useNavigate } from 'react-router-dom';

export default function ViewEmployees() {
    const navigate=useNavigate();
    const {token,tokenData,url,setCustomData}=useContext(AuthContext);
    const [tableData,setTableData]=useState([]);
// console.log(token)
const handleEdit=(e)=>{
    const id=e.target.getAttribute("data-id");
    setCustomData((prevCustomData)=>{
    localStorage.setItem("customData",JSON.stringify({...prevCustomData,emp_id:id}));

        return {
            ...prevCustomData,
            emp_id:id
        }
        })
        navigate("/admin/editUser");
}

    useEffect(()=>{
        if(token){
            axios.post(`${url}/admin/viewAll`,{
                role:"employee"
            },{
                headers:{
                    "Authorization":token
                }
            }).then(data=>{
                console.log(data.data);
                if(data.data.status){
                    setTableData(data.data.data);
                }
            })
        }
   

    },[token])
    const columns = [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Role', accessor: 'rolename' },
        { Header: 'Edit', accessor: 'edit' },
        { Header: 'View', accessor: 'view' },
      ];

    const data=tableData?.map(obj=>{
     
        return {
            name:`${obj.firstname} ${obj.lastname}`,
            email:obj.email,
            rolename:obj.roleId.rolename,
            edit: <button data-id={obj._id} onClick={handleEdit} className=' rounded border hover:border-orange-500 border-white w-20 hover:bg-black' >edit</button>,
            view:<button  className='rounded border hover:border-orange-500 border-white w-20 hover:bg-black' >view</button>
        }
    })
  return (
    <div>
    <h1>React Table Example</h1>
    <TableComponent columns={columns} data={data} />
  </div>
  )
}