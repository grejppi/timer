import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './App.pcss';

import TimerList from './Pages/TimerList';
import CreateTimer from './Pages/CreateTimer';

const Pages = {
  TimerList: 0,
  CreateTimer: 1,
};

const App = () => {
  let [page, setPage] = useState(Pages.TimerList);

  let [timers, setTimers] = useState(
    localStorage.getItem('timers') ||
    [
      {
        id: 1,
        time: 100000000,
        remaining: 0,
      },
    ],
  );

  let [running, setRunning] = useState({});

  return (
    <div>
      {page == Pages.TimerList &&
        <TimerList
          create={() => setPage(Pages.CreateTimer)}
          timers={timers}
          running={running}
          setRunning={setRunning}
        />
      }

      {page == Pages.CreateTimer &&
        <CreateTimer
          close={() => setPage(Pages.TimerList)}
        />
      }
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
