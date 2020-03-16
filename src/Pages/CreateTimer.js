import React, { useState } from 'react';

import './CreateTimer.pcss';

import TimerInputLabel from '../Components/TimerInputLabel';

export default function CreateTimer({ close, start }) {
  let [digits, setDigits] = useState([]);

  const addDigit = (digit) => {
    if (digits.length == 0 && digit == 0) {
      return;
    }

    if (digits.length < 6) {
      setDigits(digits.concat([digit]));
    } else {
      setDigits(digits.slice(0, 5).concat([digit]));
    }
  };

  const removeDigit = () => {
    setDigits(digits.slice(0, digits.length - 1));
  };

  const isValid = () => {
    if (digits.length >= 2) {
      if (digits[digits.length - 2] >= 6) {
        return false;
      }
    }

    if (digits.length >= 4) {
      if (digits[digits.length - 4] >= 6) {
        return false;
      }
    }

    return digits.length != 0;
  };

  return <div className="container w-full xl:w-1/4 lg:w-1/3 md:w-1/2 mx-auto">
    <div className="Header">
      <header className="bg-pink-900 flex flex-row">
        <button
          className="text-3xl m-2 px-6 py-2 rounded-md shadow bg-pink-600 text-pink-100"
          onClick={close ? close : () => { console.log("Closed! c:") }}
        >
          Back
        </button>

        <div className="flex-grow"></div>

        {isValid() &&
          <button
            className="text-3xl m-2 px-6 rounded-md shadow bg-pink-600 text-pink-100"
            onClick={() => {
              (start ? start : () => { console.log("Started! c:") })();
              close && close();
            }}
          >
            Start
          </button>}

        {!isValid() &&
          <button
            className="text-3xl m-2 px-6 rounded-md shadow text-pink-300"
            disabled
          >
            Start
          </button>}
      </header>
    </div>
    <div className="flex flex-row">
      <div className="flex-grow text-center pr-6">
        <TimerInputLabel digits={digits} />
      </div>
      <button className="w-1/6" onClick={() => removeDigit()}><span className="fas fa-backspace"></span></button>
      <button className="w-1/6" onClick={() => setDigits([])}><span className="fas fa-times"></span></button>
    </div>
    <div className="InputPad flex flex-row flex-wrap container w-full justify-center">
      <button onClick={() => addDigit(1)}>1</button>
      <button onClick={() => addDigit(2)}>2</button>
      <button onClick={() => addDigit(3)}>3</button>
      <button onClick={() => addDigit(4)}>4</button>
      <button onClick={() => addDigit(5)}>5</button>
      <button onClick={() => addDigit(6)}>6</button>
      <button onClick={() => addDigit(7)}>7</button>
      <button onClick={() => addDigit(8)}>8</button>
      <button onClick={() => addDigit(9)}>9</button>
      <button onClick={() => addDigit(0)}>0</button>
    </div>
  </div>;
};
