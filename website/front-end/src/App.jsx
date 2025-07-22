import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import axios from 'axios';
import './App.css'
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import ArticlesListPage from './pages/ArticlesListPage.jsx';
import Layout from './Layout.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  const routes = [
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '/',
          element: <HomePage/>,
        },
        {
          path: '/about',
          element: <AboutPage/>,
        },
        {
          path: '/articles',
          element: <ArticlesListPage/>
        },
        {
          path: '/articles/:name',
          element: <ArticlePage/>,
          loader: async function(){
            const response = await axios.get('/api/articles/learn-node');
            const {upvotes, comments} = response.data;
            return {upvotes, comments};
          }
        }
      ]
    }
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router}/>
}

export default App
