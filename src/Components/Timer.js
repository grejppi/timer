import React from 'react';

import './Timer.pcss';

export function formatTime(time) {
  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  if (seconds < 60) {
    return {
      className: 'text-4xl font-hairline',
      text: `${seconds}s`,
    };
  }

  if (seconds < 3600) {
    return {
      className: 'text-xl font-thin',
      text: `${minutes}m ${seconds % 60}s`,
    };
  }

  return {
    className: 'text-base font-thin',
    text: `${hours}h ${minutes % 60}m ${seconds % 60}s`,
  };
}

function formatTimeInternal(time) {
  let { className, text } = formatTime(time);
  return <span className={className}>{text}</span>;
};

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
        {formatTimeInternal(remaining)}
        <div className="absolute bottom-0">
          {children}
        </div>
      </div>
    </div>
  );
}
