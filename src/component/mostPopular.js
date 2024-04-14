import { useQuery, gql } from "@apollo/client";
import { Link } from 'react-router-dom';

const mostPopularQuery = gql`
  query mostPopular {
    blogs {
      data {
        id
        attributes {
          title
          slug
          categories {
            data {
              attributes {
                slug
                name
              }
            }
          }
        }
      }
    }
  }
`;

function MostPopular() {
  const { loading, error, data } = useQuery(mostPopularQuery);

  if (loading) return null;
  if (error) return <p>Error....</p>;

  const blogs = data.blogs.data.slice(0, 10);

  return (

    <>
      <h3 style={{ fontSize: '20px' }}>الأكثر قراءة</h3>
      {blogs.map((recent) => (
        <div key={recent.id} className='mostPopular'>
          <Link to={`/category/${recent.attributes.categories.data[0].attributes.slug}`}>
            <small className="padd">{recent.attributes.categories.data[0].attributes.name}</small>
          </Link>
          <h3 className="padd bor">
            <Link to={`/${recent.attributes.slug}`}>{recent.attributes.title}</Link>
          </h3>
        </div>
      ))}
    </>
  );
}

export default MostPopular;
