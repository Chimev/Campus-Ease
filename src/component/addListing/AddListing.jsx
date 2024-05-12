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
    setCampuses} = useContext(SchoolContext);


  const [category, setCategory] = useState()

  const changeType = (e) => {
    setCategory(e.target.value)
  }

  return (
    <div className='add-listing'>
      <hr />
        <h2>Add Listing</h2>
        <form>
            <div className='input'>
                <p>CATEGORY</p>
                <select name='category' value={category} onChange={changeType}>
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
                required />
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
              <Filter_1/>
            ) : category === 'Service' ? (
              <Filter_2/>
            ) : category === 'Property' ? (
              <Filter_3/>
            ) : category === 'Roommate' ? (
              <Filter_4/>
            ) : null }
            </div>
            
            <button>Add</button>


        </form>
    </div>
  )
}

export default AddListing