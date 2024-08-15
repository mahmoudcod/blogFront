import { useQuery, gql } from '@apollo/client';
import Layout from '../src/component/layout';
import ReactMarkdown from 'react-markdown';
import Footer from '../src/component/footer';
import Header from '../src/component/header';
import React from 'react';

const GET_ADVERTISING = gql`
  query GetAdvertising {
    police {
      data {
        id
        attributes {
          about
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

const About = () => {
  const { loading: advertisingLoading, error: advertisingError, data: advertisingData } = useQuery(GET_ADVERTISING);
  const { loading: logoLoading, error: logoError, data: logoData } = useQuery(GET_LOGO);

  if (advertisingLoading || logoLoading) return <p></p>;
  if (advertisingError) return <p>خطأ: {advertisingError.message}</p>;
  if (logoError) return <p>خطأ: {logoError.message}</p>;

  const appName = logoData.logo.data.attributes.appName;
  const title = `عن  ${appName} - ${appName}`;
  const description = `تعرف على المزيد حول موقع ${appName} وكيف يقدم نصائح للمال ومعلومات عن الاقتصاد.`;
  const image = 'https://res.cloudinary.com/datnay9zk/image/upload/v1710429087/Untitled_0ca8759c27.png';

  return (
    <Layout
      title={title}
      description={description}
      image={image}
    >
      <Header />
      {advertisingLoading && <p>Loading...</p>}
      {advertisingError && <p>خطأ: {advertisingError.message}</p>}
      {advertisingData && (
        <div className='container'>
          <div className='police-details'>
            <h2>{title}</h2>
            <p className='police-dic'>
              قسم أفكار المشاريع هو الجزء في المنصة الذي يوفر للمستخدمين مجموعة من الافكار والاقتراحات لتطوير مشاريع جديدة. يهدف هذا القسم إلى توفير مصادر إلهام وإشارات لمن يبحثون عن فرص استثمارية أو مشاريع جديدة لتطويرها. يمكن أن يشمل القسم تحليلًا للاتجاهات الصاعدة في السوق، وفحصاً للحاجات الاستهلاكية أو الفجوات في الصناعة.
            </p>
          </div>
          <div className='police'>
            <ReactMarkdown key={advertisingData.police.data.id}>
              {advertisingData.police.data.attributes.about}
            </ReactMarkdown>
          </div>
          <a className='about-footer' href='https://adainc.co/' target='blank'> <small className='footerSmall'>صمم بكل حب في ادا</small></a>

        </div>
      )}
      <Footer />
    </Layout>
  );
}

export default About;
