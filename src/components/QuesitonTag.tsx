import styled from 'styled-components';

// Styled Components
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const TagItem = styled.div`
  background-color: #deffe2;
  color: #858585;
  font-family: 'Pretendard-ExtraLight', Helvetica;
  font-size: 8px;
  padding: 4px 8px;
  border-radius: 12px;
`;

interface TagsProps {
  tags: string[];
}

function QuestionTag({ tags }: TagsProps) {
  return (
    <TagsContainer>
      {tags.map((tag, index) => (
        <TagItem key={index}>{tag}</TagItem>
      ))}
    </TagsContainer>
  );
}

export default QuestionTag;