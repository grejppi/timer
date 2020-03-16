import React from 'react';

import Timer from '../Components/Timer';

export default function TimerList({ create, edit, timers, running, setRunning, setTimerState, updateCount }) {
  const nothingIsRunning = Object.keys(running).length == 0;

  return <div className="container w-full xl:w-1/4 lg:w-1/3 md:w-1/2 mx-auto">
    <div className="Header">
      <header className="bg-pink-900 flex flex-row">
        {timers.length !== 0 && nothingIsRunning && <button
          className="text-3xl m-2 px-6 py-2 rounded-md shadow bg-pink-600 text-pink-100"
          onClick={edit ? edit : () => {console.log("Editing! c:")}}
        >
          Edit
        </button>}

        {timers.length !== 0 && !nothingIsRunning && <button
          className="text-3xl m-2 px-6 rounded-md shadow text-pink-300"
          disabled
        >
          Edit
        </button>}

        <div className="flex-grow"></div>

        <button
          className="text-3xl m-2 px-6 py-2 rounded-md shadow bg-pink-600 text-pink-100"
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
          onClick={() => setTimerState(timer.id)}
          updateCount={!!running[timer.id] ? updateCount : 0}
        />
      </React.Fragment>)}
    </div>
  </div>
}
