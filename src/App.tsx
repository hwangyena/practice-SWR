import { SWRConfig } from 'swr';
import { fetcher } from './apis';
import Router from './Router';

function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <Router />
    </SWRConfig>
  );
}

export default App;
