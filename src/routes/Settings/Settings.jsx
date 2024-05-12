import React, { useState } from 'react'
import './Settings.scss'
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../utilities/firebase';
import AddListing from '../../component/addListing/AddListing';

const Settings = () => {

  //getting access to the firebase Auth 
  const auth = getAuth();

  //getting the email and name from firebase Auth
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });
  const {name, email} = formData;

   //for the edit function
   const [changeDetail, setChangeDetail] = useState(false);

   //allow edit
   const onChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id] : e.target.value
    }))
   }

   const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName != name){
        //update displayname in firebaseauthentication
        await updateProfile(auth.currentUser, {
          displayName: name
        });
        //update in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid )
        await updateDoc(docRef, {
          name,
        })
      }
    } catch (error) {
      console.log(error)
    }

   }


  return (
    <>
      <div className='settings'>
    <form>
    <h3>Settings</h3>

    <input type="text" id='name'  placeholder='Name' value={name} disabled={!changeDetail} onChange={onChange}/>

    <input type="email" id='email' placeholder='Email' value={email} disabled />

    <p>Do want to change your name? <span onClick={() => {
      changeDetail && onSubmit();
      setChangeDetail(prev => !prev)
      //the code above says changeDetail if it true triggers the submit
      //the setchange changes the text
    }}>
      {changeDetail ? "Apply Change" : "Edit"}
      </span></p>
    </form>
    </div>
    </>
    
    
  )
}

export default Settings