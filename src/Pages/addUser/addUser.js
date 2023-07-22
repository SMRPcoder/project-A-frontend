
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
        firstname: yup.string().min(2, "Minimun 2 Words Are Required").required("Required"),
        lastname: yup.string().required("Required"),
        password: yup.string().min(8, "Minimum 8 Words Required").required("Required"),
        email: yup.string().email().required("Required"),
        file: yup.mixed().required("Required")
    })


    return (
        <div>
            <div className='text-center p-4' >
                <h1 className='text-2xl text-orange-500 font-bold' >ADD USER</h1>
            </div>
            <div className='text-center flex'>
                <Formik initialValues={{
                    firstname: "",
                    lastname: "",
                    password: "",
                    email: "",
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
                    <div className='border border-orange-500 flex mr-[25rem] ml-[25rem] text-center'>
                        <Form className='p-4' id='edit_form_user' encType='multipart/form-data' >
                            <div className='p-6 flex text-orange-500 text-center min-w-full'>
                            <div className='pr-20'>
                                <label>Firstname</label>
                                </div>
                                <div className='px-20'>
                                    <Field className=" w-60 h-8" name="firstname" />
                                </div>
                            </div>
                            <div className='p-6 flex text-orange-500 text-center' >
                            <div className='pr-20'>
                                <label>Lastname</label>
                                </div>
                                <div className='px-20'>
                                    <Field className=" w-60 h-8" name="lastname" />
                                </div>
                            </div>
                            <div className='p-6 flex text-orange-500 text-center' >
                            <div className='pr-20'>
                                <label>Password</label>
                                </div>
                                <div className='px-20'>
                                    <Field className=" w-60 h-8" name="password" />
                                </div>
                            </div>
                            <div className='p-6 flex text-orange-500 text-center' >
                            <div className='pr-20'>
                                <label>Email</label>
                                </div>
                                <div className='px-20'>
                                    <Field className=" w-60 h-8" name="email" />
                                </div>
                            </div>
                            <div className='p-6 flex text-orange-500 text-center' >
                            <div className='pr-20'>
                                <label>Profile</label>
                                </div>
                                <div className='px-20'>
                                    <Field className=" w-60 h-8" name="file" type="file" />
                                </div>
                            </div>
                            <div className='p-6 flex text-orange-500 text-center' >
                            <div className='pr-20'>
                                <label>Roles</label>
                                </div>
                                <div className='px-20 text-black'>
                                    <Field className=" w-60 h-8" name="roleId" component="select">
                                        {roleData.length > 0 ? roleData.map((elem, index) => (
                                            <option key={index} value={elem.value}>{elem.label}</option>
                                        )) : null}
                                    </Field>
                                </div>
                            </div>

                            <button className='border border-orange-500 text-white rounded p-4 hover:bg-orange-500' type="submit">Create</button>

                        </Form>
                    </div>
                </Formik>
            </div>
        </div>
    )
}

