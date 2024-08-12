//pages/_app.js
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../src/lip/apolloClient';
import '../src/index.css'
import '../src/style/catDetails.css'
import '../src/style/categories.css'
import '../src/style/catFour.css'
import '../src/style/catOne.css'
import '../src/style/catThree.css'
import '../src/style/catTwo.css'
import '../src/style/comment.css'
import '../src/style/contact.css'
import '../src/style/details.css'
import '../src/style/footer.css'
import '../src/style/grid.css'
import '../src/style/header.css'
import '../src/style/hint.css'
import '../src/style/police.css'
import '../src/style/profile.css'
import '../src/style/recent.css'
import '../src/style/search.css'
import '../src/component/layout'
function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <div dir="rtl" >
                <Component {...pageProps} />
            </div>
        </ApolloProvider>
    );

}

export default App