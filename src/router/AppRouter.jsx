import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";
import { NotFound } from "../components/page";
import { routes } from "./routes";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ id, path, Element }) => (
          <Route exact key={id} path={path} element={<Element />} />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
