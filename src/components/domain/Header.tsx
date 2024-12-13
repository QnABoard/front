import styled from 'styled-components';
import { ReactComopnent as Logo } from '@/assets/logo.svg';
const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      <div>유저 아바타</div>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 170px;
  background-color: green;
  display: flex;
  align-items: center;
`;
