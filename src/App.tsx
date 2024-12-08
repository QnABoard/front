import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Button from '@/components/atoms/Button';
import { RouterProvider, createBrowserRouter } from 'react-router';
import router from '@/routes/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // window 가 다시 포커스 될 때
      refetchOnMount: false, // 쿼리의 새 인스턴스가 마운트 될 때
      refetchOnReconnect: false, // 네트워크가 끊어졌다가 다시 연결될 때
    },
  },
});

const App = () => {
  const appRouter = createBrowserRouter(router);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
      <Button variant='primary'>테스트 버튼</Button>
    </QueryClientProvider>
  );
};

export default App;
