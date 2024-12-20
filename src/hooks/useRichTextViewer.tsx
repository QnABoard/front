import DOMPurify from 'dompurify';

const RichTextViewer = ({ content }: { content: string }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      style={{ whiteSpace: 'pre-wrap' }}
    />
  );
};

export default RichTextViewer;
