import styled from 'styled-components';
import QuestionContent from '@/components/content-detail/QuestionContent';
import QuestionFooter from '@/components/content-detail/QuestionFooter';
import QuestionHeader from '@/components/content-detail/QuestionHeader';
import QuestionComment from '@/components/content-detail/QuestionComment';
import { useSolved } from '@/hooks/useSolved';
export default function ContentDetailPage() {
  const { post, handleSolvedClick } = useSolved();

  /**
   * 작성자 헤더 토큰 데이터 통신해서 받아와야함
   */

  return (
    <ContentDetailPageStyle>
      <QuestionHeader solve={!!post?.solved} />
      <QuestionContent content={post?.content} />
      <QuestionFooter
        handleSolvedClick={handleSolvedClick}
        solve={!!post?.solved}
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
