import styled from 'styled-components';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface UserCardProps {
  nickname: string;
  email: string;
  createdAt: string;
  icon: string | null;
  isOpen: boolean;
}

// Styled Components
const CardContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: ${(props) => (props.isOpen ? '8px 8px 0 0' : '8px')};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
  font-weight: bold;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const UserCard = ({ nickname, icon, isOpen }: UserCardProps) => {
  return (
    <CardContainer isOpen={isOpen}>
      <UserInfo>
        <Avatar
          src={icon || 'https://via.placeholder.com/50'}
          alt='User Icon'
        />
        <TextContainer>
          <Name>{nickname}</Name>
        </TextContainer>
      </UserInfo>

      <IconWrapper>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </IconWrapper>
    </CardContainer>
  );
};

export default UserCard;
