import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './App.pcss';

import TimerList from './Pages/TimerList';
import CreateTimer from './Pages/CreateTimer';

const Pages = {
  TimerList: 0,
  CreateTimer: 1,
};

const App = () => {
  let [page, setPage] = useState(Pages.TimerList);

  return (
    <div>
      {page == Pages.TimerList &&
        <TimerList
          create={() => setPage(Pages.CreateTimer)}
        />
      }

      {page == Pages.CreateTimer &&
        <CreateTimer
          close={() => setPage(Pages.TimerList)}
        />
      }
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
