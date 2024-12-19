import MainTagList from '@/components/main-page/MainTagList';
import SearchInput from '@/components/main-page/SearchInput';
import QuestionBox from '@/components/main-page/QuestionBox';

const HomePage = () => {
  return (
    <div>
      <SearchInput />
      <MainTagList />
      <QuestionBox />
    </div>
  );
};

export default HomePage;
