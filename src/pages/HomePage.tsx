import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import QuestionBox from '@/components/main-page/QuestionBox';
import TagList from '@/components/main-page/TagList';
import { useNavigate } from 'react-router';
import { fetchMainData } from '@/apis/main.api';
import SearchInput from '@/components/main-page/SearchInput';
import Pagination from '@/components/main-page/Pagination';
import { Pagination as IPagination} from '@/types/pagination.model';
import { mainTags } from '@/types/main.model';

const HomePage = () => {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [hometags, setHomeTags] = useState<mainTags[]>([]);
  const [homepagination, setHomePagination] = useState<IPagination>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['mainData', selectedTags],
    queryFn: () =>
      fetchMainData({
        selectedTags,
        currentPage: 1,
        limit: 20,
      }),
    enabled: true, // 데이터 fetch 실행!!!
  });

  const { posts, tags:fetchedTags, pagination:fetchedPagination, filteredPosts } = data ?? {};

  // 태그, 페이지네이션 상태로 관리
  useEffect(() => {
    if (fetchedTags) {
      setHomeTags(fetchedTags);
    }
    if (fetchedPagination) {
      setHomePagination(fetchedPagination);
    }
  }, [fetchedTags, fetchedPagination]);

  // url 달라질때 태그들 상태도 달라지게 요청
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tagsFromURL = params.getAll('tags').map((tag) => Number(tag));
    setSelectedTags(tagsFromURL);

  }, [location.search]);

  // 새로고침 시 '/'로 이동 (전체 데이터 뿌림)
  useEffect(() => {
    if (location.search) {
      navigate('/', { replace: true });
    }
  }, []);


  // 태그 도글
  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) => {
      const updatedTags = prev.includes(tagId)
      ? prev.filter((id) => id !== tagId) // 이미 선택된 태그를 클릭하면 제거
      : [...prev, tagId]; // 새 태그를 클릭하면 추가

      //선택된 태그에 따라 URL 쿼리 파라미터 업데이트
      if (updatedTags.length > 0) {
        navigate({
          search: `?tags=${updatedTags.join('&tags=')}`, 
        });
      } else {
        navigate({
          search: '', 
        });
      }

      return updatedTags;
    });
  };

  // 필터링된 게시글을 가져오고, 없으면 기본 게시글 사용
  const postsToDisplay = selectedTags.length > 0 ? filteredPosts : posts;

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    return <p>Error occurred: {error instanceof Error ? error.message : 'An unknown error occurred'}</p>;
  }

  return (
    <div>
      <SearchInput />
      {
        hometags && (
          <TagList tags={hometags} selectedTags={selectedTags} onTagToggle={toggleTag} />
        )
      }
      <QuestionBox posts={postsToDisplay || []} isLoading={isLoading} />
      <Pagination pagination={homepagination}/>
    </div>
  );
};

export default HomePage;