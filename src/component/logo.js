import { useQuery, gql } from '@apollo/client';

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
      <img  src={`${logo}`} alt="logo" />
    </div>
  );
}

export default Logo;
