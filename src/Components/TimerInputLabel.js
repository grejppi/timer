import React from 'react';

export default function TimerInputLabel({ digits }) {
    return <span className="text-5xl font-hairline">
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

        return <div className="flex flex-row items-center justify-around">
          {chars.map((c, i) => <React.Fragment key={i}>
            <div className="text-center" style={{width: '12.5%'}}>{c}</div>
          </React.Fragment>)}
        </div>;
      })()}
    </span>;
}
