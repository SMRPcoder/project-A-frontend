import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate =useNavigate();
  const handleNavigate=()=>{
    navigate("/admin/adduser");
  }
  const handleViewEmployees=()=>{
    navigate("/admin/viewEmployees");
  }
  const handleViewUsers=()=>{
    navigate("/admin/viewUsers");
  }
  const handleLogout=()=>{
    localStorage.clear();
    navigate("/app/login");
  }
  return (
    <div>
      <button onClick={handleNavigate} className=' p-4 rounder bg-orange-500 text-black border border-green-500'>Add User</button>
      <button onClick={handleViewEmployees} className=' p-4 rounder bg-orange-500 text-black border border-green-500'>View All Employees</button>
      <button onClick={handleViewUsers} className=' p-4 rounder bg-orange-500 text-black border border-green-500'>View All Users</button>
      <button onClick={handleLogout} className=' p-4 rounder bg-orange-500 text-black border border-green-500'>Logout</button>
    
    </div>
  )
}
