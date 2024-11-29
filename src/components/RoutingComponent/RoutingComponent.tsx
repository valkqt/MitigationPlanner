import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Encounter from "../../pages/Encounter/Encounter";

const router = createBrowserRouter([
  // { path: "/", element: <Home /> },
  { path: "/", element: <Encounter /> },
]);

export default function RoutingComponent() {
  return <RouterProvider router={router} />;
}
