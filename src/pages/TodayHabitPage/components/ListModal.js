import { useEffect, useState } from "react";
import { deleteHabit, gethabitList, postHabit } from "../../../api/api";
import trashCanImg from "../../../assets/imeges/trashCanImg.png";

function ListModalBody({ habit, deleteRnder }) {
  const habitId = habit.id;

  const deleteHabitHandler = async () => {
    await deleteHabit(habitId);
    deleteRnder();
  };

  return (
    <div>
      {habit.name}
      <img onClick={deleteHabitHandler} src={trashCanImg} alt="쓰레기통" />
    </div>
  );
}

function ListModal({ studyId, modalState, patchList }) {
  const [list, setList] = useState([]);
  const [postInput, setPostInput] = useState(false);
  const [value, setValue] = useState({ name: "" });
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    const getList = async () => {
      const data = await gethabitList(studyId);
      setList(data.habits);
    };
    if (!list[0] && modalState) {
      getList();
    } else if (reRender) {
      getList();
      setReRender(false);
      setValue({ name: "" });
    }
  }, [studyId, modalState, list, reRender]);

  // value와 input 값 일치 함수
  const postValueHandler = (e) => {
    setValue({ name: e.target.value });
  };

  // 습관 생성 input 생성 함수
  const postInputHandler = async () => {
    if (!postInput) {
      setPostInput(true);
    } else if (postInput && value.name !== "") {
      await postHabit(studyId, value);
      setReRender(true);
    }
  };

  // 수정 완료 함수
  const patchsuccessHandler = async () => {
    if (value.name) {
      patchList();
      await postHabit(studyId, value);
      setReRender(true);
      setPostInput(false);
    } else {
      patchList();
      setPostInput(false);
    }
  };

  // 취소 버튼 함수
  const cencelHandler = () => {
    patchList();
    setPostInput(false);
  };

  // 삭제 시 재로딩 함수
  const deleteRnder = () => {
    setReRender(true);
  };

  return (
    <>
      {modalState && (
        <div>
          <p>습관 목록</p>
          <ol>
            {list.map((habit) => {
              return (
                <li key={habit.id}>
                  <ListModalBody habit={habit} deleteRnder={deleteRnder} />
                </li>
              );
            })}
          </ol>
          {postInput && (
            <input value={value.name} onChange={postValueHandler} />
          )}
          <div onClick={postInputHandler}>+</div>
          <div>
            <p onClick={cencelHandler}>취소</p>
            <p onClick={patchsuccessHandler}>수정 완료</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ListModal;
