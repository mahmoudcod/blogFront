import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import CatDetails from './pages/catDetails';
import DetailsPage from './pages/details';
import Advertising from './pages/advertising';
import Profile from './pages/profile';
import Search from './pages/search';
import Publish from './pages/publish';
import Usage from './pages/usage';
import Privacy from './pages/privacy';
import Tags from './pages/tags';
import Contact from './pages/contact';
import SupCatDetails from './pages/subCat';

const client = new ApolloClient({
  uri: 'http://144.91.117.210/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/search/:searchQ" element={<Search />} />
          <Route path="/tags/:id" element={<Tags />} />
          <Route path="/details/:slug" element={<DetailsPage />} />
          <Route path="/category/:slug" element={<CatDetails />} />
          <Route path="/category/:slug/sub/:slug" element={<SupCatDetails />} />
          <Route path="/advertising" element={<Advertising />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/usage" element={<Usage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
