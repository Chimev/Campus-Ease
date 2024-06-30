import './Homepage.scss'
import CategoryCard from '../../component/categoryCard/CategoryCard'
import { Link } from 'react-router-dom'


const Homepage = () => {


  return (
    <div className='homepage'>
        <div className="hero">
            <div className="wrapper">
            <h1>Find Comfort with campusEase</h1>
            <p>Discover Accomodation, Services, Properties and Roommate within your campus - All in One Place!</p>
            </div>
        </div>

        <div className="category-section">
            <div className="wrapper">
              <hr />
                <h2>Categories</h2>
                <div className="categories">
                <Link to={'/accomodation'}><CategoryCard category={"Accommodation"} description={"Find Accomodation around campus"} img={"./Accomodation.jpg"}/></Link>
                <Link to={'/service'}><CategoryCard category={"Service"} description={"Find Service provider around campus"} img={"./Service.png"}/></Link>
                <Link to={'/property'}><CategoryCard category={"Property"} description={"Buy/Sell/Swap properties within campus"} img={"./Trade.jpg"}/></Link>
                <Link to={'/roommate'}><CategoryCard category={"Roommates"} description={"Find roommates within campus"} img={"./Roommate.jpg"}/></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Homepage