import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate=useNavigate();

  useEffect(()=>{
    navigate("/app/login");
})
  return (
    <div >
     hello world
    </div>
  );
}

export default App;
