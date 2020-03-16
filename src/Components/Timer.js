import React from 'react';

function formatTime(time) {
  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  if (seconds < 60) {
    return <span className="text-4xl">
      {`${seconds}s`}
    </span>;
  }

  if (seconds < 3600) {
    return <span className="text-xl">
      {`${minutes}m ${seconds % 60}s`}
    </span>;
  }

  return <span className="text-base">
    {`${hours}h ${minutes % 60}m ${seconds % 60}s`}
  </span>;
}

export default function Timer({ state }) {
  return (
    <div className="w-1/3 h-full p-4 flex justify-center">
      <div className="w-24 h-24 rounded-full border border-white flex flex-col justify-center items-center">
        {formatTime(state.time - state.remaining)}
      </div>
    </div>
  );
}
