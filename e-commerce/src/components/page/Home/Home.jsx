import ProductsList from "../../common/ProductsList";
import Navbar from "../../layout/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <ProductsList greeting={"Hola mundo"} />
    </div>
  );
}

export default Home;
