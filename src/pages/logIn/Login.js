import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from "./Login.module.css"
import { forgotPassword, login, signUpProvider } from '../../firebase'

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  

  const submitHandler=async()=>{
    if(!email || !password){
      setError("Invalid Entry")
      return;
    }

    const message = await login(email, password);
    if(message){
      setError(message);
      navigate("/Login")
      return;
    }
    setError(null)
    navigate("/")
  }


  //signup through google
  const signUpThroughGooglePopUp=()=>{
    signUpProvider();
    navigate("/")
  }

  //forgotPassword
  const forgotPasswordHandler =async(email)=>{
    const message = await forgotPassword(email);
    if(message){
      setError(message)
    }
  }

  return (
    <div className={`${classes.Login} page`}>
      <div className={classes.LoginForm}>
        <h1>Login</h1>
        {
          error&& <p className='text-danger text-center m-3'>{error}</p>
        }
        <form>
          <div className='mb-3'>
          <label htmlFor='email' className='form-label text-light'>Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control' id='email' autoComplete='off' placeholder='Enter your Email' />
          </div>

          <div className='mb-3'>
          <label htmlFor='password' className='form-label text-light'>Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control' id='password' placeholder='Enter your Password' />

          <div className='text-center text-warning mt-3' 
          style={{
            cursor: "pointer"
            }} onClick={()=>forgotPasswordHandler(email)} >
              Forget Password?
            </div>
          </div>

          <div className='d-grid'>
            <button type='button' className="btn btn-primary form-control mt-3" onClick={submitHandler} >Login</button>
          </div>
        </form>

        <button type='button' className="btn btn-primary form-control mt-3" onClick={signUpThroughGooglePopUp} >Continue with Google</button>
            <p className='text-center text-light mt-3'>Doesn't have an account <span className='text-warning' style={{cursor:"pointer"}} onClick={()=>navigate("/Register")}>Sign up</span> </p>
      </div>

    </div>
  )
}

export default LogIn