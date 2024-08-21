import {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import {
  deleteHabit,
  gethabitList,
  postHabit,
  patchHabit,
} from "../../../api/api";
import trashCanImg from "../../../assets/imeges/trashCanImg.png";

const ListModalBody = forwardRef(({ habit, setReRender}, ref) => {
  const [value, setValue] = useState({ name: habit.name });
  const [patchInput, setPatchInput] = useState(false);
  // const [deleted, setDeleted] = useState(true)
  const habitId = habit.id;

  const deleteHabitHandler = async () => {
    await deleteHabit(habitId);
    setReRender(true);
    // setDeleted(false)
  };

  const patchClick = () => {
    setPatchInput(true);
  };

  const changValueHandler = (e) => {
    setValue({ name: e.target.value });
  };

  useImperativeHandle(ref, () => ({
    sendRequest: async () => {
      if (value.name !== habit.name) {
        await patchHabit(habitId, value);
        setPatchInput(false);
        setReRender(true);
      }
    },
  }));

  return (
    <div>
      {!patchInput && <div onClick={patchClick}>{habit.name}</div>}
      {patchInput && <input value={value.name} onChange={changValueHandler} />}
      <img onClick={deleteHabitHandler} src={trashCanImg} alt="쓰레기통" />
    </div>
  );
});

function ListModal({ studyId, modalState, patchList, setPageRender }) {
  const [list, setList] = useState([]);
  const [postInput, setPostInput] = useState(false);
  const [value, setValue] = useState({ name: "" });
  const [reRender, setReRender] = useState(false);
  const [dummy, setDummy] = useState([]);
  const childRefs = useRef([]);

  useEffect(() => {
    const getList = async () => {
      const data = await gethabitList(studyId);
      setList(data.habits);

      if (!dummy[0]) {
        setDummy(data.habits);
      }
    };

    if (!list[0] && modalState) {
      getList();
    } else if (reRender) {
      getList();
      setReRender(false);
      setValue({ name: "" });
    }
  }, [studyId, modalState, list, reRender, dummy]);

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
      setPageRender(true);
    } else {
      patchList();
      setPostInput(false);

      const promises = childRefs.current.filter(ref => ref !== null).map((ref) => ref.sendRequest());
      const result = await Promise.all(promises);

      if (dummy !== list || result) {
        console.log(1)
        setPageRender(true);
        setDummy(list);
      }
    }
  };

  // 취소 버튼 함수
  const cencelHandler = () => {
    patchList();
    setPostInput(false);
    setValue({ name: "" });
    if (dummy !== list) {
      setPageRender(true);
      setDummy(list);
      setValue({ name: "" });
    }
  };

  return (
    <>
      {modalState && (
        <div>
          <p>습관 목록</p>
          <ol>
            {list.map((habit, index) => {
              return (
                <li key={habit.id}>
                  <ListModalBody
                    habit={habit}
                    setReRender={setReRender}
                    ref={(el) => (childRefs.current[index] = el)}
                  />
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
