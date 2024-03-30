import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { Loading } from "../../layout";
import { Card } from "../../common";
import { useFetch } from "../../../hooks/useFetch";
import { getProducts } from "../../../services/getProducts";

function Home() {
  const { categoryId } = useParams();
  const { data, isLoading } = useFetch(getProducts, categoryId);

  if (isLoading) return <Loading />;
  return (
    <main className={styles.cardsGrid}>
      {data?.map((product, index) => (
        <Card key={index} data={product} />
      ))}
    </main>
  );
}

export default Home;
