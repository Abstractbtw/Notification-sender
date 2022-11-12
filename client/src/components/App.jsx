import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Registration from "./authorization/Registration"
import Login from "./authorization/Login"
import Notificationlist from "./notificationlist/Notificationlist"
import History from "./history/History"
import './app.css'

function App() {

  return (
    <BrowserRouter>
      <div className='container'>
          <Routes>
            <Route path="/" element={<Notificationlist /> }/>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/history" element={<History />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
