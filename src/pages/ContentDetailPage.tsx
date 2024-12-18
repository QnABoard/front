import styled from 'styled-components';
import QuestionContent from '@/components/content-detail/QuestionContent';
import QuestionFooter from '@/components/content-detail/QuestionFooter';
import { useParams } from 'react-router';
import { useContent } from '@/hooks/useContent';
import QuestionHeader from '@/components/content-detail/QuestionHeader';
import { useEffect, useState } from 'react';
import QuestionComment from '@/components/content-detail/QuestionComment';
export default function ContentDetailPage() {
  const { content_id } = useParams();

  const { posts } = useContent({ content_id });
  console.log('postsPage', posts);

  /**
   * 작성자 헤더 토큰 데이터 통신해서 받아와야함
   */
  const [solve, setSolve] = useState<boolean>();

  useEffect(() => {
    setSolve(!!posts?.solved);
  }, [posts?.solved]);

  if (!posts) return;

  const handleSolvedClick = () => {
    setSolve((prev) => !prev);
  };

  return (
    <ContentDetailPageStyle>
      <QuestionHeader solve={solve} />
      <QuestionContent content={posts.content} />
      <QuestionFooter handleSolvedClick={handleSolvedClick} solve={solve} />
      <div className='border'></div>
      <QuestionComment />
    </ContentDetailPageStyle>
  );
}

const ContentDetailPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  .border {
    border: 0.3px solid #d9d9d9;
  }
`;
