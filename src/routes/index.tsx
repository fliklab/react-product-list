import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ProductListContainer } from "../components/ProductList/ProductListContainer";
import { LikedItemsPage } from "../pages/LikedItemsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductListContainer />,
      },
      {
        path: "/liked",
        element: <LikedItemsPage />,
      },
    ],
  },
]);
