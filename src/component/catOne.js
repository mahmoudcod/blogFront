
import { FaBuilding } from "react-icons/fa6";
import '../style/catOne.css'
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client'
let iconStyles = { color: "#0280CD", fontSize: "1.8rem", marginLeft: "20px" };

const getCatOne = gql`
       query GetCat {
 category(id:6){
        data{
            id
            attributes{
                blogs{
                  data{
                    id
                    attributes{
                      title
                      slug
                      cover{
                        data{
                          attributes{
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
 `

function CatOne() {
  const { loading, error, data } = useQuery(getCatOne);

  if (loading) return null
  if (error) return <p>error...</p>

  const projects = data.category.data.attributes.blogs.data.slice(0, 6);

  return (
    <>
      <div className='container'>
        <div className='CatTitle'>
          <div className="title">
            <FaBuilding style={iconStyles} />
            <h3>افكار المشاريع</h3>
          </div>
          <Link to='category/5'><p>اقراء المزيد</p></Link>
        </div>
        <div className='catOneCards'>
          {projects.map((project) => (
            <div className='catOneCard' key={project.id}>

              {project.attributes.cover && project.attributes.cover.data && (
                <img loading='lazy' src={`${project.attributes.cover.data.attributes.url}`} alt='Gamer' />
              )}
              <Link to={`/details/${project.attributes.slug}`}>  <h3>{project.attributes.title}</h3></Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CatOne;