import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// functions
import { clientsActiveLoader, clientsInactiveLoader } from "./functions/clientsFunctions";

// layouts
import { DashBoardLayout } from "./Layouts/DashBoardLayout";

// pages
import { DashBoard } from "./Pages/DashBoard";
import { Clients } from "./Pages/Clients";
import { Trashcan } from "./Pages/Trashcan";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DashBoardLayout />}>
      <Route index element={<DashBoard />} />
      <Route path="clients" element={<Clients />} loader={clientsActiveLoader}/>
      <Route path="trashcan" element={<Trashcan />} loader={clientsInactiveLoader} />
    
    </Route>
));



const App = () => {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
