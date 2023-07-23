
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
        email: yup.string().email().required("Email is Required"),
        password: yup.string().min(8, "Too Short").required("Password is Required")
    })
    return (
        <div>
        <div className=' text-center mt-[100px] p-4'>
            <h1 className=' font-bold text-2xl text-orange-500' >Login Form</h1>
            

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
                   <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                   <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                       <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                          Sign in
                       </h1>
                       <Form className="mt-6" >
                           <div className="mb-2">
                               <label
                                   for="email"
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
                                   for="password"
                                   className="block text-sm font-semibold text-gray-800"
                               >
                                   Password
                               </label>
                               <Field 
                               name="password"
                               type="password"
                                   className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                   
                                />{errors.password && touched.password ? <div className=' text-red-500'><p>{errors.password}</p></div> : null}
                   
                           </div>
                           <a
                               href="#"
                               className="text-xs text-purple-600 hover:underline"
                           >
                               Forget Password?
                           </a>
                           <div className="mt-6">
                               <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                   Login
                               </button>
                           </div>
                           </Form>
                       <p className="mt-8 text-xs font-light text-center text-gray-700">
                           {" "}
                           Don't have an account?{" "}
                           <a
                               href="#"
                               className="font-medium text-purple-600 hover:underline"
                           >
                               Sign up
                           </a>
                       </p>
                   </div>
                   </div>
                )}

            </Formik>
        </div>
    </div>
    </div>
    )
}
