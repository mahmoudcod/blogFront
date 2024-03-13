
import { FaBuilding } from "react-icons/fa6";
import '../style/catOne.css'
import {useQuery,gql} from '@apollo/client'
 let iconStyles = { color: "#0280CD", fontSize: "1.8rem" , marginLeft:"20px"};

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const projects = data.category.data.attributes.blogs.data;

  return (
    <>
      <div className='container'>
        <div className='CatTitle'>
          <div className="title">
            <FaBuilding style={iconStyles} />
            <h3>افكار المشاريع</h3>
          </div>
          <p>اقراء المزيد</p>
        </div>
        <div className='catOneCards'>
          {projects.map((project) => (
            <div className='catOneCard' key={project.id}>
             
                 {project.attributes.cover && project.attributes.cover.data && (
                <img src={`https://demoblog-h71e.onrender.com${project.attributes.cover.data.attributes.url}`} alt='Gamer' />
                )}
               <p>{project.attributes.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CatOne;