import styled from 'styled-components';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';

// Styled Components
const UtilContainer = styled.div`
  display: flex;
  gap: 12px;
  font-family: 'Pretendard-ExtraLight', Helvetica;
  font-size: 13px;
  color: #666;
  margin-right: 5px;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  user-select: none;

  svg {
    width: 16px;
    height: 16px;
  }
`;

interface QuestionUtilProps {
  likes: number;
  comments: number;
  views: number;
}

function QuestionUtil({ likes, comments, views }: QuestionUtilProps) {
  return (
    <UtilContainer>
      <IconWrapper>
        <SolidHeartIcon color='#f8a7a7' />
        <span>{likes}</span>
      </IconWrapper>
      <IconWrapper>
        <ChatBubbleOvalLeftEllipsisIcon color='#666' />
        <span>{comments}</span>
      </IconWrapper>
      <IconWrapper>
        <EyeIcon color='#666' />
        <span>{views}</span>
      </IconWrapper>
    </UtilContainer>
  );
}

export default QuestionUtil;
