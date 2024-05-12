import "./CategoryCard.scss"
const CategoryCard = ({category, img, description}) => {
  return (
    <div className="CategoryCard">
        <div className="info"> 
        <h3>{category}</h3>
        <p>{description}</p>
        </div>
        <div className="img">
        <img src={img} alt="" />
        </div>
    </div>
  )
}

export default CategoryCard