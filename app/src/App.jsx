import "./App.css";
import { Cards } from "./Cards/Cards";
import Img1 from "./assets/card1.webp";
import Img2 from "./assets/card2.jpg";
import Img3 from "./assets/card3.webp";
import Img4 from "./assets/card4.webp";

function App() {
  const products = [
    {
      id: 1,
      secondaryHeader: "¡Imperdibles!",
      title: "Descubrí todas las novedades",
      btnTitle: "Ver ofertas",
      image: Img1,
    },
    {
      id: 2,
      secondaryHeader: "Cuponera",
      title: "¡Descuentos acumulables!",
      btnTitle: "Canjeá tu cupón",
      image: Img2,
    },
    {
      id: 3,
      secondaryHeader: "¡No te las pierdas!",
      title: "Ofertas sólo por 24 horas",
      btnTitle: "Ver más",
      image: Img3,
    },
    {
      id: 4,
      secondaryHeader: "Mercado Play",
      title: "Series, películas y más ¡gratis!",
      btnTitle: "Ver ahora",
      image: Img4,
    },
  ];

  return (
    <>
      <div className="cards-container">
        {products.map((product) => (
          <Cards key={product.id} props={product} />
        ))}
      </div>
    </>
  );
}

export default App;
