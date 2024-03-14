import Slider from 'react-slick';
import '../style/grid.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery, gql } from '@apollo/client';

const gridQuery = gql`
  query GetGrid {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const blogs = data.blogs.data.slice(0,4);

  return (
    <div className='container'>
      {isSmallScreen ? (
        <Slider {...settings}>
          {blogs.map((blog) => (
            <div key={blog.id} className="card content">
              <div className="card-content">
                <div className="card-img">
   {blog.attributes.cover && blog.attributes.cover.data && (
                <img src={`${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                )}                   </div>
                <div className="card-title">{blog.attributes.title}</div>
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
      {blog.attributes.cover && blog.attributes.cover.data && (
                <img src={`${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                )}                </div>
                <div className="card-title">{blog.attributes.title}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Grid;
