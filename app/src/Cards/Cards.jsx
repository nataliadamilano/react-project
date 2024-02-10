import './Cards.css'

const Cards = ({ props }) => {

  const { secondaryHeader, title, image, btnTitle } = props
  return (
    <>
      <div className="product-card">
        <div className="card-info">
          <h2>{secondaryHeader}</h2>
          <h1>{title}</h1>
          <a href="#">{btnTitle}</a>
        </div>
        <img src={image} alt="" />
      </div>
    </>
  )
  }
  
  export { Cards }
  