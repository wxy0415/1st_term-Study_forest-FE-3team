import Emoji from "./Emoji";
import StudyToolbar from "./StudyToolbar";
import StudyNavigationButtons from "./StudyNavigationButtons";
import StudyPoint from "./StudyPoint";
import HabitRecord from "./HabitRecord";
import "./studybody.css";

export function StudyBody() {
  return (
    <main className="main">
      <section>
        <div className="flex-row tempTopBar">
          <Emoji />
          <StudyToolbar />
        </div>
        <div className="flex-row tempStudy1">
          <p>스터디 이름</p>
          <StudyNavigationButtons />
        </div>
        <div>
          <div>소개</div>
          <div>스터디 소개</div>
        </div>
        <div>
          <div>현재까지 획득한 포인트</div>
          <StudyPoint />
        </div>
      </section>
      <HabitRecord />
    </main>
  );
}

export default StudyBody;
