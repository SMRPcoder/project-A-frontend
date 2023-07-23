
import { Field, Form, Formik } from 'formik';
import * as yup from "yup";
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Notify } from 'notiflix';
import { AuthContext } from '../../Hooks/AdminRoutes';
// import jwt_decode from 'jwt-decode';

export default function AddUser() {
    const {url}=useContext(AuthContext);
    const [roleData, setRoleData] = useState([]);
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(window.localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (token?.length > 0) {
            // const newtoken = jwt_decode(token.split(" ")[1]);
            axios.get(`${url}/admin/getRolesList`, {
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
        }

    }, [token])

    const signupSchema = yup.object().shape({
        firstname: yup.string().min(2, "Minimun 2 Words Are Required").required("First Name is Required"),
        lastname: yup.string().required("Last Name is Required"),
        password: yup.string().min(8, "Minimum 8 Words Required").required("Password is Required"),
        email: yup.string().email().required("Email is Required"),
        file: yup.mixed().required("Required")
    })


    return (
        <div>
            <div className='text-center p-4' >
                <h1 className='text-2xl text-orange-500 font-bold' >ADD USER</h1>
            </div>
            <div className='text-center pl-[200px] pr-[200px]'>
                <Formik initialValues={{
                    firstname: "",
                    lastname: "",
                    password: "",
                    email: "",
                    roleId:"",
                    file: ""
                }}
                    validationSchema={signupSchema}
                    onSubmit={(values) => {
                        console.log(values);
                        var Editform = document.getElementById("edit_form_user");
                        var newFormData = new FormData(Editform);
                        axios.post(`${url}/admin/adduser`, newFormData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                "Authorization": token
                            }
                        }).then(data => {
                            console.log(data);
                            if (data.data.status) {
                                Notify.success(data.data.message);
                            } else {
                                Notify.failure(data.data.message);
                            }
                        })
                    }}
                >
                    {({ errors, touched }) => (
                        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                                    ADD User
                                </h1>

                                <Form className="mt-6" id="edit_form_user" encType='multipart/form-data' >
                                   
                                    <div className="mb-2">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            First Name
                                        </label>
                                        <Field
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            name="firstname" />{errors.firstname && touched.firstname ? <div className=' text-red-500'><p>{errors.firstname}</p></div> : null}
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Lastname
                                        </label>
                                        <Field
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
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            name="email" />{errors.email && touched.email ? <div className=' text-red-500'><p>{errors.email}</p></div> : null}

                                    </div>
                                    <div className="mb-2">
                                        <label
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Password
                                        </label>
                                        <Field
                                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            name="password" />{errors.password && touched.password ? <div className=' text-red-500'><p>{errors.password}</p></div> : null}

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

