import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const history =useNavigate();
  const [inputs, setinputs] = useState({
    username:"", 
    email:"",
    password:""})

  const change =(e)=>{
     const {name,value} = e.target;
     console.log(name,value);
     
     setinputs({...inputs,[name]:value});  
   }
  const submit = async (e)=>{
    e.preventDefault();
    await axios.post(`${window.location.origin}/api/auth/register`,inputs).then((response) =>{
      if(response.data.message==="Email already exist"){
        alert(response.data.message)
      }
      else{
        alert(response.data.message)
        setinputs({
          username:"", 
          email:"",
          password:""}
        )
      };
      history("/login")
      
      

    })  
  }
  return (
    <div className='h-[686px] flex bg-gray-100'>
      {/* Left side with form inputs */}
      <div className='flex-1 flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded-lg p-8 w-1/2'>
          <h2 className='text-4xl font-bold text-gray-900 mb-6'>Create an Account</h2>
          <form>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Username</label>
              <input
                type='text'
                className='w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-500'
                placeholder='Enter your username'
                name='username'
                value={inputs.username}
                onChange={change}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Email</label>
              <input
                type='email'
                className='w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-500'
                placeholder='Enter your email'
                name='email'
                value={inputs.email}
                onChange={change}
                
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Password</label>
              <input
                type='password'
                className='w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-500'
                placeholder='Enter your password'
                name='password'
                value={inputs.password}
                onChange={change}
              />
            </div>
            <button className='w-full bg-orange-500 text-white p-3 rounded-md font-bold hover:bg-orange-600 transition-all ' onClick={submit} >
              Sign Up
            </button>
          </form>
          <p className='mt-4 text-gray-600 text-center'>
            Already have an account? <Link to='/login' className='text-orange-500 font-bold'>Login</Link>
          </p>
        </div>
      </div>
      
      {/* Right side aboard */}
      <div className='w-[600px] bg-orange-500 text-white flex justify-center items-center shadow-lg'>
        <h1 className='text-6xl font-serif font-bold'>Sign Up</h1>
      </div>
    </div>
  );
}

export default Signup;
