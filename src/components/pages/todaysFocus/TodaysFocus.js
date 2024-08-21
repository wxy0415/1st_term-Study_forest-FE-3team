import './todaysFocus.css';
import Timer from './components/Timer'
import { getPoint } from '../../../api/pointApi'
import { useEffect, useState } from 'react';

const TodaysFocus = ()=> {
  const [point, setPoint] = useState('');
  const [alertGetPoint, setAlertGetPoint] = useState('');

  //const id = "826d746c-bbba-4d4d-a0ed-33f2e8d1f5fb"
  //const id = "8523e4cc-0985-4c20-b8b2-2d86e4fe56d5"
  //const id = "a1818234-753d-4eb2-a4f9-e709afb0c322"
  const id = 'afeac530-e924-4253-9666-c247f41725aa';
  //const id = "648ab555-4ca1-40e5-91dc-6fdf0c793488"

  useEffect(() => {
    const getInfo = async (id) => {
      const pointField = await getPoint(id);
      setPoint(pointField.point);
    }

    getInfo(id);
  }, [point])

  return (
    <div className="frame">
      <div className="contentframe">
        <div className="topframe">
          <div className="title">
            연우의 개발공장
          </div>
          <div className="point">
            <span className='font18'>현재까지 획득한 포인트</span>
            <div className="pointbox font16">
              <div className="pointbox_icon"></div>
              <div className="pointbox__point">{point}P</div>획득
            </div>
          </div>
        </div>
        <div className="mainframe">
          <div className="todaysfocus">
            <span className='font24'>오늘의 집중</span>
            <Timer initialPoint={point} setPoint={setPoint} setAlertGetPoint={setAlertGetPoint} id={id}></Timer>
          </div>
        </div>
      </div>
      <div className='condition'>
        {alertGetPoint}
      </div>
    </div>
  );
}

export default TodaysFocus;
