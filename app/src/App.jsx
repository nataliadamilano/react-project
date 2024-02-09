import "./App.css";
import { Cards } from "./Cards/Cards";
import Img1 from "./assets/card1.jpg";
import Img2 from "./assets/card2.jpg";
import Img3 from "./assets/card3.jpg";
import Img4 from "./assets/card4.jpg";

function App() {
  const products = [
    { id: 1, title: "Producto 1", image: Img1 },
    { id: 2, title: "Producto 2", image: Img2 },
    { id: 3, title: "Producto 3", image: Img3 },
    { id: 4, title: "Producto 4", image: Img4 },
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
