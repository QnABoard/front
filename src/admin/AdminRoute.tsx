import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { userInfo } = useSelector((state: RootState) => state.user);

  // 로그인하지 않은 경우
  if (!userInfo) {
    return <Navigate to='/login' replace />;
  } else if (!allowedRoles.includes(userInfo.role)) {
  }

  // 역할이 허용되지 않은 경우
  if (!allowedRoles.includes(userInfo.role)) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>; // 자식 요소 렌더링
};

export default ProtectedRoute;
