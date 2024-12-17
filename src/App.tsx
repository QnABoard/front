import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router';
import router from '@/routes/router';
import { Provider } from 'react-redux'; // Redux Provider 임포트
import GlobalStyle from './styles/GlobalStyle';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <RouterProvider router={appRouter} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
