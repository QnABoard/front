import styled from 'styled-components';

const BodyContainer = styled.div`
  font-family: 'Pretendard-ExtraLight', Helvetica;
  font-size: 10px;
  line-height: 1.5;
  color: #333;
  margin-top: 8px;
`;

interface QuestionBodyProps {
  content: string;
}

function QuestionBody({ content }: QuestionBodyProps) {
  return <BodyContainer>{content}</BodyContainer>;
}

export default QuestionBody;
