import React from 'react'

const ListCard = ({list,category, img, accommodation_name, price, description, service_name, service_desciption}) => {
  return (
    <div className='list-card'>
      <div className="img">
        <img src={category === list.category ? list.img: null} alt="" />
      </div>
      {category === list.category ? category: null}
      {accommodation_name}
      {price}
      {description}
      {service_name}
      {service_desciption} 
    </div>
  )
}

export default ListCard;