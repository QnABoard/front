import { useRef } from 'react';
import styled from 'styled-components';

export default function QuestionComment() {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  };

  return (
    <QuestionCommentStyle>
      <h1 className='commentTitle'>답변</h1>
      <div className='commentInput'>
        <textarea ref={textRef} onInput={handleInput}></textarea>
      </div>
    </QuestionCommentStyle>
  );
}

const QuestionCommentStyle = styled.div`
  .commentTitle {
    font-size: 1rem;
    font-weight: bold;
  }

  .commentInput {
    textarea {
      resize: none;
      width: 100%;
      max-height: 220px;
      font-size: 1rem;
      margin-top: 1rem;
      padding: 1rem 1.5rem;
      border: 1px solid #727272;
      border-radius: 20px;
      outline: none;
    }

    textarea::-webkit-scrollbar {
      display: none;
    }
  }
`;
