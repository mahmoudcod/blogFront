

import { PiBankFill } from "react-icons/pi";
import '../style/catTwo.css'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom';

let iconStyles = { color: "#0280CD", fontSize: "1.8rem", marginLeft: "20px" };

const getCatTwo = gql`
query GetCat {
  category(id: 7) {
    data {
      id
      attributes {
        blogs {
          data {
            id
            attributes {
              title
              cover {
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
    }
  }
}
`;

function CatTwo() {
  const { loading, error, data } = useQuery(getCatTwo);

  if (loading) return null;
  if (error) return <p>Error: {error.message}</p>;

  const projects = data.category.data.attributes.blogs.data.slice(0, 8);


  return (
    <>
      <div className='container'>
        <div className='CatTitle'>
          <div className='title'>
            <PiBankFill style={iconStyles} />
            <h3>الاقتصاد</h3>
          </div>
          <Link to='category/6'>  <p>اقراء المزيد</p> </Link>
        </div>
        <div className='catTwoCards'>
          {projects.map((project) => (
            <div className='catTwoCard' key={project.id}>
              <div className='cardTwo-img'>
                {project.attributes.cover && project.attributes.cover.data && (
                  <img src={`${project.attributes.cover.data.attributes.url}`} alt='Gamer' />
                )}
              </div>
              <div className='cardTwo-title'>
                <Link to={`details/${project.id}`}> <p>{project.attributes.title}</p> </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CatTwo;