import styled from 'styled-components';

const UserContainer = styled.div`
  font-family: 'Pretendard-ExtraLight', Helvetica;
  font-size: 10px;
  color: #666;
  display: flex;
  gap: 8px;
`;

interface QuestionUserProps {
  nickname: string;
  time: string;
}

function QuestionUser({ nickname, time }: QuestionUserProps) {
  return (
    <UserContainer>
      <span>{nickname}</span>
      <span>{time}</span>
    </UserContainer>
  );
}

export default QuestionUser;
