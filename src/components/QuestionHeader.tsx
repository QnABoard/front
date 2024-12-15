import styled from 'styled-components';
import QuestionButton from './QuestionButton';
import QuestionTitle from './QuestionTitle';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface QuestionHeaderProps {
  solved: number;
  title: string;
}

function QuestionHeader({ solved, title }: QuestionHeaderProps) {
  return (
    <HeaderContainer>
      <QuestionButton solved={solved} />
      <QuestionTitle text={title} />
    </HeaderContainer>
  );
}

export default QuestionHeader;
