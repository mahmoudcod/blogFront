

import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Footer from '../component/footer';
import Header from '../component/header';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import '../style/police.css';




const GET_ADVERTISING = gql`
query GetAdvertising {
        police{
            data{
                id
                attributes{
                    about
                }
            }
        }
    }
    `;


const About = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_ADVERTISING, {
        variables: { id },
    });
    if (loading) return null
    if (error) return `Error! ${error.message}`;
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title> عن موقع صناع المال</title>
                    <meta name="description" content=" عن موقع صناع المال" />
                </Helmet>
                <Header />
                <div className='container'>
                    <div className='police-details'>
                        <h2>عن موقع صناع المال </h2>
                        <p className='police-dic'>قسم أفكار المشاريع هو الجزء في المنصة الذي يوفر للمستخدمين مجموعة من الافكار والاقتراحات لتطوير مشاريع جديدة. يهدف هذا القسم إلى توفير مصادر إلهام وإشارات لمن يبحثون عن فرص استثمارية أو مشاريع جديدة لتطويرها. يمكن أن يشمل القسم تحليلًا للاتجاهات الصاعدة في السوق، وفحصاً للحاجات الاستهلاكية أو الفجوات في الصناعة.
                        </p>
                    </div>
                    <div className='police'>
                        <ReactMarkdown key={data.police.data.id}>{data.police.data.attributes.about}</ReactMarkdown>
                    </div>
                </div>
                <Footer />
            </HelmetProvider>
        </>
    );
}

export default About;