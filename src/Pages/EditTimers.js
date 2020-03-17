import React, { useState } from 'react';

import Timer from '../Components/Timer';

export default function EditTimers({ timers, close, commit }) {
  let [newTimers, setNewTimers] = useState(timers);

  return <div className="Page container">
    <div className="Header">
      <header className="bg-pink-900 flex flex-row">
        <button
          onClick={close ? close : () => console.log("Closed! c:")}
        >
          Cancel
        </button>

        <div className="flex-grow"></div>

        <button
          onClick={() => {
            (commit ? commit(newTimers) : console.log("Committed! c:"));
            (close && close());
          }}
        >
          Done
        </button>
      </header>
    </div>

    <div className="flex flex-row flex-wrap container w-full">
      {newTimers.map((timer, i) => <React.Fragment key={i}>
        <Timer
          state={timer}
          onClick={() => {}}
          updateCount={0}
        >
          <button
            onClick={(ev) => {
              let newNewTimers = [...newTimers];
              newNewTimers.splice(i, 1);
              setNewTimers(newNewTimers);
              ev.stopPropagation();
            }}
          >
            <span className="fas fa-times"></span>
            <span className="hidden">Delete</span>
          </button>
          <div className="flex-grow"></div>
        </Timer>
      </React.Fragment>)}
    </div>
  </div>;
}
