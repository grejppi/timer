import React from 'react';

import Timer from '../Components/Timer';

export default function TimerList({ create, edit, timers, running, setRunning, toggleTimer, resetTimer, updateCount }) {
  const nothingIsRunning = Object.keys(running).length == 0;

  return <div className="Page container">
    <div className="Header">
      <header className="bg-pink-900 flex flex-row">
        {timers.length !== 0 && nothingIsRunning && <button
          onClick={edit ? edit : () => {console.log("Editing! c:")}}
        >
          Edit
        </button>}

        {timers.length !== 0 && !nothingIsRunning && <button
          disabled
        >
          Edit
        </button>}

        <div className="flex-grow"></div>

        <button
          onClick={create ? create : () => {console.log("Created! c:")}}
        >
          New
        </button>
      </header>
    </div>

    <div className="flex flex-row flex-wrap container w-full">
      {timers.map((timer, i) => <React.Fragment key={i}>
        <Timer
          state={timer}
          runningState={running[timer.id]}
          onClick={() => toggleTimer(timer.id)}
          onDoubleClick={() => resetTimer(timer.id)}
          updateCount={!!running[timer.id] ? updateCount : 0}
        />
      </React.Fragment>)}
    </div>
  </div>
}
