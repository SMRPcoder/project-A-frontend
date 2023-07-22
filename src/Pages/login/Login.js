
import { Field, Form, Formik } from 'formik'
import * as yup from "yup";
import React, { useContext } from 'react'
import axios from 'axios';
import { Notify } from 'notiflix';
import { useNavigate } from 'react-router-dom';
import { OpenContext } from '../../Hooks/OpenRoutes';


export default function Login() {
    const {url}=useContext(OpenContext);
    const navigate = useNavigate();
    const loginSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8, "Too Short").required("Required")
    })
    return (
        <div>
            <div className=' text-center mt-[100px] p-4'>
                <h1 className=' font-bold text-2xl text-orange-500' >Login Form</h1>

            </div>

            <div className=' text-center pl-[200px] pr-[200px] '>
                <Formik initialValues={{
                    email: "",
                    password: ""
                }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => {
                        // console.log(values)
                        axios.post(`${url}/user/login`, {
                            ...values
                        }).then(data => {
                            if (data.data.status) {
                                console.log(data.data);
                                localStorage.setItem("token", data.data.token);
                                localStorage.setItem("customData", JSON.stringify({token:data.data.token}));

                                Notify.success("Login Successfull");
                                setTimeout(() => {
                                    navigate("/admin/dashboard")
                                }, 1000)

                            } else {
                                Notify.failure(data.data.message);
                            }
                        })
                    }}
                >
                    {({ errors, touched }) => (
                        <div className=' text-center box-content border border-orange-500 p-[100px]'>

                            <Form>
                                <div className='border border-orange-500 p-7 justify-evenly' >
                                    <label className='text-orange-500' >Email</label>
                                    <div>
                                        <Field className='border border-orange-500 px-16' name="email" />{errors.email && touched.email ? <div className=' text-red-500'><p>{errors.email}</p></div> : null}
                                    </div>
                                </div>
                                <div className='border border-orange-500 p-7 justify-evenly'>
                                    <label className='text-orange-500' >password</label>
                                    <div>
                                        <Field className='border border-orange-500 px-16' name="password" />{errors.password && touched.password ? <div className=' text-red-500'><p>{errors.password}</p></div> : null}
                                    </div>
                                </div>
                                <button className=' bg-green-500 rounded px-2 border border-orange-500' type='submit'>Submit</button>
                            </Form>
                        </div>
                    )}

                </Formik>
            </div>
        </div>
    )
}
