import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
const logoQuery = gql`
  query GetLogo {
    logo {
      data {
        id
        attributes {
          logo {
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

function Logo() {
  const { loading, error, data } = useQuery(logoQuery);

  if (loading) return null;
  if (error) return <p>Error ....</p>;

  const logo = data.logo.data.attributes.logo.data.attributes.url;

  return (
    <div className="logo">
      <Link href='/'><img loading='lazy' src={`${logo}`} alt="logo" /> </Link>
    </div>
  );
}

export default Logo;
