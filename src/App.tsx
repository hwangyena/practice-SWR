import { SWRConfig } from 'swr';
import Layout from './components/Layout';
import Post from './components/Post';
import Profile from './components/Profile';

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (res) => fetch(res).then((res) => res.json()),
      }}
    >
      <Layout>
        <Profile />
        <Post />
      </Layout>
    </SWRConfig>
  );
}

export default App;
