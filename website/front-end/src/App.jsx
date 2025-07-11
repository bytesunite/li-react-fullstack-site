import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import ArticlesListPage from './pages/ArticlesListPage.jsx';

function App() {
  const routes = [
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
      path: '/articles/individual',
      element: <ArticlePage/>
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router}/>
}

export default App
