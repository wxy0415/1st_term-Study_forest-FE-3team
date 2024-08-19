import CurrentTime from "./components/CurrentTime"
import HabitsList from "./components/HabitsList"
import { useParams } from "react-router-dom"

function TodatHabitPage() {
    const { studyId } = useParams()

    return (
        <>
        <CurrentTime />
        <HabitsList studyId={studyId}/>
        </>
    )
}

export default TodatHabitPage 