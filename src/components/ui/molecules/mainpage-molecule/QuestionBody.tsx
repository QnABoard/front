import styled from 'styled-components';

const BodyContainer = styled.div`
  font-family: 'Pretendard-Light', Helvetica;
  font-size: 15px;
  margin-left: 5px;
  line-height: 1.5;
  color: #333;
  margin-top: 20px;
  margin-right: 5px;
`;

interface QuestionBodyProps {
  content: string;
}

function QuestionBody({ content }: QuestionBodyProps) {
  return <BodyContainer>{content}</BodyContainer>;
}

export default QuestionBody;
