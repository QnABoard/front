import { Outlet } from 'react-router';
import styled from 'styled-components';
import Header from '../domain/Header';

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
