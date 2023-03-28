import { useState } from 'react';
import { SWRConfig } from 'swr';
import Update from './components/Update';
import User from './components/User';

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (res) => fetch(res).then((res) => res.json()),
      }}
    >
      <User />
      <hr />
      <Update />
    </SWRConfig>
  );
}

export default App;
