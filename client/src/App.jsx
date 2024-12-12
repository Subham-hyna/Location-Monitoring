import React, { useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { ProtectedRoute } from "protected-route-react";
import LandingPage from './pages/LandingPage/LandingPage';
import toast, { Toaster } from 'react-hot-toast';
import { clearErrors, clearMessages, loadUser } from './redux/actions/userActions';
import LocationHistoryPage from './pages/LocationList/LocationList';
import UserLocation from './pages/UserLocation/UserLocation';

function App() {

  const { isAuthenticated,userError, userMessage } = useSelector((state)=>state.user);

  const dispatch = useDispatch();

useEffect(()=>{
  dispatch(loadUser());
},[dispatch])

useEffect(()=>{
  if(userError){
    dispatch(clearErrors());
  }
  if(userMessage){
      toast.success(userMessage);
      dispatch(clearMessages());
  }

},[dispatch,userError,userMessage])

  return (
    <>
    <Router>
     <div className='App'>
      <Routes>
      <Route 
        element={
          <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me" />
        }>
         <Route exact={true} path='/login' element={<Login />} />
         <Route exact={true} path='/' element={<Login />} />
         <Route exact={true} path='/signup' element={<Signup />} />
        </Route>

        <Route 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login" />
        }>
          <Route exact={true} path='/me' element={<LandingPage />} />
          <Route exact={true} path='/user/:userId' element={<LocationHistoryPage />} />
          <Route exact={true} path='/user/:name/:latitude/:longitude' element={<UserLocation />} />
          </Route>
         </Routes>
     </div>
     </Router>
       <Toaster 
       position='top-right'
       />
   </>
  );
}

export default App;
