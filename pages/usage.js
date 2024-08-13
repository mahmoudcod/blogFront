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

const Usage = () => {
    const router = useRouter();
    const { loading, error, data } = useQuery(GET_ADVERTISING);

    const title = 'سياسة الاستخدام';
    const description = 'تعرف على سياسة الاستخدام الخاصة بنا وكيفية الاستفادة من خدماتنا بأفضل طريقة ممكنة.';
    const image = 'https://res.cloudinary.com/datnay9zk/image/upload/v1710429087/Untitled_0ca8759c27.png'; // Update with a relevant image URL

    return (
        <Layout
            title={title}
            description={description}
            image={image}
        >
            <Header />
            {loading && <p>Loading...</p>}
            {error && <p>خطأ: {error.message}</p>}
            {data && (
                <div className='container'>
                    <div className='police-details'>
                        <h2>سياسة الاستخدام</h2>
                        <p className='police-dic'>
                            قسم أفكار المشاريع هو الجزء في المنصة الذي يوفر للمستخدمين مجموعة من الافكار والاقتراحات لتطوير مشاريع جديدة. يهدف هذا القسم إلى توفير مصادر إلهام وإشارات لمن يبحثون عن فرص استثمارية أو مشاريع جديدة لتطويرها. يمكن أن يشمل القسم تحليلًا للاتجاهات الصاعدة في السوق، وفحصاً للحاجات الاستهلاكية أو الفجوات في الصناعة.
                        </p>
                    </div>
                    <div className='police'>
                        <ReactMarkdown key={data.police.data.id}>{data.police.data.attributes.useage}</ReactMarkdown>
                    </div>
                </div>
            )}
            <Footer />
        </Layout>
    );
};

export default Usage;
