import React, { useState } from 'react'
import "./Sign.scss"
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from "../../utilities/firebase"
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    // used for navigating to another page
    const navigate = useNavigate()

    //for showing password
    const [showPassword, setShowPassword] = useState(false)


    //hook for the forms
    const [formData, setFormData] = useState({
        name: "",
        email : "",
        password : ""
    })

    const {name, email, password} = formData;


    //for the input values
    const onChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id] : e.target.value
        }))
    }

    //Form Hanndler
    const onSubmit = async (e) => {
        e.preventDefault()
        
        try {
            //auth is gettting the getAuth methos from firebase
            const auth = getAuth()
            //userCredential returns a promise with the following data
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            //We are using this method to get our Name from the form (stil part of the UC)
            updateProfile(auth.currentUser, {displayName : name})
            const user =  userCredential.user;

            //We are storing the Auth in the Database without the password here
            const formDataCopy = {...formData}
            delete formDataCopy.password
            //this would help us with time it was created
            formDataCopy.timestamp = serverTimestamp();

            //Saving in DataBase
            await setDoc(doc(db, "users", user.uid), formDataCopy)
            toast.success("Success Notification !");
            setTimeout(() => {
                navigate("/")
            }, 2000);
        } catch (error) {
            toast.error("Error!");
            console.log(error)
        }
    }


  return (
    <section>
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div>
            <input type="text" id='name' 
            value={name} onChange={onChange}
            placeholder='Name' required />
            </div>
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
            
            
            <button type='submit'>Register</button>
            <div>
            <p>Already have an account? <span onClick={() => navigate("/sign-in")} >Sign In </span></p>
            </div>
        </form>
        <ToastContainer />
    </section>
  )
}

export default SignUp