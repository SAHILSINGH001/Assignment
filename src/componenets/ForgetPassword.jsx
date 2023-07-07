import React ,{useState}from 'react'

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
  const [resetLinkSent, setResetLinkSent] = useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setResetLinkSent(true);
  };
  return (
    <div className='form-container'>
        <div className='container'>
        <h2>Forgot Password</h2>
      {resetLinkSent ? (
        <p>A password reset link has been sent to your email address.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email"  id="email"  name="email" value={email} onChange={handleInputChange} required/>
          <button type="submit">Send Reset Link</button>
        </form>
      )}
        </div>
    </div>
  )
}
