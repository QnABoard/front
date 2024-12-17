import styled from 'styled-components';
import { EllipsisVerticalIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';

interface Props {
  title: string;
  nickname: string;
  created_at: string;
  updated_at: string;
  solve: boolean | undefined;
  view: number;
  content_id: string;
}

export default function QuestionHeader({
  title,
  nickname,
  created_at,
  updated_at,
  solve,
  view,
  content_id,
}: Props) {
  const navigate = useNavigate();
  const nicknameCheck = useSelector(
    (state: RootState) => state.user.userInfo?.nickname
  );

  const [dropDown, setDropDown] = useState(false);

  const handleDropDownClick = () => {
    setDropDown((prev) => !prev);
  };

  const handleContentUpdateClick = () => {
    navigate(`/posts/${content_id}/edit`);
  };

  return (
    <QuestionHeaderStyle>
      <div className='title'>{title}</div>
      <div className='panel'>
        <div className='solved'>{solve ? 'solve' : 'problem'}</div>
        <div className='nickname'>{nickname}</div>
        <div className='questionCreatedAt'>{created_at} 작성</div>
        {updated_at && (
          <div className='questionUpdatedAt'>{updated_at} 수정</div>
        )}
        <div className='viewsWrap'>
          <div className='viewIcon'>
            <EyeIcon />
          </div>
          <div className='views'>{view}</div>
        </div>
        {nickname === nicknameCheck && (
          <div className='dropDownWrap'>
            <div className='dropDownIcon' onClick={handleDropDownClick}>
              <EllipsisVerticalIcon />
            </div>
            {dropDown && (
              <div className='dropDown'>
                <ul>
                  <li onClick={handleContentUpdateClick}>수정하기</li>
                  <li>삭제하기</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </QuestionHeaderStyle>
  );
}

const QuestionHeaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    font-size: 30px;
  }
  .panel {
    display: flex;
    line-height: 1.1rem;
    color: #727272;
    gap: 12px;
    font-size: 15px;

    .viewsWrap {
      display: flex;
      gap: 5px;

      .viewIcon {
        width: 20px;
      }
    }
    .dropDownWrap {
      position: relative;

      .dropDownIcon {
        display: flex;
        width: 20px;
        height: 20px;
        border: 1px solid #727272;
        border-radius: 100%;
      }

      .dropDown {
        position: absolute;
        border: 0.1rem solid #bbbbbb;
        border-radius: 5px;
        width: 5rem;
        transform: translate(-1.8rem, 0.5rem);

        ul {
          li {
            cursor: pointer;
            padding: 0.2rem 0.5rem;
          }
          li:hover {
            background-color: #f3f3f3;
          }
        }
      }
    }
  }
`;