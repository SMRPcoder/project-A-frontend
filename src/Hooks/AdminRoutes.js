// src/Hooks/ProtectRoutes.js
import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Axios from "../Configs/axiosConfig";

const AuthContext = createContext();

const AdminRoutes = ({isAuthenticated,url}) => {
  const navigate = useNavigate();
  const [tokenData,setTokenData]=useState({});
  const [token,setToken]=useState(()=>localStorage.getItem("token"));
  const [customData, setCustomData] = useState(() => {
    const storedData = localStorage.getItem('customData');
    return storedData ? JSON.parse(storedData) : {};
  });

  const getToken=(thisToken)=>{
    const newtoken=thisToken.split(" ")[1];
    const decoded_token=jwtDecode(newtoken);
    // console.log(decoded_token);
      setTokenData(decoded_token);
  }


  // useTi
useEffect(()=>{
  // console.log(isAuthenticated);

    if (!isAuthenticated) {
      if(token){
        setToken(token);
        getToken(token)
      }
      else if(customData?.token){
        setToken(customData.token);

        getToken(customData.token)
      }else{
        navigate("/app/login");
      }
      // return null;
    }else{
      getToken(isAuthenticated);
      setToken(isAuthenticated);

    }

},[isAuthenticated]);
 
useEffect(()=>{
  if(token!==""){
    Axios.get(`${url}/admin/checkIsIn`,{
      headers:{
        "Authorization":token
      }
    })
  }
},[token]);

  return (
    <AuthContext.Provider value={{token,tokenData,url,customData,setCustomData}}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export {AuthContext};
export default AdminRoutes;
