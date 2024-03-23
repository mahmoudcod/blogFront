

import { useQuery, gql } from '@apollo/client';
import Loader from '../component/loading';
import { useParams } from 'react-router-dom';




const GET_ADVERTISING = gql`
query GetAdvertising($id: ID!) {
        advertising(id: $id) {
            data{
                id
                attributes{
                    police
                }
            }
        }
    }
    `;


const Advertising = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_ADVERTISING, {
        variables: { id },
    });
    if (loading) return <Loader />;
    if (error) return `Error! ${error.message}`;
    return (
        <div>
            <h1>سياسة الاعلاان</h1>
            <p className='cat-disc'>قسم أفكار المشاريع هو الجزء في المنصة الذي يوفر للمستخدمين مجموعة من الافكار والاقتراحات لتطوير مشاريع جديدة. يهدف هذا القسم إلى توفير مصادر إلهام وإشارات لمن يبحثون عن فرص استثمارية أو مشاريع جديدة لتطويرها. يمكن أن يشمل القسم تحليلًا للاتجاهات الصاعدة في السوق، وفحصاً للحاجات الاستهلاكية أو الفجوات في الصناعة.
            </p>
            <p key={data.advertising.data.id}>{data.advertising.data.attributes.advertisingPolicies}</p>
        </div>
    );
}

export default Advertising;