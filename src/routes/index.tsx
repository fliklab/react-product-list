import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { MainPage } from "./MainPage";
import { LikedItemsPage } from "../pages/LikedItemsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "liked",
        element: <LikedItemsPage />,
      },
    ],
  },
]);
