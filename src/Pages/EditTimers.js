import React from 'react';

import Timer from '../Components/Timer';

export default function EditTimers({ timers, setTimers, close }) {
  return <div className="container w-full xl:w-1/4 lg:w-1/3 md:w-1/2 mx-auto">
    <div className="Header">
      <header className="bg-pink-900 flex flex-row">
        <button
          className="text-3xl m-2 px-6 py-2 rounded-md shadow bg-pink-600 text-pink-100"
          onClick={close ? close : () => console.log("Closed! c:")}
        >
          Done
        </button>
        <div className="flex-grow"></div>
      </header>
    </div>

    <div className="flex flex-row flex-wrap container w-full">
      {timers.map((timer, i) => <React.Fragment key={i}>
        <Timer
          state={timer}
          onClick={() => {}}
          updateCount={0}
        >
          <button onClick={(ev) => {
            let newTimers = [...timers];
            newTimers.splice(i, 1);
            setTimers(newTimers);
            if (close !== undefined && newTimers.length == 0) {
              close();
            }
            ev.stopPropagation();
          }}>
            Delete
          </button>
        </Timer>
      </React.Fragment>)}
    </div>
  </div>;
}
