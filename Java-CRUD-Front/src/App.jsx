import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// functions
import { clientsActiveLoader, clientsInactiveLoader } from "./functions/clientsFunctions";

// layouts
import { DashBoardLayout } from "./Layouts/DashBoardLayout";

// pages
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Login } from "./Pages/Login";
import { Clients } from "./Pages/ClientsPage/Clients";
import { ClientsError } from "./Pages/ClientsPage/ClientsError";
import { Trashcan } from "./Pages/TrashcanPage/Trashcan";
import { TrashcanError } from "./Pages/TrashcanPage/TrashcanError";
import { NotFound } from "./Pages/NotFound";

const router = createBrowserRouter([
  {
    Component: ProtectedRoutes,
    children: [
      {
        path: '/',
        Component: DashBoardLayout,
        children: [
          {path: '/', Component: Clients, loader: clientsActiveLoader, errorElement: <ClientsError/>},
          {path: 'trashcan', Component: Trashcan, loader: clientsInactiveLoader, errorElement: <TrashcanError/>},
        ],
      }
    ]
  },
  {path: 'login', Component: Login},
  {path: '*', Component: NotFound},
]);


export default function App() {
  return (
    <RouterProvider router={router}/>
  );
};


