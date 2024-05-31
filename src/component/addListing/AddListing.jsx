import './AddListing.scss'
import SearchInstitute from "../../component/searchInstitute/SearchInstitute";
import SchoolContextProvider from "../../hooks/Context/SchoolContext";
import { useState } from 'react';
import { Filter_1, Filter_2, Filter_3, Filter_4 } from '../filter/Filter';
import { SchoolContext } from "../../hooks/Context/SchoolContext";
import { useContext } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
//installing uuid for unique id
import {v4 as uuidv4} from 'uuid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../utilities/firebase';
import { useNavigate } from 'react-router-dom';


const AddListing = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [add, setAdd] = useState(false)
  const[errorMessage, setErrorMessage] = useState(false)
  const {type, setType, institution, setInstitution,
    campus, setCampus, institutions, setInstitutions,
    campuses,
    setCampuses, filter_1, setFilter_1} = useContext(SchoolContext);


  const [addList, setAddList] = useState({
    category: '',
    images: {},
    price: 0,
    accommodationName: "",
    description: "",
  })
const {category, images} = addList;

  const changeType = (e) => {
    if(e.target.files) {
      setAddList(prev => ({
        ...prev, 
        images: e.target.files
      }))
      
    } else{
      setAddList(prev => ({
        ...prev,
        [e.target.name] : e.target.value
      }))
    }
  }

  const HandleAddList = async (e) => {
    e.preventDefault()
    setAdd(true)
    if(images.length < 2 && images.length > 5){
      setAdd(false)
      setErrorMessage(true)
      return;
    }

    //used this function to get urls and store image in the firebase storage
    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    //looped all the images and used the function to get the urls
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setAdd(false);
      setErrorMessage("Images not uploaded");
      return;
    });

    //total data in one place
    const formData = {
      ...addList,
      ...filter_1,
      type,
      institution,
      campus,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid
    }
    //conditions for database so not to show uneccesary data
    delete formData.images;
    if(category === 'Accommodation'){
      delete formData.min;
      delete formData.max;
      delete formData.service;
      delete formData.property;
      delete formData.level;
      delete formData.gender;
    }
    if(category === 'Service'){
      delete formData.accommodationName;
      delete formData.price;
      delete formData.min;
      delete formData.max;
      delete formData.accommodationType;
      delete formData.property;
      delete formData.level;
      delete formData.gender;
    }
    if(category === 'Property'){
      delete formData.accommodationName;
      delete formData.min;
      delete formData.max;
      delete formData.accommodationType;
      delete formData.service;
      delete formData.level;
      delete formData.gender;
    }
    if(category === 'Roommate'){
      delete formData.accommodationName;
      delete formData.price;
      delete formData.min;
      delete formData.max;
      delete formData.accommodationType;
      delete formData.service;
      delete formData.property;
    }

    //store data in the database
    const docRef = await addDoc(collection(db, "listings"), formData);
    setAdd(false);
    //Add a success message

    //trying this
    //ill redirect to my listings
    // navigate(`/category/${formData.category}/${docRef.id}`)
  }

  return (
    <div className='add-listing'>
      <hr />
        <h2>Add Listing</h2>
        <form onSubmit={HandleAddList}>
            <div className='input'>
                <p>CATEGORY</p>
                <select name='category' onChange={changeType} >
                  <option value="">---</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Service">Service</option>
                <option value="Property">Property</option>
                <option value="Roommate">Roommate</option>
                </select>
            </div>
            <div className="input">
                <p>IMAGE</p>
                <p>The first imag will be the cover (max 5) </p>
                <input 
                name='images' 
                type="file" 
                accept='.jpg, .png, .jpeg'
                multiple
                onChange={changeType}
                required
                 />
                 <div className="error">{errorMessage ? "Images should be more than 2 and less than 5" : null}</div>
            </div>
            
            <div className="input">
            <SearchInstitute 
            category={category}
            type={type}
            setType={setType}
            institution={institution}
            setInstitution={setInstitution}
            institutions={institutions}
            setInstitutions={setInstitutions}
            campus={campus}
            setCampus={setCampus}
            campuses={campuses}
            setCampuses={setCampuses}
            />
            </div>
            <div className="input">
            {category === 'Accommodation' ? (
              <Filter_1  filter_1={filter_1} setFilter_1={setFilter_1} >
                <div className="input">
                  <label className="p-text">ACCOMMODATION NAME</label>
                  <div className="price">
                  <input type="text" name="accommodationName"  placeholder='Accommodation Name'  onChange={changeType} />
                  </div>
                 </div>
                 <div className="input">
                  <label className="p-text">PRICE</label>
                  <div className="price">
                  <input type="number" name="price"  placeholder='Price'  onChange={changeType} />
                  </div>
                 </div>
              </Filter_1>
            ) : category === 'Service' ? (
              <Filter_2  setFilter_1={setFilter_1}/>
            ) : category === 'Property' ? (
              <Filter_3 setFilter_1={setFilter_1} >
                 <label className="p-text">PRICE</label>
                 <div className="price">
                 <input type="number" name="price"  placeholder='Price'  onChange={changeType} />
                 </div>
              </Filter_3>
            ) : category === 'Roommate' ? (
              <Filter_4 setFilter_1={setFilter_1} />
            ) : null }
            </div>
            <div className="input">
              <textarea name="description" rows="4" cols="50" placeholder='Give importnt details' onChange={changeType}></textarea>
            </div>
            <button>{add ? 'Loading...' : 'Add'}</button>


        </form>
    </div>
  )
}

export default AddListing