import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Hooks/AdminRoutes'
import TableComponent from '../../Hooks/useTable';
import { Link, useNavigate } from 'react-router-dom';

export default function ViewRoles() {
    const navigate=useNavigate();
    const {token,tokenData,url,setCustomData}=useContext(AuthContext);
    const [tableData,setTableData]=useState([]);
    const [sno,setSno]=useState(0);
// console.log(token)
const handleEdit=(e)=>{
    // const id=e.target.getAttribute("data-id");
    // setCustomData((prevCustomData)=>{
    //     const newData={...prevCustomData,role_id:id}
    //     localStorage.setItem("customData",JSON.stringify(newData));
    //     return newData;
    // })
    // navigate("/admin/edit");
}

    useEffect(()=>{
        if(token){
            axios.get(`${url}/admin/getRolesList`,{
                headers:{
                    "Authorization":token
                }
            }).then(data=>{
                console.log(data.data.data);
                if(data.data.status){
                    setTableData(data.data.data);
                }
            })
        }
    },[token])
    const columns = [
        { Header: 'S.no', accessor: 's_no' },
        { Header: 'Role', accessor: 'rolename' },
        { Header: 'Edit', accessor: 'edit' },
        {Header:'view Members',accessor:'view_mem'},
        {Header:'view Permissions',accessor:'view_per'}

      ];
    
    const data=tableData?.map((obj,index)=>{
        // setSno(sno++);
        return {
            s_no:index+1,
            rolename:obj.rolename,
            edit: <button data-id={obj._id} onClick={handleEdit} className=' rounded border hover:border-orange-500 border-white w-20 hover:bg-black' >edit</button>,
            view_mem:<button  className='rounded border hover:border-orange-500 border-white w-20 hover:bg-black' >view</button>,
            view_per:<button  className='rounded border hover:border-orange-500 border-white w-20 hover:bg-black' >view</button>
        }
    })
  return (
    <div>
    <h1>React Table Example</h1>
    <TableComponent columns={columns} data={data} />
  </div>
  )
}