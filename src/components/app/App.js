
import './App.css';
import Navigational from "../navigational/Navigational" 
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { SkeletonTheme } from 'react-loading-skeleton'


function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Navigational/>}/>
  ))
  return (
    <SkeletonTheme baseColor="#c5c2c2" highlightColor="white">
      <RouterProvider router ={ router } />
    </SkeletonTheme>
    
  )
}

export default App;
