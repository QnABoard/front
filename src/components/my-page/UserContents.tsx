import { UserData, fetchUserInfo } from '@/apis/user-info.api';
import { RootState } from '@/store/rootReducer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import Button from '../ui/atoms/Button';
import { useNavigate } from 'react-router';

const UserContents = () => {
  const navigate = useNavigate();
  const nickname = useSelector(
    (state: RootState) => state.user.userInfo?.nickname
  );

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (nickname) {
      setLoading(true);
      fetchUserInfo(nickname)
        .then((data) => {
          setUserData(data);
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

  const sanitizedIntroduce = userData?.profile.introduce
    ? DOMPurify.sanitize(userData.profile.introduce)
    : '';

  return (
    <ContentSection>
      <ContentHeaderSection>
        <ContentTitle>소개</ContentTitle>
        <Button
          variant='primary'
          customStyle='height: 38px; width: 100px;'
          onClick={() => navigate('/boardModification')}
        >
          {sanitizedIntroduce ? '소개 수정' : '소개 작성'}
        </Button>
      </ContentHeaderSection>
      <ContentWrapper
        dangerouslySetInnerHTML={{ __html: sanitizedIntroduce }}
      />
    </ContentSection>
  );
};

export default UserContents;

const ContentSection = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.div`
  width: 100%;
  height: 40px;
  padding: 5px 0px 5px 0px;
  font-size: 30px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
`;

const ContentHeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;
