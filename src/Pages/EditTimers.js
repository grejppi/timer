import React from 'react';

import Timer from '../Components/Timer';

export default function EditTimers({ timers, setTimers, close }) {
  return <div className="Page container">
    <div className="Header">
      <header className="bg-pink-900 flex flex-row">
        <button
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
          <button
            onClick={(ev) => {
              let newTimers = [...timers];
              newTimers.splice(i, 1);
              setTimers(newTimers);
              if (close !== undefined && newTimers.length == 0) {
                close();
              }
              ev.stopPropagation();
            }}
          >
            <span className="fas fa-times"></span>
          </button>
          <div class="flex-grow"></div>
        </Timer>
      </React.Fragment>)}
    </div>
  </div>;
}
