import { createContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";


const OpenContext=createContext();

const OpenRoutes=({url})=>{
    const navigate=useNavigate();
console.log(url);
const token=localStorage.getItem("token");
useEffect(()=>{
    if(token?.length>0){
        navigate("/admin/dashboard")
    }

})

    return(
        <OpenContext.Provider value={{url}}>
            <Outlet/>
        </OpenContext.Provider>
    )
}
export {OpenContext};
export default OpenRoutes;