import "./StudyNavigationButtons.css";

export function StudyNavigationButtons({ onHabit, onConcentration }) {
  return (
    <div className="flex-row StudyNavigationButtons">
      <button className="font16 medium StudyNavigationButton" onClick={onHabit}>
        오늘의 습관
      </button>
      <button
        className="font16 medium StudyNavigationButton"
        onClick={onConcentration}
      >
        오늘의 집중
      </button>
    </div>
  );
}

export default StudyNavigationButtons;
