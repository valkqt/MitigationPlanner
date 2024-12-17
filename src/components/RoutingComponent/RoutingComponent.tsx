import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Encounter from "../../pages/Encounter/Encounter";
import { ActivationFlagsContextProvider } from "../../contexts/ActivationFlagsContextProvider";

const router = createBrowserRouter([{ path: "/", element: <Encounter /> }]);

export default function RoutingComponent() {
  return (
    <ActivationFlagsContextProvider>
      <RouterProvider router={router} />
    </ActivationFlagsContextProvider>
  );
}
