import { useState } from 'react';
import styled from 'styled-components';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';

// Styled Components
const UtilContainer = styled.div`
  display: flex;
  gap: 12px;
  font-family: 'Pretendard-ExtraLight', Helvetica;
  font-size: 10px;
  color: #666;
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
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <UtilContainer>
      <IconWrapper onClick={toggleLike}>
        {isLiked ? (
          <SolidHeartIcon color='#e53e3e' />
        ) : (
          <OutlineHeartIcon color='#666' />
        )}
        <span>{likeCount}</span>
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
