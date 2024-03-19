import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {  Routes,BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import DetailsPage from './pages/details';

const client = new ApolloClient({
  uri: 'https://demoblog-h71e.onrender.com/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
