import './todaysFocus.css';
import Timer from './components/Timer'
import { getPoint, getStudy } from '../../../api/pointApi'
import { useEffect, useState } from 'react';


const TodaysFocus = ()=> {
  const [point, setPoint] = useState('');

  useEffect(() => {
    const id = '648ab555-4ca1-40e5-91dc-6fdf0c793488'

    const getInfo = async (id) => {
      // console.log(await getStudy());
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
            <Timer initialPoint={point} setPoint={setPoint}></Timer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodaysFocus;
