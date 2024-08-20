import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";

import "./modal.css";

import { deviceContext } from "./StudyBody";
import { API_ADDRESS } from "../../../../constants/global";

const instance = axios.create({
  baseURL: API_ADDRESS,
  header: {
    "Content-Type": "application/json",
  },
});

export function Modal({ studyName, isOpen, onClose, modalType, onClick }) {
  const [inputValue, setInputValue] = useState("");
  const dialogRef = useRef(null);

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
        onClick();
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
