import CurrentTime from "./components/CurrentTime";
import HabitsList from "./components/HabitsList";
import { useParams } from "react-router-dom";
import ListModal from "./components/ListModal";
import { useState } from "react";

function TodatHabitPage() {
  const [modalOn, setModalOn] = useState(false);
  const [pageRender, setPageRender] = useState(false)
  const { studyId } = useParams();

  const patchListHandler = () => {
    if (modalOn) {
      setModalOn(false);
    } else {
      setModalOn(true);
    }
  };

  return (
    <>
      <CurrentTime />
      <HabitsList studyId={studyId} patchList={patchListHandler}/>
      <ListModal studyId={studyId} modalState={modalOn} patchList={patchListHandler}/>
    </>
  );
}

export default TodatHabitPage;
