import { useLiked } from '@/hooks/useLiked';
import { RootState } from '@/store/rootReducer';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

interface Props {
  solve: boolean | undefined;
  handleSolvedClick(): void;
}

export default function QuestionFooter({ solve, handleSolvedClick }: Props) {
  const nicknameCheck = useSelector(
    (state: RootState) => state.user.userInfo?.nickname
  );

  const { post, handleHeartClick } = useLiked();

  // const { likeCheck } = useLiked(liked, content_id);

  /**
   * 헤더 토큰 데이터 통신으로 받아와야 함
   */
  const [tagItems, setTagItems] = useState('TypeScript,NodeJS,React');
  const [like, setLike] = useState<boolean>(false);
  useEffect(() => {
    setLike(!!post?.liked);
  }, [post?.liked]);

  return (
    <QuestionFooterStyle>
      <div className='tags'>
        {/* tagItems -> post.tags로 바꾸기 */}
        {tagItems.split(',').map((tag) => (
          <div className='tag' key={tag}>
            {tag}
          </div>
        ))}
      </div>
      <div className='footerWrap'>
        <div className='likes' onClick={handleHeartClick}>
          {/* 로그인 유저 좋아요 유무 */}
          <span className='heartIcon'>
            <HeartIcon
              className={`likeHeart ${like === true ? 'likeFill' : ''}`}
            />
          </span>
          <span className='likeCount'>{post?.like_count}</span>
        </div>
      </div>
      {post?.nickname === nicknameCheck && (
        <div className={`solvedWrap ${solve ? 'solve' : 'problem'}`}>
          <div className='solvedStatus'>
            <div className='left'>
              {solve ? (
                <div className='solvedTitle'>해결된 질문이에요!</div>
              ) : (
                <>
                  <div className='solvedTitle'>질문이 해결 되었나요?</div>
                  <div>해결되었다면 상태를 변경해주세요.</div>
                </>
              )}
            </div>
            <div className='right'>
              <button
                className={`solveButton ${solve ? 'solve' : 'problem'}`}
                onClick={handleSolvedClick}
              >
                {solve ? 'problem' : 'solve'}
              </button>
            </div>
          </div>
        </div>
      )}
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
      background-color: #deffe2;
      color: #858585;
      font-family: 'Pretendard-Light', Helvetica;
      font-size: 12px;
      padding: 8px 16px;
      border-radius: 12px;
    }
  }

  .footerWrap {
    display: flex;
    line-height: 24px;
    gap: 20px;
    .likes {
      display: flex;
      cursor: pointer;

      .likeHeart {
        width: 24px;
      }
      .likeFill {
        fill: #ff9bd2;
        stroke: #ff9bd2;
      }
    }

    .scrapped {
      display: flex;
      cursor: pointer;

      .scrapIcon {
        svg {
          width: 24px;
        }

        .fill {
          fill: #575757;
          stroke: #575757;
        }
      }
    }

    .scrapped:active,
    .likes:active {
      transform: translateY(5px);
    }
  }

  .solvedWrap {
    width: 100%;
    border-radius: 20px;
    .solvedStatus {
      padding: 2.5rem 3.5rem;
      display: flex;
      justify-content: space-between;
      font-size: 1.3rem;

      .left {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .solvedTitle {
          font-size: 2rem;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .solveButton {
          cursor: pointer;
          border: 1px solid #e6e6e6;
          font-size: 1.5rem;
          height: fit-content;
          padding: 1rem 1.5rem;
          border-radius: 50px;
        }

        .solveButton:hover {
          scale: 1.1;
          transition: all 50ms ease-in-out;
        }
      }
    }
  }

  .solve {
    background-color: #c9ffcf;

    .right {
      .solveButton {
        background-color: #f7f7f7;
      }
    }
  }

  .problem {
    background-color: #f7f7f7;

    .right {
      .solveButton {
        background-color: #c9ffcf;
      }
    }
  }
`;
