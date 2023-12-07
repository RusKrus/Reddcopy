
import './App.css';
import Navigational from "../navigational/Navigational" 
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Navigational/>}/>
  ))
  return (
    <RouterProvider router ={ router } />
  )
}

export default App;
