import React from 'react';

export default function TimerInputLabel({ digits }) {
    return <span className="text-5xl md:text-6xl">
      {(() => {
        let chars = new Array();
        for (let digit of digits) {
          chars.push(digit);
        }

        while (chars.length < 6) {
          chars.unshift(0);
        }

        let minutes = chars.length - 2;
        let hours = minutes - 2;
        chars.splice(minutes, 0, ':');
        chars.splice(hours, 0, ':');

        return chars.join('');
      })()}
    </span>;
}
