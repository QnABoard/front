import HomePage from '@/pages/HomePage';
import MyPage from '@/pages/MyPage';

const router = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/mypage/:id',
    element: <MyPage />,
  },
];

export default router;
