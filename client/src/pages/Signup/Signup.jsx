import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, clearMessages, signup } from '../../redux/actions/userActions';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("")

  const { userError,userLoading,userMessage } = useSelector((state)=>state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()

    if(password !== confirmPassword){
        return toast.error("password not matching")
    }

    const formData = new FormData();

    formData.append("name",name);
    formData.append("username",username);
    formData.append("password",password)

    dispatch(signup(formData));

  }

  useEffect(()=>{
    if(userError){
        toast.error(userError);
        dispatch(clearErrors());
    }
    if(userMessage){
      dispatch(clearMessages());
      navigate("/login")
    }
},[dispatch,userError,userMessage,navigate])

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">{userLoading ? <span className="loader"></span> :"Signup"}</button>
      <Link className='register-link' to='/login'>Already have an account</Link>
      </form>
    </div>
  );
};

export default LoginPage;