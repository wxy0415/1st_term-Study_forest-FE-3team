import { useEffect, useState } from "react";
import { deleteSuccess, gethabitList, postSuccess } from "../../../api/api";
import "./HabitsList.css";

// 습관 리스트 바디
function ListBody({ habit }) {
  const [habitId, setHabitId] = useState();
  const [successId, setSuccessId] = useState();

  let habitClassName;
  // 완료 여부에 따른 색 변경
  if (habit.HabitSuccessDates[0]) {
    habitClassName = "list--true";
  } else {
    habitClassName = "list--false";
  }

  return <div className={habitClassName}>{habit.name}</div>;
}

function HabitsList({ studyId }) {
  const [list, setList] = useState([]);

  // 첫 랜더링 시 실행
  useEffect(() => {
    const getList = async () => {
      const data = await gethabitList(studyId);
      setList(data.habits);
    };

    getList();
  }, [studyId]);

  return (
    <div>
      <div>
        <p>오늘의 습관</p>
        <p>목록 수정</p>
      </div>
      <ol>
        {list.map((habit) => {
          return (
            <li key={habit.id}>
              <ListBody habit={habit} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default HabitsList;
