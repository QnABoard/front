import styled from 'styled-components';

const TitleContainer = styled.div`
  font-family: 'Pretendard-SemiBold', Helvetica;
  font-size: 10px;
  color: #000;
  margin-left: 8px;
`;

interface TitleProps {
  text: string;
}

function QuestionTitle({ text }: TitleProps) {
  return <TitleContainer>{text}</TitleContainer>;
}

export default QuestionTitle;
