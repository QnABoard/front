import { HeartIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  tags: string;
  like_count: number;
  liked: boolean;
  solved: number;
  scrapped: boolean;
}

export default function QuestionFooter({
  tags,
  like_count,
  liked,
  solved,
  scrapped,
}: Props) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    // 유저 토큰값이 있을때 좋아요 할 수 있어야 함
    setLike(liked);
  }, [liked]);

  const handleHeartClick = () => {
    setLike((prev) => !prev);
  };

  return (
    <QuestionFooterStyle>
      <div className='tags'>
        {tags.split(',').map((tag) => (
          <div className='tag' key={tag}>
            {tag}
          </div>
        ))}
      </div>
      <div className='footerWrap'>
        <div className='likes'>
          <span className='heartIcon'>
            <HeartIcon
              className={`likeHeart ${like === true ? 'likeFill' : ''}`}
              onClick={handleHeartClick}
            />
          </span>
          <span className='likeCount'>{like_count}</span>
        </div>
        <div className='scrapped'>스크랩 {scrapped}</div>
      </div>
      {/* 질문자 토큰으로 보여줄 해결버튼 클릭 부분 */}
      <div className='solved'>
        <div className='solvedStatus'>
          <div className='left'>
            {solved === 0 ? (
              <>
                <div>질문이 해결 되었나요?</div>
                <div>해결되었다면 상태를 변경해주세요.</div>
              </>
            ) : (
              <div>해결된 질문이에요!</div>
            )}
          </div>
          <div className='right'>
            <button className='solveButton'>
              {solved === 0 ? 'solve' : 'problem'}
            </button>
          </div>
        </div>
      </div>
    </QuestionFooterStyle>
  );
}

const QuestionFooterStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 15px;

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    .tag {
      width: fit-content;
      background-color: #c9ffcf;
      padding: 5px 7px;
      border-radius: 30px;
      color: #575757;
    }
  }

  .footerWrap {
    display: flex;
    line-height: 24px;
    gap: 12px;
    .likes {
      display: flex;

      .likeHeart {
        width: 24px;
      }
      .likeFill {
        fill: #ff9bd2;
        stroke: #ff9bd2;
      }
    }
  }

  .solved {
    width: 100%;
    .solvedStatus {
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;

      .right {
        .solveButton {
          border: none;
          background-color: transparent;
        }
      }
    }
  }
`;
