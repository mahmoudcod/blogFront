import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';

const CatQuery = gql`
  query GetCat {
    categories {
      data {
        id
        attributes {
          slug
          name
          isShow
          icon {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

function Categories() {
  const { loading, error, data } = useQuery(CatQuery);

  if (loading) return null;
  if (error) return <p>Error....</p>;

  const categories = data.categories.data.filter(category => category.attributes.isShow); // Filter categories based on isShow attribute

  return (
    <div className='categories'>
      {categories.map((category) => (
        <div key={category.id} className='category'>
          <Link href={`/category/${category.attributes.slug}`}>
            {category.attributes.icon && category.attributes.icon.data && (
              <img loading='lazy' src={`${category.attributes.icon.data.attributes.url}`} alt='Gamer' />
            )}
            <h4>{category.attributes.name}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Categories;
