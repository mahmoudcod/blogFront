//pages/_app.js
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo, initializeApollo } from '../src/lip/apolloClient';
import Head from 'next/head';
import gql from 'graphql-tag';
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

const GET_FAVICON = gql`
  query getFavicon {
    logo {
      data {
        attributes {
          favicon {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps.initialApolloState);
    const faviconUrl = pageProps.faviconUrl || '/default-favicon.ico';

    return (
        <ApolloProvider client={apolloClient}>
            <Head>
                <link rel="icon" href={faviconUrl} />
            </Head>
            <div dir="rtl">
                <Component {...pageProps} />
            </div>
        </ApolloProvider>
    );
}

App.getInitialProps = async (appContext) => {
    const apolloClient = initializeApollo();

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    try {
        const { data } = await apolloClient.query({
            query: GET_FAVICON,
        });

        const faviconUrl = data.logo.data.attributes.favicon?.data?.attributes?.url || '/default-favicon.ico';

        return {
            pageProps: {
                ...pageProps,
                faviconUrl,
                initialApolloState: apolloClient.cache.extract(),
            },
        };
    } catch (error) {
        console.error('Error fetching favicon:', error);
        return { pageProps };
    }
};

export default App;