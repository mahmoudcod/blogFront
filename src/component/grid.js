import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize(); // Call initially to set the correct value

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  const goToLink = (slug) => {
    window.location.href = `/${slug}`;
  };

  return (
    <div className='container'>
      {isSmallScreen ? (
        <Slider {...settings}>
          {blogs.map((blog) => (
            <div key={blog.id} className="card content" onClick={() => goToLink(blog.attributes.slug)}>
              <div className="card-content">
                <div className="card-img">
                  {blog.attributes.cover && blog.attributes.cover.data && (
                    <img fetchpriority="high" src={`${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                  )}
                </div>
                <h3 className="card-title">{blog.attributes.title}</h3>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className='cards'>
          {blogs.map((blog) => (
            <div key={blog.id} className="card content" onClick={() => goToLink(blog.attributes.slug)}>
              <div className="card-content">
                <div className="card-img">
                  {blog.attributes.cover && blog.attributes.cover.data && (
                    <img fetchpriority="high" src={`${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                  )}
                </div>
                <h3 className="card-title">{blog.attributes.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Grid;
