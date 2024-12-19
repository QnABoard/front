import styled from 'styled-components';

const TitleContainer = styled.div`
  font-family: 'Pretendard-SemiBold', Helvetica;
  font-size: 18px;
  color: #000;
  margin-top: 5px;
  margin-left: 30px;
`;

interface TitleProps {
  text: string;
}

function QuestionTitle({ text }: TitleProps) {
  return <TitleContainer>{text}</TitleContainer>;
}

export default QuestionTitle;
