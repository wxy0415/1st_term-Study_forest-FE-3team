import React, { useEffect, useState } from 'react';
import { updatePoint } from '../../../../api/pointApi'

const T = 68;
const M = '01';
const S = '08';

const Timer = ({ initialPoint, setPoint }) => {
  var initPoint;
  if (initialPoint) {
    initPoint = initialPoint;
  }
  const [countTime, setCountTime] = useState(T);
  const [initialTime, setInitialTime] = useState(T);
  const [minute, setMinute] = useState(M);
  const [second, setSecond] = useState(S);
  const [pauseTimer, setPauseTimer] = useState('');
  const [clearTimer, setClearTimer] = useState('');
  const [stopTimer, setStopTimer] = useState('');
  const [alertCondition, setAlertCondition] = useState('');
  const [totalPoint, setTotalPoint] = useState(initPoint);
  const [timerState, setTimerState] = useState(true);
  const [cssState, setCssState] = useState(false);

  function init() {
    setCountTime(T);
    setInitialTime(T);
    setMinute(M);
    setSecond(S);
    setClearTimer('');
    setPauseTimer('');
    setAlertCondition('');
    setTimerState(true);
    setCssState(false);
  }

  function changeDigits(i) {
    i = String(i);
    if (i.length === 1) {
      i = i.padStart(2, "0");
    } else if (i.length >= 3) {
      i = i.substring(1, 3)
    }
    return i;
  }

  function changeTime(i) {
    if (i <= 60) {
      i = '00:' + changeDigits(String(i));
    } else {
      i = changeDigits(Math.floor(i / 60)) + ':' + changeDigits(String(i % 60));
    }
    return i;
  }

  const timerMinute = (e) => {
    setMinute(changeDigits(e.target.value));
    setCountTime(Number(e.target.value * 60) + Number(second));
    setInitialTime(Number(e.target.value * 60) + Number(second));
  }

  const timerSecond = (e) => {
    setSecond(changeDigits(e.target.value));
    setCountTime(Number(minute * 60) + Number(e.target.value));
    setInitialTime(Number(minute * 60) + Number(e.target.value));
  }

  var timer;
  var obtainPoint = initialPoint;

  const StartTimer = (e) => {
    setCssState(true)
    e.target.className += "start"
    setAlertCondition('');
    var count = countTime;

    setPauseTimer(<button type="button" className='timerbtns__pausebtn' onClick={PauseTimer}></button>);
    setClearTimer(<button type="button" className='timerbtns__resetbtn' onClick={ClearTimer}></button>);
    timer = setInterval(() => {
      count--;
      setCountTime(count);
      if (count >= 0) {
        if (count >= 60) {
          setMinute(changeDigits(Math.floor(count / 60)));
          setSecond(changeDigits(count % 60));
        } else {
          setSecond(changeDigits(count));
        }

        if (count === 0) {
          setAlertCondition(<div className='condition__point'> &nbsp;&nbsp;&nbsp; 50포인트를 획득했습니다!</div>)
          obtainPoint = obtainPoint + 50;
        }
      } else {
        setCssState('over');
        setTimerState(false);
        setClearTimer('');
        setPauseTimer('');
        setStopTimer(<button type="button" id="stoptbtn" className='timerbtns__controlbtn stop' onClick={StopTimer}> &nbsp;&nbsp; Stop! </button>);
        if (count >= -60) {
          setSecond(changeDigits(Math.abs(count)));
        } else {
          setMinute(changeDigits(Math.floor(Math.abs(count) / 60)));
          setSecond(changeDigits(Math.abs(count % 60)));
        }

        if (count % 60 === 0) {
          setAlertCondition(<div className='condition__point'> &nbsp;&nbsp;&nbsp; 1포인트를 획득했습니다!</div>)
          obtainPoint++;
          console.log(obtainPoint)
        }
      }
    }, 1000);
  }

  const StopTimer = () => {
    setTotalPoint(obtainPoint);
    init();
    clearInterval(timer);
    setStopTimer('');
    setPoint(obtainPoint);
  }

  const PauseTimer = () => {
    setAlertCondition(<div className='condition__stop'> &nbsp;&nbsp;&nbsp; 집중이 중단되었습니다.</div>)
    clearInterval(timer);
  }

  const ClearTimer = () => {
    init();
    clearInterval(timer);
  }

  useEffect(() => {
    const options = {
      point: totalPoint,
    }
    const id = '648ab555-4ca1-40e5-91dc-6fdf0c793488'

    const updateinfo = async (id, options) => {
      await updatePoint(id, options);
    }

    updateinfo(id, options);
  }, [totalPoint])

  return (
    <>
      <div className='targettime'>
        <div className='targettime__icon'></div>
        {changeTime(initialTime)}
      </div>
      <div className={`timer ${cssState ? cssState == 'over'? "gray": "vividred" : ""}`}>
        {timerState ? "" : "-"}
        <input type="text" className={`timer__input ${cssState ? cssState == 'over'? "gray": "vividred" : ""}`} value={minute} onChange={timerMinute} /> :
        <input type="text" className={`timer__input ${cssState ? cssState == 'over'? "gray": "vividred" : ""}`} value={second} onChange={timerSecond} />
      </div>

      <div className="timerbtns">
        {pauseTimer}
        {stopTimer}
        <button type="button" id="startbtn" className={`timerbtns__controlbtn ${timerState ? "" : "nodisplay"}`} onClick={StartTimer}> &nbsp;&nbsp; Start! </button>
        {clearTimer}
      </div>
      <div className='condition'>
        {alertCondition}
      </div>
    </>
  )
}

export default Timer;