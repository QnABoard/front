import React from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify';

const BodyContainer = styled.div`
  font-family: 'Pretendard-Light', Helvetica;
  font-size: 15px;
  margin-left: 5px;
  line-height: 1.5;
  color: #333;
  margin-top: 20px;
  margin-right: 5px;
  white-space: pre-wrap;

  /* 헤딩 태그 스타일 */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 10px 0;
    font-weight: bold;
    color: #333;
  }

  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }

  /* 코드 블록 및 인라인 코드 스타일 */
  pre {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto; /* 가로 스크롤 가능 */
    font-family: 'Courier New', Courier, monospace;
  }

  code {
    font-family: 'Courier New', Courier, monospace;
    background-color: #f4f4f4;
    padding: 2px 4px;
    border-radius: 3px;
  }

  /* 일반 텍스트 스타일 */
  p {
    margin: 10px 0;
    line-height: 1.6;
  }
`;

interface QuestionBodyProps {
  content: string;
}

function QuestionBody({ content }: QuestionBodyProps) {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <BodyContainer dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
  );
}

export default QuestionBody;
