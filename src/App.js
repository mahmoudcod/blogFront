import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import CatDetails from './pages/catDetails';
import DetailsPage from './pages/details';
import Advertising from './pages/advertising';
import Profile from './pages/profile';
import Search from './pages/search';

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
          <Route path="/category/:id" element={<CatDetails />} />
          <Route path="/advertising" element={<Advertising />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/search/:searchQ" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
