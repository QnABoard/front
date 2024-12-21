import styled from 'styled-components';

interface Props {
  content: string | undefined;
}

export default function QuestionContent({ content }: Props) {
  return <QuestionContentStyle>{content}</QuestionContentStyle>;
}

const QuestionContentStyle = styled.div`
  font-size: 15px;
`;
