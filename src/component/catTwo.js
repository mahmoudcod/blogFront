
import Slider from 'react-slick';
import { PiBankFill } from "react-icons/pi";
import '../style/catTwo.css'
import {useQuery,gql} from '@apollo/client'

 let iconStyles = { color: "#0280CD", fontSize: "1.8rem" , marginLeft:"20px"};

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const projects = data.category.data.attributes.blogs.data.slice(0,8);

  const isSmallScreen = window.innerWidth <= 768;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      <div className='container'>
        <div className='CatTitle'>
          <div className='title'>
            <PiBankFill style={iconStyles} />
            <h3>الاقتصاد</h3>
          </div>
          <p>اقراء المزيد</p>
        </div>
        {isSmallScreen ? (
          <Slider {...settings}>
                      <div className='catTwoCards'>

            {projects.map((project) => (
              <div className='catTwoCard' key={project.id}>
                 {project.attributes.cover && project.attributes.cover.data && (
                <img src={`http://localhost:1337${project.attributes.cover.data.attributes.url}`} alt='Gamer' />
                )}
               <p>{project.attributes.title}</p>
              </div>
            ))}
                      </div >

          </Slider>
        ) : (
          <div className='catTwoCards'>
            {projects.map((project) => (
              <div className='catTwoCard' key={project.id}>
                {project.attributes.cover && project.attributes.cover.data && (
                <img src={`http://localhost:1337${project.attributes.cover.data.attributes.url}`} alt='Gamer' />
                )}
               <p>{project.attributes.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CatTwo;