import "./studynavigationbuttons.css";

export function StudyNavigationButtons() {
  return (
    <div className="flex-row StudyNavigationButtons">
      <button className="StudyNavigationButton">오늘의 습관</button>
      <button className="StudyNavigationButton">오늘의 집중</button>
    </div>
  );
}

export default StudyNavigationButtons;
