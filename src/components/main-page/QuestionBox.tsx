import { useEffect, useState } from 'react';
import styled from 'styled-components';
import QuestionBody from '../ui/molecules/mainpage-molecule/QuestionBody';
import QuestionHeader from '../ui/molecules/mainpage-molecule/QuestionHeader';
import QuestionTag from '../ui/atoms/mainpage-atom/QuesitonTag';
import QuestionBottom from '../ui/molecules/mainpage-molecule/QuestionBottom';
import { fetchMainData } from '@/apis/maindata.api';
import { mainPosts } from '@/types/main.model';

const QuestionBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 30px;
`;

const QuestionItem = styled.div`
  margin: 10px;
`;

function QuestionBox() {
  const [posts, setPosts] = useState<mainPosts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchMainData();
        setPosts(data.posts);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) return <div>데이터를 불러오는 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <QuestionBoxContainer>
      {posts.map((post) => (
        <QuestionItem key={post.id}>
          <QuestionHeader solved={post.solved} title={post.title} />
          <QuestionBody content={post.content} />
          {post.tags && <QuestionTag tags={post.tags.split(',')} />}
          <QuestionBottom
            nickname={post.nickname}
            time={post.created_at}
            likes={post.like_count}
            comments={post.comment_count}
            views={post.view}
          />
        </QuestionItem>
      ))}
    </QuestionBoxContainer>
  );
}

export default QuestionBox;
