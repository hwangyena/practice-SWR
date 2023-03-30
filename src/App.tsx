import { SWRConfig } from 'swr';
import Router from './Router';

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (res) => fetch(res).then((res) => res.json()),
      }}
    >
      <Router />
    </SWRConfig>
  );
}

export default App;
