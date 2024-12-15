import styled from 'styled-components';
import QuestionContent from '@/components/content-detail/QuestionContent';
import QuestionFooter from '@/components/content-detail/QuestionFooter';
import { useParams } from 'react-router';
import { useContent } from '@/hooks/useContent';
import QuestionHeader from '@/components/content-detail/QuestionHeader';
import { IPost, IStatus } from '@/types/content';

export default function ContentDetailPage() {
  const { content_id } = useParams();

  const { content } = useContent({ content_id });

  // 에러페이지 띄워주기
  if (!content) return;

  const post: IPost = content?.post[0];
  const tokenStatus: IStatus | undefined = content?.status
    ? content.status[0]
    : undefined;

  return (
    <ContentDetailPageStyle>
      <QuestionHeader
        title={post.title}
        created_at={post.created_at}
        updated_at={post.updated_at ?? ''}
        solved={post.solved}
        view={post.view}
      />
      <QuestionContent content={post.content} />
      <QuestionFooter
        liked={!!tokenStatus?.liked}
        like_count={post.like_count}
        tags={post.tags ?? ''}
        scrapped={!!tokenStatus?.scrapped}
        solved={post.solved}
      />
    </ContentDetailPageStyle>
  );
}

const ContentDetailPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
