import { updateUserIntroduce } from '@/apis/board.api';
import { fetchUserInfo } from '@/apis/user-info.api';
import Button from '@/components/ui/atoms/Button';
import RichTextEditor from '@/components/ui/molecules/QuillEditor';
import { RootState } from '@/store/rootReducer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const BoardModificationPage = () => {
  const nickname = useSelector(
    (state: RootState) => state.user.userInfo?.nickname
  );
  const id = useSelector((state: RootState) => state.user.userInfo?.id);

  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (nickname) {
      setLoading(true);
      fetchUserInfo(nickname)
        .then((data) => {
          setContent(data.profile.introduce);
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

  const registerBoard = async () => {
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    try {
      console.log('content: ' + content);
      const response = await updateUserIntroduce(id as number, content);
      console.log('게시글 등록 성공:', response);
      alert('게시글이 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <WriteContainer>
      <div style={{ margin: '20px' }}>
        <RichTextEditor value={content} onChange={setContent} />
      </div>
      <RegisterSection>
        <Button variant='tag' onClick={() => window.history.back()}>
          취소
        </Button>
        <Button variant='primary' onClick={registerBoard}>
          등록
        </Button>
      </RegisterSection>
    </WriteContainer>
  );
};

export default BoardModificationPage;

const WriteContainer = styled.div`
  width: 100%;
  height: fit-content;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 0px 0px 10px 0px;
`;

const RegisterSection = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 0px 20px 0px 20px;
  gap: 10px;
`;
