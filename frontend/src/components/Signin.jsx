import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
const Signin = () => {
  const dispatch=useDispatch();
  const history =useNavigate();
  const [inputs, setinputs] = useState({ 
    email:"",
    password:""})

  const change =(e)=>{
     const {name,value} = e.target;
     console.log(name,value);
     
     setinputs({...inputs,[name]:value});  
   }
  const submit = async (e)=>{
    e.preventDefault();
    await axios.post(`${window.location.origin}/api/auth/login`,inputs).then((response) =>{
      sessionStorage.setItem("id", response.data.others._id);
      console.log(response.data.others._id)
      dispatch(authActions.login())
      history("/todo")
      
    }) 
  }
  return (
    <div className='h-[686px] flex bg-gray-100'>
      {/* Left side with form inputs */}
      <div className='flex-1 flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded-lg p-8 w-1/2'>
          <h2 className='text-4xl font-bold text-gray-900 mb-6'>Welcome Back</h2>
          <form>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Email</label>
              <input
                type='email'
                className='w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500'
                placeholder='you@example.com'
                value={inputs.email}
                name="email"
                onChange={change}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Password</label>
              <input
                type='password'
                className='w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500'
                placeholder='********'
                value={inputs.password}
                name="password"
                onChange={change}
              />
            </div>
            <button className='bg-orange-500 text-white w-full p-3 rounded-md hover:bg-orange-600 transition duration-200' onClick={submit}>
              Login
            </button>
          </form>
          <p className='mt-4 text-gray-600 text-center'>
            Don't have an account? <Link to='/signup' className='text-orange-500 font-bold'>Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Right side with "aboard" */}
      <div className='hidden md:flex flex-col justify-center items-center w-[600px] bg-orange-500 text-white'>
        <h1 className='text-6xl font-bold'>Login</h1>
      </div>
    </div>
  );
}

export default Signin;
