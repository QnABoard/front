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

  const { post } = useContent({ content_id });

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

  // 닉네임 하드코딩

  return (
    <ContentDetailPageStyle>
      <QuestionHeader
        title={post.title}
        nickname={post.nickname}
        created_at={post.created_at}
        updated_at={post.updated_at ?? ''}
        solve={solve}
        view={post.view}
        content_id={content_id ?? ''}
      />
      <QuestionContent content={post.content} />
      <QuestionFooter
        nickname={post.nickname}
        liked={!!post.liked}
        like_count={post.like_count}
        tags={post.tags ?? ''}
        handleSolvedClick={handleSolvedClick}
        solve={solve}
        content_id={content_id ?? ''}
      />
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
