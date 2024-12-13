import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import MyPage from '@/pages/MyPage';

const router = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
    ],
  },
];

export default router;
