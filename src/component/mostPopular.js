import { useQuery, gql } from "@apollo/client";
import Link from 'next/link';
import React from 'react';
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
      <h3 className="title-main">الأكثر قراءة</h3>
      {blogs.map((recent) => (
        <div key={recent.id} className='mostPopular'>
          <Link href={`/category/${recent.attributes.categories.data[0].attributes.slug}`}>
            <small className="cat-details">{recent.attributes.categories.data[0].attributes.name}</small>
          </Link>
          <h3 className="padd bor title">
            <Link href={`/${recent.attributes.slug}`}>{recent.attributes.title}</Link>
          </h3>
        </div>
      ))}
    </>
  );
}

export default MostPopular;
