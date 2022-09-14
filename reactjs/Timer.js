import React, { useState } from 'react';

function App() {

  const [seconds, setSeconds] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [paused, setPaused] = useState(false);

  // converts the time into readable time representation
  const parseTime = ()=>{
    let minutes = Math.floor(seconds/60);
    let remSeconds = seconds % 60;
    let hours = Math.floor(minutes/60);
    let remMinutes = minutes % 60;
    return (
      (hours < 10 ? '0' : '') + hours) + ':' + 
      ((remMinutes < 10 ? '0' : '') + remMinutes) + ':' + 
      ((remSeconds < 10 ? '0' : '') + remSeconds
    ); 
  };

  // runs a timer starting from `fromTime`
  const runTimer = (fromTime) => {
    if (timerInterval)  clearInterval(timerInterval);
    let currInterval = setInterval(()=>{
      setSeconds(seconds => seconds + 1);
    }, 1000);
    setTimerInterval(currInterval);
  }

  // This may vary based on how the functionality of start button is defined
  const startTimer = () => {
    setPaused(false);
    runTimer(seconds);
  }

  // pause the timer
  const pauseTimer = () => {
    if (paused) runTimer(seconds);
    else        clearInterval(timerInterval);
    setPaused(prevPaused => !prevPaused);
  }

  // reset the timer
  const resetTimer = () => {
    setPaused(false);
    runTimer(0);
  }

  let pauseBtnText = (paused ? "Resume" : "Pause");
  return (
    <div>
      <h1>{parseTime()}</h1>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>{pauseBtnText}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}

export default App;
