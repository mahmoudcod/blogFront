import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Layout from '../src/component/layout';
import ReactMarkdown from 'react-markdown';
import Footer from '../src/component/footer';
import Header from '../src/component/header';
import { useRouter } from 'next/router';

const GET_ADVERTISING = gql`
  query GetAdvertising {
    police {
      data {
        id
        attributes {
          useage
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

const Usage = () => {
  const router = useRouter();
  const { loading: advertisingLoading, error: advertisingError, data: advertisingData } = useQuery(GET_ADVERTISING);
  const { loading: logoLoading, error: logoError, data: logoData } = useQuery(GET_LOGO);

  if (advertisingLoading || logoLoading) return <p></p>;
  if (advertisingError) return <p>خطأ: {advertisingError.message}</p>;
  if (logoError) return <p>خطأ: {logoError.message}</p>;

  const appName = logoData.logo.data.attributes.appName;
  const title = `سياسة الاستخدام `;
  const description = `تعرف على سياسة الاستخدام الخاصة بنا وكيفية الاستفادة من خدمات ${appName} بأفضل طريقة ممكنة.`;
  const image = 'https://res.cloudinary.com/datnay9zk/image/upload/v1710429087/Untitled_0ca8759c27.png'; // Update with a relevant image URL

  return (
    <Layout
      title={`سياسة الاستخدام - ${appName}`}
      description={description}
      image={image}
    >
      <Header />
      <div className='container'>
        <div className='police-details'>
          <h2>{title}</h2>
        </div>
        <div className='police'>
          <ReactMarkdown key={advertisingData.police.data.id}>{advertisingData.police.data.attributes.useage}</ReactMarkdown>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Usage;