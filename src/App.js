import React from 'react'; // Add this line
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
import About from './pages/about';
import { HelmetProvider } from 'react-helmet-async';

const client = new ApolloClient({
  uri: 'https://money-api.ektesad.com/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <HelmetProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/search/:searchQ" element={<Search />} />
            <Route path="/tags/:slug" element={<Tags />} />
            <Route path="/category/:slug" element={<CatDetails />} />
            <Route path="/category/:slug/:slug" element={<SupCatDetails />} />
            <Route path="/:slug" element={<DetailsPage />} />
            <Route path="/advertising" element={<Advertising />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/usage" element={<Usage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/profile/:slug" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </HelmetProvider>
  );
}

export default App;
