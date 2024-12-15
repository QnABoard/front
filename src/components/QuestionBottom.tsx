import styled from 'styled-components';
import QuestionUser from './QuestionUser';
import QuestionUtil from './QuestionUtil';

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

interface QuestionBottomProps {
  nickname: string;
  time: string;
  likes: number;
  comments: number;
  views: number;
}

function QuestionBottom({
  nickname,
  time,
  likes,
  comments,
  views,
}: QuestionBottomProps) {
  return (
    <BottomContainer>
      <QuestionUser nickname={nickname} time={time} />
      <QuestionUtil likes={likes} comments={comments} views={views} />
    </BottomContainer>
  );
}

export default QuestionBottom;
