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
