import { fetchUpdateReview } from '@/apis/board.api';
import Button from '@/components/ui/atoms/Button';
import RichTextEditor from '@/components/ui/molecules/QuillEditor';
import { TagItems } from '@/constants/TagItems';
import { useState } from 'react';
import styled from 'styled-components';

const BoardWritePage = () => {
  const [title, setTitle] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [content, setContent] = useState<string>('');

  const handleTagSelected = (index: number) => {
    setSelectedTags((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const registerBoard = async () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (selectedTags.length === 0) {
      alert('태그를 선택해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    const selectedTagNames = selectedTags.map((index) => TagItems[index]);
    try {
      console.log('title: ', title);
      const response = await fetchUpdateReview(
        title,
        selectedTagNames,
        content
      );
      console.log('게시글 등록 성공:', response);
      alert('게시글이 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <WriteContainer>
      <TitleSection>
        <TitleInput
          placeholder='제목을 입력하세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </TitleSection>
      <TagSection>
        <TagTitle>태그를 등록해주세요</TagTitle>
        <TagWrapper>
          {TagItems.map((item, index) => (
            <Button
              variant={selectedTags.includes(index) ? 'primary' : 'tag'}
              key={index}
              onClick={() => handleTagSelected(index)}
            >
              {item}
            </Button>
          ))}
        </TagWrapper>
      </TagSection>
      <div style={{ margin: '20px' }}>
        <RichTextEditor value={content} onChange={setContent} />
      </div>
      <RegisterSection>
        <Button variant='tag'>취소</Button>
        <Button variant='primary' onClick={registerBoard}>
          등록
        </Button>
      </RegisterSection>
    </WriteContainer>
  );
};

export default BoardWritePage;

const WriteContainer = styled.div`
  width: 100%;
  height: fit-content;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 0px 0px 10px 0px;
`;

const TitleSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 20px;
`;

const TitleInput = styled.input`
  font-size: 22px;
  height: 44px;
  width: 500px;
  border: none;
  padding: 5px;
`;

const TagSection = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 20px;
  gap: 5px;
`;

const TagTitle = styled.div`
  font-size: 18px;
  padding-left: 5px;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 5px;
`;

const RegisterSection = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 0px 20px 0px 20px;
  gap: 10px;
`;
