import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ArticlesListPage from './pages/ArticlesListPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import Layout from './Layout.jsx';

function App() {
  const routes = [
    { 
      path:'/',
      element:<Layout />,
      children:[
        { 
          path:'/',
          element:<HomePage/>,
        },
        {
          path:'/about',
          element:<AboutPage/>
        },
        {
          path:'/articles',
          element: <ArticlesListPage />
        },
        {
          path:'/articles/:name',
          element: <ArticlePage />
        }
      ]
    }
  ];

  const router = createBrowserRouter(routes);
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
