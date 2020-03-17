import React from 'react';

import Timer from '../Components/Timer';

export default function TimerList({ create, edit, timers, running, setRunning, toggleTimer, resetTimer, updateCount }) {
  const nothingIsRunning = Object.keys(running).length == 0;

  return <div className="Page container h-full">
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

    {!!timers.length && <div className="flex flex-row flex-wrap container w-full">
      {timers.map((timer, i) => <React.Fragment key={i}>
        <Timer
          state={timer}
          runningState={running[timer.id]}
          onClick={() => toggleTimer(timer.id)}
          onDoubleClick={() => resetTimer(timer.id)}
          updateCount={!!running[timer.id] ? updateCount : 0}
        />
      </React.Fragment>)}
    </div>}

    {!timers.length && <div className="flex flex-row container w-full text-gray-600 items-center font-hairline">
      <div className="w-1/3 h-full py-4 flex flex-col items-center justify-center">
        <p className="TimerBody border-dashed border-gray-600">No timers</p>
      </div>
      <p className="w-2/3 h-full h-24 text-center">Start a timer by pressing <span className="rounded px-2 py-1 mx-1 border-gray-600 border">New</span></p>
    </div>}
  </div>
}
