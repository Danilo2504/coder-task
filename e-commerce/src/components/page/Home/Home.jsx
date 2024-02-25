import { useParams } from "react-router-dom";
import { ProductsList } from "../../common";

function Home() {
  const { category } = useParams();

  return (
    <div>
      <ProductsList greeting={category ? category : "Hola mundo"} />
    </div>
  );
}

export default Home;
