import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert';
import { Spinner } from 'reactstrap';
import { makePostRequest } from '../config';
import '../css/login.css'
import logo from '../images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/admin';


function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const handleLogin = async () => {
    try{
        setLoading(true);
        const res = await makePostRequest("/login", {
            username,
            password
        });
        const data = await res.json();
        if(data.success){
            dispatch(login(data.user))
            navigate("/");
        }else{
            alert.error(data.msg)
        }
        setLoading(false);
    }catch(err){
        setLoading(false);
        console.log(err);
        alert.error("Something went wrong");
    }
  }



  return (
    <div className='login-wrap'>
        <form>
            <img
                src={logo}
            />
            <h1>Admin Login</h1>
            <hr className='my-2'/>
            <div className='form-group mb-3'>
                <label>Username</label>
                <input 
                required={true}
                className='form-control' 
                placeholder='username' 
                value={username}
                onInput={(e) => setUsername(e.target.value)}
                type={"text"} />
            </div>
            <div className='form-groups'>
                <label>Password</label>
                <input 
                required={true}
                className='form-control' 
                placeholder='password' 
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                type={"password"} 

                />
            </div>
            <div className='form-group'>
                <button type='button' onClick={handleLogin} className='btn btn-success'>
                {loading ? <Spinner size={"sm"} color='white' /> : "Login"} </button>
            </div>
        </form>
    </div>
  )
}

export default Login