import { useState ,useEffect} from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Signup from './components/Signup'
import Signin from './components/Signin'
import Todo from './components/Todo'
import { useDispatch } from 'react-redux';
import { authActions } from './store';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id=(sessionStorage.getItem('id'));
    if(id){
      dispatch(authActions.login())
    }
    
    
    
  },[])
  
  return (
    <>  
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route  path='/signup' element={<Signup/>} />
        <Route  path='/login' element={<Signin/>} />
        <Route  path='/todo' element={<Todo/>} />
      </Routes>

    </Router>
    
    
    </>
  )
}

export default App
