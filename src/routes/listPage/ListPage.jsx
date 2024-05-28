import { useContext } from "react";
import "./listPage.scss"

import SearchInstitute from "../../component/searchInstitute/SearchInstitute";
import { Filter_1, Filter_2, Filter_3, Filter_4 } from "../../component/filter/Filter";
import { useState } from "react";
import ListCard from '../../component/listCard/ListCard';


import { SchoolContext } from "../../hooks/Context/SchoolContext";


const ListPage = ({category, description, img}) => {

  const {type, setType, institution, setInstitution,
    campus, setCampus, institutions, setInstitutions,
    campuses, setCampuses, filter_1, setFilter_1 } = useContext(SchoolContext);


  const [categoryList, setCategoryList] = useState(false)
  const [showFilter, setShowFilter] = useState(false)// for the filter buttom
  const [showList, setShowList] = useState(false)

  const Search = (e) => {
    e.preventDefault();
    // console.log({type : e.target.type.value})this would have being what i would have done 
    //a select input is like an object
    //values where destructured so that dey can be in an object format.
    console.log({ type, institution, campus, });
    setCategoryList(true)
    setShowFilter(false)
};

const handleFilter = (e) => {
  e.preventDefault();
  console.log(filter_1)
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
    {categoryList &&  <div className="content">
        <div className="left">
          <button className="filter_btn" onClick={() => (
            setShowFilter(prev => !prev)
          )}>Filter</button>

          {<div className={showFilter ? 'filter' : 'filter_2'}>
          <form onSubmit={handleFilter}>
            {category === 'Accommodation' ? (
              <Filter_1  filter_1={filter_1} setFilter_1={setFilter_1} >
                <button>Filter</button>
              </Filter_1>
            ) : category === 'Service' ? (
              <Filter_2  setFilter_1={setFilter_1}>
                <button>Filter</button>
              </Filter_2 >
            ) : category === 'Property' ? (
              <Filter_3 handleFilter={handleFilter}>
                <button>Filter</button>
              </Filter_3>
            ) : category === 'Roommate' ? (
              <Filter_4 setFilter_1={setFilter_1} >
                <button>Filter</button>
              </Filter_4>
            ) : null }
            </form>
            
          </div>}
        </div>

        <div className="right">
            
  
        </div>
    </div>}
    </>
  )
}

export default ListPage