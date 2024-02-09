import './Cards.css'

const Cards = ({ props }) => {

  const { title, image } = props
  return (
    <>
      <div className="product-card">
        <h3 className="card-title">{title}</h3>
        <img src={image} alt="" />
      </div>
    </>
  )
  }
  
  export { Cards }
  