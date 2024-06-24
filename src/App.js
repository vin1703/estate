// import './App.css';
import HomePage from './Pages/homePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import { createBrowserRouter,RouterProvider,Route } from 'react-router-dom';
import ListPage from './Pages/listPage/ListPage';
import {RequireAuth,Layout} from './Pages/layout/Layout'
import SinglePage from './Pages/singlePage/SinglePage';
import ProfilePage from './Pages/profilePage/ProfilePage';
import Login from './Pages/login/Login';
import Register from './Pages/register/Register';
import ProfileUpdatePage from './Pages/profileUpdatePage/ProfileUpdatePage';
import NewPostPage from './Pages/newPostPage/NewPostPage';
import { listPageLoader, profilePageLoader, singlePageLoader } from './lib/loaders';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader: listPageLoader
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader:singlePageLoader
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        }
      ]
    },
    {
      path:'/',
      element:<RequireAuth/>,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>,
          loader : profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage  />,
        },
      ]
    }

  ]);
  return (  
    // <div className="layout">
    //   <div className="navbar">
    //     <Navbar/>
    //   </div>
    //   <div className="content">
    //   <HomePage/>
    //   </div>
      
      
    // </div>
    <RouterProvider router={router}/>
  );
}

export default App;
