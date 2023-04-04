import { useEffect } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { getAuth } from './apis';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';

const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('getAuth()', getAuth());
    if (location.pathname === '/' && !getAuth()) {
      navigate('/login', { replace: true });
    }
    if (location.pathname === '/login' && getAuth()) {
      navigate('/', { replace: true });
    }
  }, []);

  const router = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return router;
};

export default Router;
