import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import RegisterComponent from './pages/registerComponent/RegisterComponent';


const AppRouter = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path='/register' element={<RegisterComponent />} />
        </Routes>
    )
}

export default AppRouter;