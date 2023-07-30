
import { Field, Form, Formik, useFormik } from 'formik';
import * as yup from "yup";
import React, { useContext, useEffect, useState } from 'react'
import Axios from '../../Configs/axiosConfig';
import { Notify } from 'notiflix';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../../Hooks/AdminRoutes';



export default function EditUser() {

 
    const { url, customData } = useContext(AuthContext);

    const [tokenData, setTokenData] = useState({});
    const [roleData, setRoleData] = useState([]);
    const [token, setToken] = useState("");
    const [editData, setEditData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        roleId: {
            _id: ""
        }
    });


    useEffect(() => {
        setToken(window.localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            const newtoken = jwt_decode(token.split(" ")[1]);
            setTokenData(newtoken);
            Axios.get(`${url}/admin/getRolesList`, {
                headers: {
                    "Authorization": token
                }
            }).then(data => {
                new Promise((resolve) => {
                    resolve(data.data.data.map(element => {
                        return { value: element._id, label: element.rolename };
                    }));
                }).then(roles => {
                    setRoleData(roles);
                })

            })
            Axios.post(`${url}/admin/viewOne`, { id: customData.emp_id }, {
                headers: {
                    "Authorization": token
                }
            }).then(data => {
                const thisuser = data.data.data
                setEditData(thisuser);

            })

        }

    }, [token])


    const signupSchema = yup.object().shape({
        id:yup.string().required("Reload Please"),
        firstname: yup.string().min(2, "Minimun 2 Words Are Required"),
        lastname: yup.string().min(1,"Cannot Be a Empty Field"),
        password: yup.string().min(8, "Minimum 8 Words Required"),
        email: yup.string().email(),
        roleId: yup.string(),
        file: yup.mixed()
    })

const iniVals={
    id:editData._id,
    firstname: editData.firstname,
    lastname: editData.lastname,
    email: editData.email,
    file: "",
    roleId: editData.roleId._id
};
    return (
        <div>
            <div className='text-center p-4' >
                <h1 className='text-2xl text-orange-500 font-bold' >EDIT USER</h1>
            </div>
            <div className='text-center pl-[200px] pr-[200px]'>
                <Formik initialValues={iniVals}
                    enableReinitialize={true}
                    validationSchema={signupSchema}
                    onSubmit={(values) => {
                        // console.log(values);
                        var Editform = document.getElementById("edit_form_user");
                        var newFormData = new FormData(Editform)
                        if(newFormData){
                            Axios.post(`${url}/admin/editOne`, newFormData, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    "Authorization": token
                                }
                            }).then(data => {
                                // console.log(data);
                                if (data.data.status) {
                                    Notify.success(data.data.message);
                                } else {
                                    Notify.failure(data.data.message);
                                }
                            })
                        }
                       
                    }}
                >
                    {({ errors,values, touched }) => (
                        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                                    EDIT User
                                </h1>
                                
                                <Form className="mt-6" id="edit_form_user" encType='multipart/form-data' >
                                    <Field type="hidden" name="id" value={editData._id} />
                                    <div className="mb-2">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            First Name
                                        </label>
                                        <Field  
                                        placeholder={editData.firstname}
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            name="firstname" ></Field>{errors.firstname && touched.firstname ? <div className=' text-red-500'><p>{errors.firstname}</p></div> : null}
                                    </div>
                                    <div className="mb-2">
                                        <label 
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Lastname
                                        </label>
                                        <Field
                                        placeholder={editData.lastname}
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            name="lastname" />{errors.lastname && touched.lastname ? <div className=' text-red-500'><p>{errors.lastname}</p></div> : null}

                                    </div>
                                    <div className="mb-2">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Email
                                        </label>
                                        <Field
                                        placeholder={editData.email}
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            name="email" />{errors.email && touched.email ? <div className=' text-red-500'><p>{errors.email}</p></div> : null}

                                    </div>
                                    <div className="mb-2">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Profile
                                        </label>
                                        <Field
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            name="file" type="file" />

                                    </div>
                                    <div className="mb-2">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Role
                                        </label>
                                        <Field
                                        value={values.roleId}
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            name="roleId" component="select">
                                            {roleData.length > 0 ? roleData.map((elem, index) => (
                                                <option key={index} value={elem.value}>{elem.label}</option>
                                            )) : null}
                                        </Field>
                                        {errors.roleId && touched.roleId ? <div className=' text-red-500'><p>{errors.roleId}</p></div> : null}

                                    </div>

                                    <div className="mt-6">
                                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                            Edit User
                                        </button>
                                    </div>
                                </Form>
                              
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    )
}

