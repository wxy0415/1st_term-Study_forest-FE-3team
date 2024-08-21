import Header from '../Header/Header.js';
import RecentlyView from '../RecentlyView/RecentlyView';
import StudyList from '../StudyList/StudyList';

const Home = () => {
  return (
    <>
      <Header hideCreateButton={false} />
      <RecentlyView />
      <StudyList />
    </>
  );
};

export default Home;
