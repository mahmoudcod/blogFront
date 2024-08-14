import React, { useState, useEffect } from 'react';
import Layout from '../src/component/layout';
import Header from '../src/component/header';
import Grid from '../src/component/grid';
import Categories from '../src/component/categories';
import Recent from '../src/component/recent';
import CatOne from '../src/component/catOne';
import CatTwo from '../src/component/catTwo';
import CatThree from '../src/component/catThree';
import CatFour from '../src/component/catFour';
import Hint from '../src/component/hint';
import Footer from '../src/component/footer';
import { initializeApollo } from '../src/lip/apolloClient';
import gql from 'graphql-tag';

const GET_LOGO = gql`
  query getLogo {
    logo {
      data {
        id
        attributes {
          appName
          description
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

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_LOGO,
  });

  return {
    props: {
      logo: data.logo.data.attributes,
    },
  };
}

function Home({ logo }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const faviconUrl = logo.favicon?.data?.attributes?.url || '/default-favicon.ico';
  const description = logo.description || 'صناع المال هو محتوي يقدم نصايح للمال ومعلومات عن الاقتصاد';

  return (
    <Layout
      title={`${logo.appName} - ${description}`}
      description={description}
      image="https://res.cloudinary.com/datnay9zk/image/upload/v1710429087/Untitled_0ca8759c27.png"
      favicon={faviconUrl}
    >
      <div className={isLoaded ? '' : 'fade-out'}>
        <Header />
        <Grid />
        <Categories />
        <Recent />
        <CatOne />
        <CatTwo />
        <CatThree />
        <CatFour />
        <Hint />
        <Footer />
      </div>
    </Layout>
  );
}

export default Home;