import React from 'react';

import './Timer.pcss';

function formatTime(time) {
  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  if (seconds < 60) {
    return <span className="text-4xl font-hairline">
      {`${seconds}s`}
    </span>;
  }

  if (seconds < 3600) {
    return <span className="text-xl font-thin">
      {`${minutes}m ${seconds % 60}s`}
    </span>;
  }

  return <span className="text-base font-thin">
    {`${hours}h ${minutes % 60}m ${seconds % 60}s`}
  </span>;
}

export default function Timer({ state, runningState, onClick, onDoubleClick, updateCount, children }) {
  let _ = updateCount;

  let remaining = state.time - state.elapsed - (runningState !== undefined ? (new Date().getTime() - runningState.started) : 0);

  return (
    <div className="w-1/3 h-full py-4 flex flex-col items-center justify-center">
      <div
        className={"TimerBody " + (
          runningState !== undefined ? remaining < 0 ? "TimeUp" : "Running" : "Stopped"
        )}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        {formatTime(remaining)}
        <div className="absolute bottom-0">
          {children}
        </div>
      </div>
    </div>
  );
}
