import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import Footer from '../src/component/footer';
import Header from '../src/component/header';
import Layout from '../src/component/layout';
import { useRouter } from 'next/router';

const GET_ADVERTISING = gql`
  query GetAdvertising {
    police {
      data {
        id
        attributes {
          privacy
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

const Privacy = () => {
    const router = useRouter();
    const { loading: advertisingLoading, error: advertisingError, data: advertisingData } = useQuery(GET_ADVERTISING);
    const { loading: logoLoading, error: logoError, data: logoData } = useQuery(GET_LOGO);

    if (advertisingLoading || logoLoading) return null;
    if (advertisingError) return `Error! ${advertisingError.message}`;
    if (logoError) return `Error! ${logoError.message}`;

    const appName = logoData.logo.data.attributes.appName;
    const title = `سياسة الخصوصية - ${appName}`;
    const description = `تعرف على سياسة الخصوصية الخاصة بنا وكيفية الاستفادة من خدمات ${appName} مع الحفاظ على أمان بياناتك.`;
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
                    <h2>سياسة الخصوصية</h2>
                    <p className='police-dic'>
                        قسم أفكار المشاريع هو الجزء في المنصة الذي يوفر للمستخدمين مجموعة من الافكار والاقتراحات لتطوير مشاريع جديدة. يهدف هذا القسم إلى توفير مصادر إلهام وإشارات لمن يبحثون عن فرص استثمارية أو مشاريع جديدة لتطويرها. يمكن أن يشمل القسم تحليلًا للاتجاهات الصاعدة في السوق، وفحصاً للحاجات الاستهلاكية أو الفجوات في الصناعة.
                    </p>
                </div>
                <div className='police'>
                    <ReactMarkdown key={advertisingData.police.data.id}>{advertisingData.police.data.attributes.privacy}</ReactMarkdown>
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default Privacy;
