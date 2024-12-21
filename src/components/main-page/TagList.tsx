import { mainTags } from '@/types/main.model';
import styled from 'styled-components';

interface TagsProps {
  tags?: mainTags[] | null;
  selectedTags: number[];
  onTagToggle: (tagId: number) => void;
}

const TagList = ({ tags, selectedTags, onTagToggle }: TagsProps) => {
  console.log(selectedTags);
  return (
    <TagListContainer>
        {tags?.map((tag) => (
          <TagButton
            key={tag.id}
            onClick={() => onTagToggle(tag.id as number)}
            selected={selectedTags.includes(tag.id as number)}
          >
            {tag.name}
          </TagButton>
        ))}
    </TagListContainer>
  );
};

const TagListContainer = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
    
  }
`;

interface TagButtonProps {
  selected: boolean;
}

const TagButton = styled.button<TagButtonProps>`
  display: block;
    border-radius: 30px;
    font-size: 1rem;
    background-color: ${({ selected }) => (selected ? 'rgba(49, 191, 63, 0.23)' : 'transparent')};
    color: #32c040;
    border: 1px solid #32c040;
    padding: 8px 15px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.12s ease-in-out;
`;
export default TagList;