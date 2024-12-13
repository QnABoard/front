import HomePage from '@/pages/HomePage';
import JoinPage from '@/pages/JoinPage';
import LoginPage from '@/pages/LoginPage';

const router = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/join',
    element: <JoinPage />,
  },
];

export default router;
