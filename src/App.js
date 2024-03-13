import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from './pages/home'

 

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
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
