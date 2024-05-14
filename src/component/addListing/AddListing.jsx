import './AddListing.scss'
import SearchInstitute from "../../component/searchInstitute/SearchInstitute";
import SchoolContextProvider from "../../hooks/Context/SchoolContext";
import { useState } from 'react';
import { Filter_1, Filter_2, Filter_3, Filter_4 } from '../filter/Filter';
import { SchoolContext } from "../../hooks/Context/SchoolContext";
import { useContext } from "react";

const AddListing = () => {
  const {type, setType, institution, setInstitution,
    campus, setCampus, institutions, setInstitutions,
    campuses,
    setCampuses, filter_1, setFilter_1} = useContext(SchoolContext);


  const [addList, setAddList] = useState({
    category: '',
    images: null,
  })
const {category} = addList

  const changeType = (e) => {
    setAddList(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const HandleAddList = (e) => {
    e.preventDefault()
    console.log({...addList, ...filter_1, type, institution, campus})
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
                // required
                 />
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
              <Filter_1  filter_1={filter_1} setFilter_1={setFilter_1} />
            ) : category === 'Service' ? (
              <Filter_2  setFilter_1={setFilter_1}/>
            ) : category === 'Property' ? (
              <Filter_3 />
            ) : category === 'Roommate' ? (
              <Filter_4 setFilter_1={setFilter_1} />
            ) : null }
            </div>
            <button>Add</button>


        </form>
    </div>
  )
}

export default AddListing