import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ProductListContainer } from "../components/ProductList/ProductListContainer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductListContainer />,
      },
    ],
  },
]);
