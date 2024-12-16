import styled from 'styled-components';
import logo from '@/assets/logo.svg';
import Avatar from './ui/atoms/Avator';
import AuthButton from './AuthButton';

const Header = () => (
  <HeaderContainer>
    <HeaderWrapper>
      <img src={logo} alt='Logo' />
      <div>
        <Avatar
          src='https://jmagazine.joins.com/_data2/photo/2021/04/838745483_D5lXOQuU_5.jpg'
          size='small'
          alt='User Avatar'
        />
      </div>
    </HeaderWrapper>
    <AuthButton />
  </HeaderContainer>
);

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  width: 980px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
