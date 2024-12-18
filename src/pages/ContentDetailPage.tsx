import styled from 'styled-components';
import QuestionContent from '@/components/content-detail/QuestionContent';
import QuestionFooter from '@/components/content-detail/QuestionFooter';
import QuestionHeader from '@/components/content-detail/QuestionHeader';
import QuestionComment from '@/components/content-detail/QuestionComment';
import { useSolved } from '@/hooks/useSolved';
import { useNavigate } from 'react-router';
import { useContent } from '@/hooks/useContent';
export default function ContentDetailPage() {
  const navigate = useNavigate();
  const { content_id, nicknameCheck, post, handleSolvedClick } = useSolved();
  const { posts } = useContent({ content_id });

  // 존재하지 않는 페이지일때의 처리
  if (!posts) {
    alert('존재하지 않는 페이지 입니다.');
    navigate('/');
    return;
  }

  return (
    <ContentDetailPageStyle>
      <QuestionHeader solve={!!post?.solved} nicknameCheck={nicknameCheck} />
      <QuestionContent content={post?.content} />
      <QuestionFooter
        handleSolvedClick={handleSolvedClick}
        solve={!!post?.solved}
        nicknameCheck={nicknameCheck}
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
