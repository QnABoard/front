import Layout from '@/components/layout/Layout';
import Scraps from '@/components/my-page/Scraps';
import UserContents from '@/components/my-page/UserContents';
import UserPosts from '@/components/my-page/UserPosts';
import AdminPage from '@/pages/AdminPage';
import HomePage from '@/pages/HomePage';
import JoinPage from '@/pages/JoinPage';
import LoginPage from '@/pages/LoginPage';
import MyPage from '@/pages/MyPage';
import ProtectedRoute from '@/admin/AdminRoute';

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
        children: [
          {
            path: '',
            element: <UserContents />,
          },
          {
            path: 'myposts',
            element: <UserPosts />,
          },
          {
            path: 'scrap',
            element: <Scraps />,
          },
        ],
      },
      {
        path: '/adminpage',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
    ],
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
