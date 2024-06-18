import { useContext, useEffect } from "react";
import "./listPage.scss"

import SearchInstitute from "../../component/searchInstitute/SearchInstitute";
import { Filter_1, Filter_2, Filter_3, Filter_4 } from "../../component/filter/Filter";
import { useState } from "react";
import ListCard from '../../component/listCard/ListCard';


import { SchoolContext } from "../../hooks/Context/SchoolContext";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../utilities/firebase";


const ListPage = ({category, description, img}) => {

  const {type, setType, institution, setInstitution,
    campus, setCampus, institutions, setInstitutions,
    campuses, setCampuses, filter_1, setFilter_1 } = useContext(SchoolContext);


  const [categoryList, setCategoryList] = useState(false)
  const [filterList, setFilterList] = useState()
  const [showFilter, setShowFilter] = useState(false)// for the filter buttom
  const [showList, setShowList] = useState(false)
  const [listing, setListing] = useState([])
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(false)

  useEffect(() => {
    async function fetchUserListings(){
      try {
        const listingRef = collection(db, "listings")
         const q = query(
          listingRef,
          where("category", "==", category),
          where("type", "==", type  ),
          where("institution", "==", institution),
          where("campus", "==", campus),
          orderBy("timestamp", "desc")
         );
       
         const querySnap = await getDocs(q)

         const listings = [];
         querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setTimeout(() => {
          setLoading(true)
          setListing(listings)
          console.log(listings)
        }, 3000);
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserListings()
  }, [categoryList])
  
  
  

  function Search(e) {
    e.preventDefault();
    // console.log({type : e.target.type.value})this would have being what i would have done 
    //a select input is like an object
    //values where destructured so that dey can be in an object format.
    console.log({ type, institution, campus });
    setCategoryList(prev => !prev);
  }


  const handleFilter = (e) => {
    e.preventDefault();
    const {min, max, accommodationType, service, property, level, gender} = filter_1;

    // const filterAccommodation = listing.filter( (list) => list.data.price > max);
    const filterLisitng = listing.filter( (list) => {
      if (category === "Service"){
        return (
            list.data.service === service
          )
        }
      if (category === "Property"){
        return (
          list.data.property === property 
        )
      }
      if (category === "Roommate"){
        return (
          list.data.level === level  && list.data.gender === gender
        )
      }
      
      
    } )
    setListing(filterLisitng)
    console.log(filterLisitng)

  }



  return (
    <>
      <div className="hero-category">
        <div className="info">
            <h2>{category}</h2>
            <p>{description}</p>
        </div>
        
        <div className="img">
            <img src={img} alt="" />
        </div>
        <div className="search-container">
          <form onSubmit={Search}>
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
            >
            <button type="submit">Search</button>
            </SearchInstitute>
          </form>
        </div>
    </div>


    {categoryList && <div className="content">
        <div className="left">
          <button className="filter_btn" onClick={() => (
            setShowFilter(prev => !prev)
          )}>Filter</button>

          {<div className={showFilter ? 'filter' : 'filter_2 filter'}>
          <form onSubmit={handleFilter}>
            {category === 'Accommodation' && <Filter_1 filter_1={filter_1} setFilter_1={setFilter_1} />}
            {category === 'Service' && <Filter_2 setFilter_1={setFilter_1} />}
            {category === 'Property' && <Filter_3 setFilter_1={setFilter_1} />}
            {category === 'Roommate' && <Filter_4 setFilter_1={setFilter_1} />}
            <button type="submit">Apply Filter</button>
          </form>
            
          </div>}
        </div>

        <div className="right">
            {loading ? listing.map(listing => {
              return (
                <ListCard
                key={listing.id}
                id={listing.id}
                listing={listing.data}
                onDelete={() => onDelete(listing.id)}
                // onEdit={() => onEdit(listing.id)}
                profile={profile}
              />
              )
            }) :  <h2 className="error">Loading...</h2> 
            }
        </div>
    </div>}
    </>
  )
}

export default ListPage