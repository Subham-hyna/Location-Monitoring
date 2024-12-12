import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, clearMessages, login } from '../../redux/actions/userActions';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { user,userError,isAuthenticated,userLoading,userMessage } = useSelector((state)=>state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(login(username.trim(),password.trim()));
  }

  useEffect(()=>{
    if(isAuthenticated){
        navigate("/me");
}
},[isAuthenticated,navigate,user])

useEffect(()=>{
  if(userError){
      toast.error(userError);
      dispatch(clearErrors());
  }
  if(userMessage){
    toast.success(userMessage);
    dispatch(clearMessages());
  }
}
,[dispatch,userError,userMessage])

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">{userLoading ? <span className="loader"></span> :"Login"}</button>
      <Link className='register-link' to='/signup'>Click here to register yourself!!</Link>
      </form>
    </div>
  );
};

export default LoginPage;