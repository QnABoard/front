import Scraps from '@/components/domain/my-page/Scraps';
import UserContents from '@/components/domain/my-page/UserContents';
import UserPosts from '@/components/domain/my-page/UserPosts';
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
    ],
  },
];

export default router;
