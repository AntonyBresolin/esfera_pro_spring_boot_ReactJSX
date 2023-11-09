import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// functions
import { clientsActiveLoader, clientsInactiveLoader } from "./functions/clientsFunctions";

// layouts
import { DashBoardLayout } from "./Layouts/DashBoardLayout";

// pages
import { Clients } from "./Pages/Clients";
import { Trashcan } from "./Pages/Trashcan";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Login } from "./Pages/Login";

const router = createBrowserRouter([
  {
    Component: ProtectedRoutes,
    children: [
      {
        path: '/',
        Component: DashBoardLayout,
        children: [
          {path: '/', Component: Clients, loader: clientsActiveLoader},
          {path: 'trashcan', Component: Trashcan, loader: clientsInactiveLoader},
        ],
      }
    ]
  },
  {path: 'login', Component: Login},
]);


export default function App() {
  return (
    <RouterProvider router={router}/>
  );
};


