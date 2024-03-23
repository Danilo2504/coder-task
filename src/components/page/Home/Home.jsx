import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { Loading, ScreenContainer } from "../../layout";
import { Card } from "../../common";
import { useFetch } from "../../../hooks/useFetch";
import { getProducts } from "../../../services/getProducts";

function Home() {
  const { categoryId } = useParams();
  const { data, isLoading } = useFetch(getProducts, categoryId);

  if (isLoading) return <Loading />;
  return (
    <ScreenContainer>
      <div className={styles.cardsGrid}>
        {data?.map((product, index) => (
          <Card key={index} data={product} />
        ))}
      </div>
    </ScreenContainer>
  );
}

export default Home;
