import { useContext } from "react";
import "./listPage.scss"

import SearchInstitute from "../../component/searchInstitute/SearchInstitute";
import { Filter_1, Filter_2, Filter_3, Filter_4 } from "../../component/filter/Filter";
import { useState } from "react";
import ListCard from '../../component/listCard/ListCard';
import { list } from "../../../data/list";


import { SchoolContext } from "../../hooks/Context/SchoolContext";


const ListPage = ({category, description, img}) => {

  const {type, setType, institution, setInstitution,
    campus, setCampus, institutions, setInstitutions,
    campuses,
    setCampuses} = useContext(SchoolContext);


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
            setShowFilter(true)
          )}>Filter</button>

          {<div className={showFilter ? 'filter' : 'filter_2'}>
            {category === 'Accommodation' ? (
              <Filter_1>
                <button>Filter</button>
              </Filter_1>
            ) : category === 'Service' ? (
              <Filter_2>
                <button>Filter</button>
              </Filter_2>
            ) : category === 'Property' ? (
              <Filter_3>
                <button>Filter</button>
              </Filter_3>
            ) : category === 'Roommate' ? (
              <Filter_4>
                <button>Filter</button>
              </Filter_4>
            ) : null }
          </div>}
        </div>

        <div className="right">
           {list.map((list, i) => (
            <ListCard list={list}
            key={i}
            img={category}
            category={category} 
            // service_name={category === list.category ? list.sevice_name : null}
            // accommodation_name={category === list.category ? list.accommodation_name : null}
            // price={category === list.category ? list.price : null} 
            />
           ))}
            
  
        </div>
    </div>}
    </>
  )
}

export default ListPage