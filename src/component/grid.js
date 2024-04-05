
import Slider from 'react-slick';
import '../style/grid.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const gridQuery = gql`
  query GetGrid {
    blogs {
      data {
        id
     attributes {
          title
          slug
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
`;

function Grid() {
  const isSmallScreen = window.innerWidth <= 768;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const { loading, error, data } = useQuery(gridQuery);

  if (loading) return null;
  if (error) return <p>Error: {error.message}</p>;

  const blogs = data.blogs.data.slice(0, 4);

  return (
    <div className='container'>
      {isSmallScreen ? (
        <Slider {...settings}>
          {blogs.map((blog) => (
            <div key={blog.id} className="card content">
              <div className="card-content">
                <div className="card-img">
                  <Link to={`/details/${blog.attributes.slug}`}>
                    {blog.attributes.cover && blog.attributes.cover.data && (
                      <img fetchpriority="high" src={`${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                    )}
                  </Link>
                </div>
                <Link to={`/details/${blog.attributes.slug}`}>
                  <h3 className="card-title">{blog.attributes.title}</h3>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className='cards'>
          {blogs.map((blog) => (
            <div key={blog.id} className="card content">
              <div className="card-content">
                <div className="card-img">
                  <Link to={`/details/${blog.attributes.slug}`}>
                    {blog.attributes.cover && blog.attributes.cover.data && (
                      <img fetchpriority="high" src={`${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                    )}
                  </Link>               </div>
                <Link to={`/details/${blog.attributes.slug}`}>
                  <h3 className="card-title">{blog.attributes.title}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Grid;
