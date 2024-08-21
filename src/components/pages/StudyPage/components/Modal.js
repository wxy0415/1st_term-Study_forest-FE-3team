import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";

import "./Modal.css";

import { deviceContext } from "./StudyBody";
import { API_ADDRESS } from "../../../../constants/global";

const instance = axios.create({
  baseURL: API_ADDRESS,
  header: {
    "Content-Type": "application/json",
  },
});

/** 스터디 삭제 modal 창 통과 후 로직 : DELETE API 사용 & 홈페이지로 이동 */
function afterDeleteStudyModalPass() {
  const PATH = "/study";

  instance
    .delete(PATH)
    .then((res) => {
      if (res.status === 204) {
        // 홈으로 이동
      }
    })
    .catch((err) => alert(err.name));
}

function afterEditStudyModalPass() {
  // 이건 페이지가 없어보임. 성현님 컴포넌트를 사용하거나, StudyBody 쪽의 input을 생성하여 수정할 수 있도록
  alert("수정 페이지가 연결되지 않았습니다");
}

function afterGotoHabitModalPass() {
  alert("오늘의 습관 페이지로 이동 로직 추가 예정");
}

function afterGotoConcentrationModalPass() {
  alert("오늘의 집중 페이지오 이동 로직 추가 예정");
}

export function Modal({ studyName, isOpen, onClose, modalType }) {
  const [inputValue, setInputValue] = useState("");
  const dialogRef = useRef(null);

  const afterModalPass = [
    afterDeleteStudyModalPass,
    afterEditStudyModalPass,
    afterGotoHabitModalPass,
    afterGotoConcentrationModalPass,
  ];

  let studyId = useContext(deviceContext);
  let temp = "";

  const buttonClass = [
    "modal__btn-confirm",
    "modal__btn-edit",
    "modal__btn-habit",
    "modal__btn-concentration",
  ];

  const onModalClick = () => {
    const path = `/study/${studyId}/auth`;
    instance.post(path, { password: inputValue }).then((res) => {
      if (res.data.result === true) {
        afterModalPass[modalType]();
      } else {
        alert("wrong password");
      }
    });
  };

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog className="modalframe" ref={dialogRef} onClose={onClose}>
      <div className="font24 extra-bold modal__studyname">{studyName}</div>
      <div className="font18 medium modal__message">권한이 필요해요!</div>
      <div>
        <div>비밀번호</div>
        <input
          className="modal__password"
          onChange={onInputChange}
          placeholder="비밀번호를 입력해 주세요"
        />
      </div>
      <button className={buttonClass[modalType]} onClick={onModalClick} />
      <button onClick={onClose} />
    </dialog>
  );
}

export default Modal;
