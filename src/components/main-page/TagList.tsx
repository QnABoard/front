import styled from 'styled-components';

interface Tag {
  id: number;
  name: string;
}

interface TagsProps {
  tags: Tag[];
  selectedTags: number[];
  onTagToggle: (tagId: number) => void;
}

const TagList = ({ tags, selectedTags, onTagToggle }: TagsProps) => {
  return (
    <TagListContainer>
        {tags.map((tag) => (
          <button className={selectedTags ? 'active' : ''}
            key={tag.id}
            onClick={() => onTagToggle(tag.id)}>
            {tag.name}
          </button>
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

  button {
    display: block;
      border-radius: 30px;
      font-size: 1rem;
      background-color: transparent;
      color: #32c040;
      border: 1px solid #32c040;
      padding: 8px 15px;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.12s ease-in-out;

      &:hover {
        background-color: rgba(49, 191, 63, 0.23);
      }

    &.active: {background-color: green}
  }
`;
export default TagList;