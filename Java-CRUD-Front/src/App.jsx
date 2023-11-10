// Rotas
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Funções
import { clientsActiveLoader, clientsInactiveLoader } from "./functions/clientsDataFunctions";

// Layout geral
import { RootLayout } from "./Layouts/RootLayout";

// Paginas
import { TrashcanError } from "./Pages/TrashcanPage/TrashcanError";
import { ClientsError } from "./Pages/ClientsPage/ClientsError";
import { Trashcan } from "./Pages/TrashcanPage/Trashcan";
import { Clients } from "./Pages/ClientsPage/Clients";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { NotFound } from "./Pages/NotFound";
import { Login } from "./Pages/Login";

const router = createBrowserRouter([
  {
    // Rotas protegidas
    Component: ProtectedRoutes,
    children: [
      {
        path: '/',
        Component: RootLayout,
        children: [
          {path: '/', Component: Clients, loader: clientsActiveLoader, errorElement: <ClientsError/>},
          {path: 'trashcan', Component: Trashcan, loader: clientsInactiveLoader, errorElement: <TrashcanError/>},
        ],
      }
    ]
  },
  // Rotas não protegidas
  {path: 'login', Component: Login},
  {path: '*', Component: NotFound},
]);


export default function App() {
  return (
    <RouterProvider router={router}/>
  );
};


