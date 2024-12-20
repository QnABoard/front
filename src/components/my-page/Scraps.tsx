import { Post, fetchUserLikes } from '@/apis/user-info.api';
import { RootState } from '@/store/rootReducer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import QuestionHeader from '../ui/molecules/mainpage-molecule/QuestionHeader';
import QuestionBody from '../ui/molecules/mainpage-molecule/QuestionBody';
import QuestionTag from '../ui/atoms/mainpage-atom/QuesitonTag';
import QuestionBottom from '../ui/molecules/mainpage-molecule/QuestionBottom';

const Scraps = () => {
  const nickname = useSelector(
    (state: RootState) => state.user.userInfo?.nickname
  );

  const [userData, setUserData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (nickname) {
      setLoading(true);
      fetchUserLikes(nickname)
        .then((posts) => {
          setUserData(posts);
          setLoading(false);
        })
        .catch((error) => {
          console.error('에러 발생:', error);
          setLoading(false);
        });
    }
  }, [nickname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData.length) {
    return <div>좋아요한 게시글이 없습니다.</div>;
  }

  return (
    <ScrapContainer>
      <ScrapTitle>좋아요한 게시글</ScrapTitle>
      <QuestionBoxContainer>
        {userData.map((post) => (
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
    </ScrapContainer>
  );
};

export default Scraps;

const ScrapContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrapTitle = styled.div`
  width: 100%;
  height: 40px;
  padding: 5px 0px 10px 10px;
  font-size: 30px;
`;

const QuestionBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const QuestionItem = styled.div`
  margin: 10px;
`;
