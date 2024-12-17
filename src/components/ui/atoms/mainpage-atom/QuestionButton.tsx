import styled from 'styled-components';

const ProblemBox = styled.div`
  height: 20px;
  width: 77px;

  .group {
    height: 20px;
    left: 0;
    position: relative; /* fixed → relative로 수정 */
    top: 0;
  }

  .overlap-group {
    background-color: #d9d9d9;
    border-radius: 30px;
    height: 30px;
    position: relative;
    width: 100px;
  }

  .text-wrapper {
    color: #ffffff;
    font-family: 'Pretendard-ExtraBold', Helvetica;
    font-size: 15px;
    left: 20px;
    line-height: 20px;
    position: absolute;
    text-align: center;
    top: 3px;
    white-space: nowrap;
    width: 50px;
  }
`;

const SolveBox = styled.div`
  height: 20px;
  width: 77px;

  .group {
    height: 20px;
    left: 0;
    position: relative; /* fixed → relative로 수정 */
    top: 0;
  }

  .overlap-group {
    background-color: #c9ffce;
    border-radius: 30px;
    height: 30px;
    position: relative;
    width: 100px;
  }

  .text-wrapper {
    color: #007c0c;
    font-family: 'Pretendard-ExtraBold', Helvetica;
    font-size: 15px;
    left: 25px;
    line-height: 20px;
    position: absolute;
    text-align: center;
    top: 4px;
    white-space: nowrap;
    width: 50px;
  }
`;

export const ProblemButton = () => {
  return (
    <ProblemBox className='box'>
      <div className='group'>
        <div className='overlap-group'>
          <div className='text-wrapper'>problem</div>
        </div>
      </div>
    </ProblemBox>
  );
};

export const SolveButton = () => {
  return (
    <SolveBox className='box'>
      <div className='group'>
        <div className='overlap-group'>
          <div className='text-wrapper'>solve</div>
        </div>
      </div>
    </SolveBox>
  );
};

const QuestionButton = ({ solved }: { solved: number }) => {
  return solved === 1 ? <SolveButton /> : <ProblemButton />;
};

export default QuestionButton;
