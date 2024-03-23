

import { useParams, useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import '../style/catDetails.css';

const catLinks = gql`
    query GetCatDetails{
        categories {
            data{
                id
                attributes {
                    name
                }
            }
        }
    }
`;

const CatLinks = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(catLinks, {
        variables: { id },
    });
    const location = useLocation();

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <>
            {data.categories.data.map(cat => (
                <Link
                    to={`/category/${cat.id}`}
                    key={cat.id}
                    className={location.pathname === `/category/${cat.id}` ? 'active' : ''}
                >
                    {cat.attributes.name}
                </Link>
            ))}
        </>
    );
};

export default CatLinks;
