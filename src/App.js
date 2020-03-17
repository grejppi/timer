import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './App.pcss';

import TimerList from './Pages/TimerList';
import CreateTimer from './Pages/CreateTimer';
import EditTimers from './Pages/EditTimers';

const Pages = {
  TimerList: 0,
  CreateTimer: 1,
  EditTimers: 2,
};

const SessionID = new Date().getTime();

const App = () => {
  let [page, setPage] = useState(Pages.TimerList);

  let [timers, setTimers] = useState(
    JSON.parse(localStorage.getItem('timers')) || [],
  );

  let [running, setRunning] = useState({});

  let [intervalID, setIntervalID] = useState(undefined);
  let [updateCount, setUpdateCount] = useState(0);

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

  const toggleTimer = (id) => {
    let newRunning = { ...running };
    if (running[id] !== undefined) {
      let newTimers = [ ...timers ];
      delete newRunning[id];
      for (let timer of newTimers) {
        if (timer.id === id) {
          timer.elapsed = timer.elapsed + new Date().getTime() - running[id].started;
          if (timer.elapsed > timer.time) {
            timer.elapsed = 0;
          }
          break;
        }
      }
      saveTimers(newTimers);
    } else {
      newRunning[id] = {
        started: new Date().getTime(),
      };
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
    newRunning[id] = { started: new Date().getTime() };
    setRunning(newRunning);
  };

  return (
    <div>
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
          commit={(newTimers) => { setTimers(newTimers) }}
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
