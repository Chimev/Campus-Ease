import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'

const ForgotPassword = () => {
   

    const [email, setEmail] = useState("")

    const onChange = (e) => {
        setEmail(e.target.value)
    }

    const onSubmit = async (e) => {
      e.preventDefault()

      try {
        const auth = getAuth()
        await sendPasswordResetEmail(auth, email)
        
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <section>
        <form onSubmit={onSubmit}>
            <h1>Reset Password</h1>
            <p>Please enter your email address, you will receive a link to create a new password via email</p>
            <div>
            <input type="email" id='email' 
            value={email} onChange={onChange}
            placeholder='Email' required />
            </div>
            <button type='submit'>Send Email</button>
        </form>
        
    </section>
  )
}

export default ForgotPassword