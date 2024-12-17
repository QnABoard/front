import styled from 'styled-components';
import QuestionContent from '@/components/content-detail/QuestionContent';
import QuestionFooter from '@/components/content-detail/QuestionFooter';
import { useParams } from 'react-router';
import { useContent } from '@/hooks/useContent';
import QuestionHeader from '@/components/content-detail/QuestionHeader';
import { useEffect, useState } from 'react';
export default function ContentDetailPage() {
  const { content_id } = useParams();

  const { post, tokenStatus } = useContent({ content_id });

  /**
   * 작성자 헤더 토큰 데이터 통신해서 받아와야함
   */
  const [solve, setSolve] = useState<boolean>();

  useEffect(() => {
    setSolve(!!post?.solved);
  }, [post?.solved]);

  if (!post) return;

  const handleSolvedClick = () => {
    setSolve((prev) => !prev);
  };

  return (
    <ContentDetailPageStyle>
      <QuestionHeader
        title={post.title}
        nickname={`유저1`}
        created_at={post.created_at}
        updated_at={post.updated_at ?? ''}
        solve={solve}
        view={post.view}
        content_id={content_id ?? ''}
      />
      <QuestionContent content={post.content} />
      <QuestionFooter
        liked={!!tokenStatus?.liked}
        like_count={post.like_count}
        tags={post.tags ?? ''}
        handleSolvedClick={handleSolvedClick}
        solve={solve}
      />
    </ContentDetailPageStyle>
  );
}

const ContentDetailPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
