import React from 'react'
import "./listCard.scss"
import ListingPost from '../../routes/listingPost/ListingPost';

const ListCard = ({listing}) => {
  return (
    <div className='list-card'>
      {listing.data.category}
    </div>
  )
}

export default ListCard;