import React from 'react';
import Layout from '../src/component/layout';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import Footer from '../src/component/footer';
import Header from '../src/component/header';

const GET_ADVERTISING = gql`
  query GetAdvertising {
    police {
      data {
        id
        attributes {
          advertising
        }
      }
    }
  }
`;

const GET_LOGO = gql`
  query getLogo {
    logo {
      data {
        id
        attributes {
          appName
        }
      }
    }
  }
`;

const Advertising = () => {
  const { loading: advertisingLoading, error: advertisingError, data: advertisingData } = useQuery(GET_ADVERTISING);
  const { loading: logoLoading, error: logoError, data: logoData } = useQuery(GET_LOGO);

  if (advertisingLoading || logoLoading) return <p></p>;
  if (advertisingError) return <p>خطأ: {advertisingError.message}</p>;
  if (logoError) return <p>خطأ: {logoError.message}</p>;

  const appName = logoData.logo.data.attributes.appName;
  const title = `سياسة الإعلان - ${appName}`;
  const description = `تعرف على سياسة الإعلان الخاصة بنا وكيفية الاستفادة من خدمات ${appName} بأفضل طريقة ممكنة.`;
  const image = 'https://res.cloudinary.com/datnay9zk/image/upload/v1710429087/Untitled_0ca8759c27.png'; // Update with a relevant image URL

  return (
    <Layout
      title={title}
      description={description}
      image={image}
    >
      <Header />
      <div className='container'>
        <div className='police-details'>
          <h2>سياسة الإعلان</h2>

        </div>
        <div className='police'>
          <ReactMarkdown key={advertisingData.police.data.id}>
            {advertisingData.police.data.attributes.advertising}
          </ReactMarkdown>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Advertising;
