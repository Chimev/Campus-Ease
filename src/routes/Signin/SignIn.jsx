import React, { useState } from 'react'
import "./Sign.scss"
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'

const SignIn = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const {email, password} = formData;


    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id] : e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth();
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            if(userCredentials.user){
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <section>
        
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div>
            <input type="email" id='email' 
            value={email} onChange={onChange}
            placeholder='Email' required />
            </div>

            <div className='pass'>
            <input  type={showPassword ? "test" : "password"} id='password' 
            value={password} onChange={onChange} 
            placeholder='Password' required />
            <div className="icon">
            {showPassword 
            ? <AiFillEyeInvisible onClick={() => setShowPassword(prev => !prev)}/> 
            : <AiFillEye onClick={() => setShowPassword(prev => !prev)}/>}
            </div>
            </div>
            <button type='submit'>SignIn</button>
            <div>
            <p>Don't have an account yet <span onClick={() => navigate("/sign-up")} >Register</span></p>
            <p className='forgot' onClick={() => navigate("/forgot-password")}>Forgot Password?</p>
            </div>
        </form>
        
    </section>
  )
}

export default SignIn