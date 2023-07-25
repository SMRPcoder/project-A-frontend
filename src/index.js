import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './Pages/login/Login';
import Dashboard from './Pages/dashBoard/Dashboard';
import EditUser from './Pages/edit/edit';
import AdminRoutes from './Hooks/AdminRoutes';
import AddUser from './Pages/addUser/addUser';
import OpenRoutes from './Hooks/OpenRoutes';
import ViewEmployees from './Pages/view/viewEmployees';
import ViewUsers from './Pages/view/viewUsers';
import ViewRoles from './Pages/view/viewAllRoles';



const root = ReactDOM.createRoot(document.getElementById('root'));
const isAuthenticated = localStorage.getItem("token");
const url=process.env.REACT_APP_BACKEND_URL;
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<App />} />

{/* open */}
<Route path="/app/*" element={<OpenRoutes url={url} />}>
        <Route path='login' element={<Login />} />
</Route>

{/* admin */}
        <Route path="/admin/*" element={<AdminRoutes isAuthenticated={isAuthenticated?isAuthenticated:null} url={url} />}>
          <Route path="adduser" element={<AddUser />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="edit" element={<EditUser />} />
          <Route path="viewEmployees" element={<ViewEmployees />} />
          <Route path="viewUsers" element={<ViewUsers />} />
          <Route path="viewRoles" element={<ViewRoles />} />

        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


