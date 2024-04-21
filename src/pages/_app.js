import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lip/apolloClient'
import '../style/catDetails.css'
import '../style/categories.css'
import '../style/catFour.css'
import '../style/catOne.css'
import '../style/catThree.css'
import '../style/catTwo.css'
import '../style/comment.css'
import '../style/contact.css'
import '../style/details.css'
import '../style/footer.css'
import '../style/grid.css'
import '../style/header.css'
import '../style/hint.css'
import '../style/police.css'
import '../style/profile.css'
import '../style/recent.css'
import '../style/search.css'
function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps.initialApolloState); // Assuming you have a custom Apollo Client setup

    return (
        <ApolloProvider client={apolloClient}>
            <div dir="rtl">
                <Component {...pageProps} />
            </div>
        </ApolloProvider>
    );

}

export default App