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

const Advertising = () => {
    const { loading, error, data } = useQuery(GET_ADVERTISING);

    const title = ' سياسة الاعلان | صناع المال';
    const description = 'صناع المال هو محتوي يقدم نصايح للمال ومعلومات عن الاقتصاد';
    const image = 'https://res.cloudinary.com/datnay9zk/image/upload/v1710429087/Untitled_0ca8759c27.png';

    return (
        <Layout
            title={title}
            description={description}
            image={image}
        >
            <Header />
            {loading && <p></p>}
            {error && <p>خطأ: {error.message}</p>}
            {data && (
                <div className='container'>
                    <div className='police-details'>
                        <h2>سياسة الاعلاان</h2>
                        <p className='police-dic'>
                            قسم أفكار المشاريع هو الجزء في المنصة الذي يوفر للمستخدمين مجموعة من الافكار والاقتراحات لتطوير مشاريع جديدة. يهدف هذا القسم إلى توفير مصادر إلهام وإشارات لمن يبحثون عن فرص استثمارية أو مشاريع جديدة لتطويرها. يمكن أن يشمل القسم تحليلًا للاتجاهات الصاعدة في السوق، وفحصاً للحاجات الاستهلاكية أو الفجوات في الصناعة.
                        </p>
                    </div>
                    <div className='police'>
                        <ReactMarkdown key={data.police.data.id}>
                            {data.police.data.attributes.advertising}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
            <Footer />
        </Layout>
    );
}

export default Advertising;