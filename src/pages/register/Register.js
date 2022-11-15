import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from "./Register.module.css";
import { registerUser, signUpProvider } from '../../firebase';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const submitHandler=async()=>{
    if(!name || !email || !password){
      setError("Invalid Entry")
      return;
    }

    //sign the user in
    const message = await registerUser(email, password, name);
    if(message){
      setError(message);
      navigate("/Register")
      return;
    }
    setError(null);
    navigate("/Login")
  }


  //signup through google
  const signUpThroughGooglePopUp=()=>{
    signUpProvider();
    navigate("/")
  }


  return (
    <div className={`${classes.Register} page`}>
      <div className={classes.RegisterForm}>
        <h1>Register</h1>
        {error&& <p className='text-danger text-center m-3'>{error}</p> }
        <form>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label text-light'>Name</label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='form-control' id='name' placeholder='Enter your Name' />
          </div>

          <div className='mb-3'>
          <label htmlFor='email' className='form-label text-light'>Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control' id='email' autoComplete='off' placeholder='Enter your Email' />
          </div>

          <div className='mb-3'>
          <label htmlFor='password' className='form-label text-light'>Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control' id='password' placeholder='Enter your Password' />
          </div>

          <div className='d-grid'>
            <button type='button' className="btn btn-primary form-control mt-3" onClick={submitHandler} >Sign up</button>
          </div>
        </form>

        <button type='button' className="btn btn-primary form-control mt-3" onClick={signUpThroughGooglePopUp} >Continue with Google</button>
            <p className='text-center text-light mt-3'>Has an account? <span className='text-warning' style={{cursor:"pointer"}} onClick={()=>navigate("/Login")}>Login</span> </p>
      </div>

    </div>
  )
}

export default Register