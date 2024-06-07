import React, { useState } from 'react'
import "./Sign.scss"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'

const SignIn = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

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
            console.log("first")
            setLoading(true)
            const auth = getAuth();
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            if(userCredentials.user){
                toast.success("Success Notification !");
                setTimeout(() => {
                    navigate("/")
                }, 2000);
                setLoading(false)
            }
        } catch (error) {
            toast.error("Error!");
            setLoading(false)
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
            <button type='submit'>{loading ? "loading..." : "Sign in" }</button>
            <div>
            <p>Don't have an account yet <span onClick={() => navigate("/sign-up")} >Register</span></p>
            <p className='forgot' onClick={() => navigate("/forgot-password")}>Forgot Password?</p>
            </div>
        </form>
        <ToastContainer />
    </section>
  )
}

export default SignIn