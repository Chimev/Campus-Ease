import React from 'react'
import "./listCard.scss"

import { Link } from 'react-router-dom';
import Moment from "react-moment";

const ListCard = ({listing, id}) => {
  return (
    <div className='list-card'> 
        <div className="img">
          <img src={listing.imgUrls[0]} alt="" />
        </div>
    
        <Moment fromNow className='time'>
          {listing.timestamp?.toDate()}
        </Moment>

        <div className='info'>
          <p className='category'>{listing.category}</p>
          <p><span>Institution Type: </span>{listing.type}</p>
          <p><span>School: </span>{listing.institution}</p>
          <p><span>Campus: </span>{listing.campus}</p>
          {listing.category === 'Accommodation' 
          ? <>
          <p><span>Price: </span>{listing.price}</p>
          <p><span>Accommodation Type: </span>{listing.accommodationType}</p>
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
          
        </div>
      </div>
  )
}

export default ListCard;