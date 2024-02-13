
import './App.css';
import Navigational from "../navigational/Navigational"
import FeedArea from "../feedArea/FeedArea";
import PostArea from "../postArea/PostArea"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { SkeletonTheme } from 'react-loading-skeleton'



function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Navigational />}>
      <Route index element={<FeedArea />} />
      <Route path="r/:subreddit/:postId" element={<PostArea />} />
      <Route path=":postFilterParam" element={<FeedArea />}/>
    </Route>
  ))
  return (
    <SkeletonTheme baseColor="#c5c2c2" highlightColor="white">
      <RouterProvider router={router} />
    </SkeletonTheme>

  )
}

export default App;
