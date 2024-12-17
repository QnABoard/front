import styled from 'styled-components';
import QuestionButton from '../../atoms/mainpage-atom/QuestionButton';
import QuestionTitle from '../../atoms/mainpage-atom/QuestionTitle';

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
