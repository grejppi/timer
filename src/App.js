import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './App.pcss';

import TimerList from './Pages/TimerList';
import CreateTimer from './Pages/CreateTimer';
import EditTimers from './Pages/EditTimers';

import { formatTime } from './Components/Timer';

const Pages = {
  TimerList: 0,
  CreateTimer: 1,
  EditTimers: 2,
};

const SessionID = new Date().getTime();

const App = () => {
  let [page, setPage] = useState(Pages.TimerList);
  let [running, setRunning] = useState({});
  let [intervalID, setIntervalID] = useState(undefined);
  let [updateCount, setUpdateCount] = useState(0);
  let [alarms, setAlarms] = useState({});
  let [timers, setTimers] = useState(
    JSON.parse(localStorage.getItem('timers')) || [],
  );

  useEffect(() => {
    if (intervalID === undefined) {
      setIntervalID(setInterval(() => {
        setUpdateCount((count) => ++count);
      }, 10));
    }
  });

  const saveTimers = (newTimers) => {
    setTimers(newTimers);
    localStorage.setItem('timers', JSON.stringify(newTimers));
  };

  const toggleAlarm = (id) => {
    setAlarms((alarms) => {
      let newAlarms = { ...alarms };

      if (alarms[id] !== undefined) {
        delete newAlarms[id];
      } else {
        newAlarms[id] = true;
      }

      let alarm = document.getElementById('Alarm');

      if (Object.keys(newAlarms).length == 0) {
        alarm.pause();
        alarm.currentTime = 0;
      } else {
        alarm.play();
      }

      return newAlarms;
    });
  };

  const initAlarm = () => {
    let alarm = document.getElementById('Alarm');
    if (alarm.src === '') {
      alarm.src = require('../assets/Alarm.mp3');
      alarm.play();
      alarm.pause();
      alarm.currentTime = 0;
      alarm.loop = true;
    }
  };

  const initRunningTimer = (id, time) => {
    return {
      started: new Date().getTime(),
      timeoutID: time !== undefined && setTimeout(() => {
        toggleAlarm(id);
      }, time),
    };
  };

  const toggleTimer = (id) => {
    let newRunning = { ...running };

    if (running[id] !== undefined) {
      let newTimers = [ ...timers ];
      (newRunning[id].timeoutID && clearTimeout(newRunning[id].timeoutID));
      delete newRunning[id];

      for (let timer of newTimers) {
        if (timer.id === id) {
          timer.elapsed = timer.elapsed + new Date().getTime() - running[id].started;
          if (timer.elapsed > timer.time) {
            timer.elapsed = 0;
            toggleAlarm(id);
          }
          break;
        }
      }
      saveTimers(newTimers);
    } else {
      const time = (() => {
        for (let timer of timers) {
          if (timer.id === id) {
            return timer.time - timer.elapsed;
          }
        }
        return undefined;
      })();

      newRunning[id] = initRunningTimer(id, time);
    }

    setRunning(newRunning);
  };

  const resetTimer = (id) => {
    let newTimers = [ ...timers ];
    let newRunning = { ...running };
    for (let timer of newTimers) {
      if (timer.id === id) {
        timer.elapsed = 0;
        delete newRunning[id];
        break;
      }
    }
    saveTimers(newTimers);
    setRunning(newRunning);
  };

  const start = (time) => {
    let id = `${SessionID}:${new Date().getTime()}`;

    let newTimers = [
      {
        id,
        time: time,
        elapsed: 0,
      },
      ...timers,
    ];
    saveTimers(newTimers);

    let newRunning = { ...running };
    newRunning[id] = initRunningTimer(id, time);
    setRunning(newRunning);
  };

  return (
    <div onClick={() => initAlarm()}>
      <audio id="Alarm"></audio>
      {page == Pages.TimerList &&
        <TimerList
          create={() => setPage(Pages.CreateTimer)}
          edit={() => setPage(Pages.EditTimers)}
          timers={timers}
          running={running}
          setRunning={setRunning}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
          updateCount={updateCount}
        />
      }

      {page == Pages.CreateTimer &&
        <CreateTimer
          close={() => setPage(Pages.TimerList)}
          start={start}
        />
      }

      {page == Pages.EditTimers &&
        <EditTimers
          close={() => setPage(Pages.TimerList)}
          commit={(newTimers) => { saveTimers(newTimers) }}
          timers={timers}
          newTimers={[ ...timers ]}
          setTimers={saveTimers}
        />
      }
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
