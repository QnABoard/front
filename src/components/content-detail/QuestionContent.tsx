import styled from 'styled-components';
import DOMPurify from 'dompurify';

interface Props {
  content: string | undefined;
}

export default function QuestionContent({ content }: Props) {
  // Sanitize the content to prevent XSS attacks
  const sanitizedContent = content
    ? DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [
          'h1',
          'h2',
          'h3',
          'p',
          'pre',
          'code',
          'strong',
          'em',
          'ul',
          'ol',
          'li',
          'br',
        ],
        ALLOWED_ATTR: ['class', 'style'],
      })
    : '';

  return (
    <QuestionContentStyle
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}

const QuestionContentStyle = styled.div`
  font-family: 'Pretendard-Light', Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 10px 0;
    font-weight: bold;
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

  /* Code block styles */
  pre {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
  }

  code {
    font-family: 'Courier New', Courier, monospace;
    background-color: #f4f4f4;
    padding: 2px 4px;
    border-radius: 3px;
  }

  /* List styles */
  ul,
  ol {
    margin: 10px 0 10px 20px;
    padding: 0;
  }

  li {
    margin: 5px 0;
  }

  /* Paragraph styles */
  p {
    margin: 10px 0;
  }
`;
