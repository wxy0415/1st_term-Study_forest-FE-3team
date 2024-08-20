import { useEffect, useState } from "react";
import { deleteSuccess, gethabitList, postSuccess } from "../../../api/api";
import "./HabitsList.css";

// 습관 리스트 바디
function ListBody({ habit }) {
  const [successId, setSuccessId] = useState("");
  const [habitClassName, setHabitClassName] = useState("list--fals");
  const [firstLoding, setFirstLoding] = useState(true);
  const habitId = habit.id;

  // 완료 여부에 따른 색 변경
  useEffect(() => {
    if (firstLoding && habit.HabitSuccessDates[0]) {
      // 첫 랜더링 시 있을 때만 적용
      setHabitClassName("list--true");
      setSuccessId(habit.HabitSuccessDates[0].id);
      setFirstLoding(false);
    } else if (successId) {
      setHabitClassName("list--true");
    } else {
      setHabitClassName("list--false");
    }
  }, [habit, successId, firstLoding]);

  const successApiHandler = async () => {
    if (successId) {
      await deleteSuccess(successId);
      setSuccessId("");
    } else if (!successId) {
      const res = await postSuccess(habitId);
      setSuccessId(res.id);
    }
  };

  return (
    <div className={habitClassName} onClick={successApiHandler}>
      {habit.name}
    </div>
  );
}

function HabitsList({ studyId, patchList }) {
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
        <p onClick={patchList}>목록 수정</p>
      </div>
      {!list[0] && (
        <div>아직 습관이 없어요 목록 수정을 눌러 습관을 생성해보세요</div>
      )}
      {list[0] && (
        <ol>
          {list.map((habit) => {
            return (
              <li key={habit.id}>
                <ListBody habit={habit} />
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

export default HabitsList;
