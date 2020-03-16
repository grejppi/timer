import React from 'react';

import Timer from '../Components/Timer';

export default function TimerList({ create, timers, running, setRunning }) {
  return <div className="container w-full xl:w-1/4 lg:w-1/3 md:w-1/2 mx-auto">
    <div className="Header">
      <header className="bg-pink-900 flex flex-row">
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
        <Timer state={timer} />
      </React.Fragment>)}
    </div>
  </div>
}
