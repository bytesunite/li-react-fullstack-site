import {createBrowserRouter, RouterProvider} from 'react-router-dom';
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
          element: <ArticlePage/>
        }
      ]
    }
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router}/>
}

export default App
