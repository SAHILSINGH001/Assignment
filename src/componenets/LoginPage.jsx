import React,{useState} from 'react'
import logo from '../images/realistic-style-technology-particle-background_23-2148426704.avif'

export default function LoginPage() {
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const[errorMsg,setErrorMsg]=useState('');
   const [succMsg,setSuccMsg]=useState('');
   
const handleEmailChange=(e)=>{
  setEmail(e.target.value)
}
const handlePasswordChange=(e)=>{
  setPassword(e.target.value);
}
const handleLogin=async(e)=>{
  e.preventDefault();
  if(!email || !validateEmail (email)){
    setErrorMsg('Please Enter correct Email');
    return;
  }
  setErrorMsg('');
  setSuccMsg("LOgin");
  try {
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/XooRuQbs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccMsg('Login successful');
    } else {
      setErrorMsg(data.message || 'Login failed');
    }
  } catch (error) {
    setErrorMsg('An error occurred. Please try again later.');
  }
}

const validateEmail = (email) => {
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
  return (
    <div className='Login'>
        <div className='container'>
        <div className='image'>
            <img src={logo} alt='sideImage'></img>
        </div>
        <div className='form'>
        <h1>Login-Page</h1>
            <form onSubmit={handleLogin}>
                <div className='details'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' placeholder='Enter Your Email' name='email' onChange={handleEmailChange}></input>
                </div>
                <div className='details'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password'  placeholder='Enter Your Password' name='password'  onChange={handlePasswordChange}></input>
                </div>
                <button type='submit'>Login</button>
            </form>
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {succMsg && <p style={{ color: 'green' }}>{succMsg}</p>}
            
        </div>
        </div>
           
           </div>
    
  )
}