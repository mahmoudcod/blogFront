import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from './pages/home'

 

const client = new ApolloClient({
  uri: 'https://demoblog-h71e.onrender.com/graphql',
  cache: new InMemoryCache()
});
function App() {
  return (
<>
  <ApolloProvider client={client}>
<Home/>
  </ApolloProvider>

</>
  );
}

export default App;
