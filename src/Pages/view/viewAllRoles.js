import Axios from '../../Configs/axiosConfig';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Hooks/AdminRoutes'
import TableComponent from '../../Hooks/useTable';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import Tagify from "@yaireo/tagify";
import * as yup from "yup";
import ModalForm from '../../components/ModalForm';

export default function ViewRoles() {
    const navigate = useNavigate();
    const { token, tokenData, url, setCustomData } = useContext(AuthContext);
    const [tableData, setTableData] = useState([]);
    const [permissionModal, setPermissionModal] = useState(false);
    const [roleData, setRoleData] = useState({});
    const [modalBody, setModalBody] = useState({render:()=>{}});

    const handleEdit = (e) => {
        // const id=e.target.getAttribute("data-id");
        // setCustomData((prevCustomData)=>{
        //     const newData={...prevCustomData,role_id:id}
        //     localStorage.setItem("customData",JSON.stringify(newData));
        //     return newData;
        // })
        // navigate("/admin/edit");
    }

    const handlePermissionModalCLose=()=>{
        setPermissionModal(false);
        setRoleData({});
    }

    const handlePermissionModalSave=()=>{
        setPermissionModal(false);
    }

    

    useEffect(() => {
        if(Object.keys(roleData).length!=0){
            console.log(roleData);
            setModalBody({render:()=>{
                const strPermission=roleData.permissions.join(",");
                return(
                <>
                <ModalForm tagify={{name:"RolePermission"}}
                    initialValues={{RolePermission:""}}
                    validationSchema={yup.object().shape({
                        RolePermission:yup.string().required("RolePermission is A Required Field")
                    })}
                    onSubmit={(Values)=>{
                        console.log(Values)
                    }}
                    inputs={[{name:"RolePermission",value:roleData.permissions,tag:true}]}
                    btn_name="save"
                />
                </>
                )}});
            setPermissionModal(true);
            setModalBody((prevObj)=>{
                return{
                    ...prevObj,
                    scripts:handlePermissionScripts
                }
            })
        }

    }, [roleData]);

    const handlePermissionScripts=()=>{
        
    }

   
    const handleClick = (obj) => {
        setRoleData((prev) => {
          return {
            ...prev,
            ...obj,
          };
        });
      };

    useEffect(() => {
        if (token) {
            Axios.get(`${url}/admin/viewAllRolePermission`, {
                headers: {
                    "Authorization": token
                }
            }).then(data => {
                if (data.data.status) {
                    setTableData(data.data.data);
                }
            })
        }
    }, [token])
    const columns = [
        { Header: 'S.no', accessor: 's_no' },
        { Header: 'Role', accessor: 'rolename' },
        { Header: 'Edit', accessor: 'edit' },
        { Header: 'view Members', accessor: 'view_mem' },
        { Header: 'view Permissions', accessor: 'view_per' }

    ];

    const data = tableData?.map((obj, index) => {
        // setSno(sno++);
        return {
            s_no: index + 1,
            rolename: obj.roleId.rolename,
            edit: <button data-id={obj._id} onClick={handleEdit} className=' rounded border hover:border-orange-500 border-white w-20 hover:bg-black' >edit</button>,
            view_mem: <button data-id={obj.roleId._id} className='rounded border hover:border-orange-500 border-white w-20 hover:bg-black' >view</button>,
            view_per: <button data-id={obj.roleId._id} onClick={(e) => { handleClick(obj); }} className='rounded border hover:border-orange-500 border-white w-20 hover:bg-black' >view</button>,

        }
    })
    return (
        <div>
            <h1>View All Roles</h1>
            <TableComponent columns={columns} data={data} />
            <Modal 
                content={{ title: "Permission Modal", 
                        body:modalBody,
                        onClose:handlePermissionModalCLose,
                        onSave:handlePermissionModalSave
                     }} 
                showModal={permissionModal} 
                setShowModal={setPermissionModal} 
                
            />
           
        </div>
    )
}