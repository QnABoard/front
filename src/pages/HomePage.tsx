import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import QuestionBox from '@/components/main-page/QuestionBox';
import TagList from '@/components/main-page/TagList';
import { useLocation, useNavigate } from 'react-router';
import { fetchMainData } from '@/apis/main.api';
import SearchInput from '@/components/main-page/SearchInput';
import Pagination from '@/components/main-page/Pagination';

const fetchPostsByTags = async (selectedTags: number[]) => {
  const params = new URLSearchParams();
  selectedTags.forEach((tag) => {
    params.append('tags', tag.toString());
  });

  const response = await axios.get('/api/main/tags', {
    params
  });
  console.log('tagsposts', response.data); // html 형식으로 날아옴
  return response.data;
};

const useMainData = (selectedTags: number[]) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data, isLoading, error } = useQuery({
    queryKey: ['mainData', location.search, selectedTags],
    queryFn: () =>
      fetchMainData({
        currentPage: params.get('page') ? Number(params.get('page')) : 1,
        limit: 20,
      }),
      enabled: selectedTags.length === 0
  });

  return {
    posts: data?.posts,
    tags: data?.tags,
    pagination: data?.pagination,
    isLoading,
    error,
  };
};

const HomePage = () => {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const navigate = useNavigate();
  
  // 기본데이터 게시글, 태그 요청
  const { posts, tags, pagination, isLoading, error } = useMainData(selectedTags);

  // 태그별 게시글 요청
  const { data: filteredPosts, isLoading: isLoadingFiltered } = useQuery({
    queryKey: ['filteredPosts', selectedTags],
    queryFn: () => fetchPostsByTags(selectedTags),
    enabled: selectedTags.length > 0,
  });

  // url 달라질때 태그들 상태도 달라지게 요청
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tagsFromURL = params.getAll('tags').map((tag) => Number(tag));
    setSelectedTags(tagsFromURL);

  }, [location.search]);

  // 태그 도글
  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) => {
      const updatedTags = prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId];

      // 선택된 태그에 따라 URL 쿼리 파라미터 업데이트
      if (updatedTags.length > 0) {
        navigate({
          search: `?tags=${updatedTags.join('&tags=')}`, // tags=1&tags=2 형식으로 업데이트
        });
      } else {
        navigate({
          search: '', // 모든 태그 선택 해제 시 URL에서 tags 제거
        });
      }

      return updatedTags;
    });
  };

  // 필터링된 게시글을 가져오고, 없으면 기본 게시글 사용
  const postsToDisplay = selectedTags.length > 0 ? filteredPosts : posts;

  // 로딩 상태 처리
  if (isLoading || isLoadingFiltered) return <p>Loading...</p>;

  // 에러 처리
  if (error) {
    return <p>Error occurred: {error instanceof Error ? error.message : 'An unknown error occurred'}</p>;
  }

  return (
    <div>
      <SearchInput />
      {tags && (
        <TagList
          tags={tags}
          selectedTags={selectedTags}
          onTagToggle={toggleTag}
        />
      )}

      <QuestionBox posts={postsToDisplay || []} isLoading={isLoading || isLoadingFiltered} />
      <Pagination pagination={pagination}/>
    </div>
  );
};

export default HomePage;