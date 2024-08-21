import Header from '../../Layout/Header.js';
import RecentlyView from './RecentlyView/RecentlyView.js';
import StudyList from './StudyList/StudyList.js';

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
