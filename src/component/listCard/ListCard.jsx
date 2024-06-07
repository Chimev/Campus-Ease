import React from 'react'
import "./listCard.scss"

import { Link } from 'react-router-dom';
import Moment from "react-moment";

const ListCard = ({listing, id}) => {
  return (
    <li className='list-card'> 
          <img src={listing.imgUrls[0]} alt="" />
        
    
        <Moment fromNow className='time'>
          {listing.timestamp?.toDate()}
        </Moment>

        <div className='info'>
          <p className='category'>{listing.category}</p>
          <div className="school">
          <p><span>Institution Type: </span>{listing.type}</p>
          <p><span>School: </span>{listing.institution}</p>
          <p><span>Campus: </span>{listing.campus}</p>
          </div>
          
          {listing.category === 'Accommodation' 
          ? <>
          <p><span>Price: </span>{listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          <p><span>Type: </span>{listing.accommodationType}</p>
          </> : ''
          }
          {listing.category === 'Service' 
          ? <>
          <p><span>Service: </span>{listing.service}</p>
          </> : ''
          }
          {listing.category === 'Property' 
          ? <>
          <p><span>Property: </span>{listing.property}</p>
          </> : ''
          }
          {listing.category === 'Roommate' 
          ? <>
          <p><span>Gender: </span>{listing.gender}</p>
          <p><span>Level: </span>{listing.level}</p>
          </> : ''
          }
          <p><span>Description: </span>{listing.description}</p>
          
        </div>
      </li>
  )
}

export default ListCard;