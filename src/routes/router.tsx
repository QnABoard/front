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
import BoardWritePage from '@/pages/BoardWritePage';
import ContentDetailPage from '@/pages/ContentDetailPage';
import UpdateContentPage from '@/pages/UpdateContentPage';
import BoardModificationPage from '@/pages/BoardModificationPage';

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
        path: '/boardwrite',
        element: <BoardWritePage />,
      },
      {
        path: '/boardModification',
        element: <BoardModificationPage />,
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
        path: '/posts/:content_id',
        element: <ContentDetailPage />,
      },
      {
        path: '/posts/:content_id/edit',
        element: <UpdateContentPage />,
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
