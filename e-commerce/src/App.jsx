import ProductsList from "./components/common/ProductsList";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <ProductsList greeting={"¡Hola mundo!"} />
    </>
  );
}

export default App;
