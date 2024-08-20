import axios from "axios";
import { useState, useEffect, createContext } from "react";
import Emoji from "./Emoji";
import StudyNavigationButtons from "./StudyNavigationButtons";
import StudyPoint from "./StudyPoint";
import HabitRecord from "./HabitRecord";
import Modal from "./Modal";
import "./studybody.css";

import { API_ADDRESS } from "../../../../constants/global";

const instance = axios.create({
  baseURL: API_ADDRESS,
  header: {
    "Content-Type": "application/json",
  },
});

const PATH = "/study";

export const deviceContext = createContext();

export function StudyBody({
  studyId = "8523e4cc-0985-4c20-b8b2-2d86e4fe56d5",
}) {
  const [studyName, setStudyName] = useState("스터디 이름");
  const [description, setDescription] = useState("스터이 설명");
  const [studyPoint, setStudyPoint] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(-1);

  const MODAL_CONFIRM = 0;
  const MODAL_EDIT = 1;
  const MODAL_HABIT = 2;
  const MODAL_CONCENTRATION = 3;

  const path = `${PATH}/${studyId}`;

  let handleFunction = null;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteStudy = () => {
    handleFunction = deleteStudy;
    setModalType(MODAL_CONFIRM);
    openModal();
  };

  const deleteStudy = () => {
    instance
      .delete(path)
      .then((res) => {
        if (res.status === 204) {
          // 홈으로 이동
        }
      })
      .catch((err) => alert(err.name));
  };

  const handleEditStudy = () => {
    handleFunction = editStudy;
    setModalType(MODAL_EDIT);
    openModal();
  };

  const editStudy = () => {
    // 이건 페이지가 없어보임. 성현님 컴포넌트를 사용하거나, StudyBody 쪽의 input을 생성하여 수정할 수 있도록
    alert("수정 페이지가 연결되지 않았습니다");
  };

  const handleToHabit = () => {
    setModalType(MODAL_HABIT);
    openModal();
  };

  const handleToConcentration = () => {
    setModalType(MODAL_CONCENTRATION);
    openModal();
  };

  useEffect(() => {
    instance.get(path).then((res) => {
      setStudyName(res.data.studyName);
      setDescription(res.data.description);
      setStudyPoint(res.data.point);
    });
  });

  return (
    <main className="main">
      <deviceContext.Provider value={studyId}>
        <section>
          <div>
            <div className="flex-row study__topbar">
              <Emoji />
              <div>
                <button>공유하기</button>
                <button onClick={handleEditStudy}>수정하기</button>
                <button onClick={handleDeleteStudy}>스터디 삭제하기</button>
              </div>
            </div>
            <div className="flex-row study__middlebar">
              <p>{studyName}</p>
              <StudyNavigationButtons />
            </div>
            <div className="study__description">
              <div>소개</div>
              <div>{description}</div>
            </div>
            <StudyPoint point={studyPoint} />
          </div>
          <HabitRecord studyId={studyId} />
        </section>
        <Modal
          studyName={studyName}
          isOpen={isModalOpen}
          onClose={closeModal}
          modalType={modalType}
          onClick={handleFunction}
        />
      </deviceContext.Provider>
    </main>
  );
}

export default StudyBody;
