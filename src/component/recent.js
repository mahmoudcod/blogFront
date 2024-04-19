
import '../style/recent.css';
import { useQuery, gql } from '@apollo/client';
import { IoNewspaperOutline } from "react-icons/io5";
import { Link, } from 'react-router-dom';

const recentQuery = gql`
  query GetBlogs {
    blogs(sort: "publishedAt:desc") {
      data {
        id
        attributes {
          title
          slug
          blog
          description
          categories{
            data{
                attributes{
                    name
                    slug
                }
            }
          }
          publishedAt
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

const iconStyles = { color: "#0280CD", fontSize: "1.8rem", marginLeft: "5px" };

function Recent() {
  const { loading, error, data } = useQuery(recentQuery);


  if (loading) return null
  if (error) return <p>Error....</p>;

  const blogs = data.blogs.data.slice(0, 6);

  return (
    <div className='container'>
      <div className='CatTitle'>
        <div className='title'>
          <IoNewspaperOutline style={iconStyles} />
          <h3>احدث الاخبار</h3>
        </div>
      </div>
      <div className='recentCards'>
        {blogs.map((recent) => (
          <div key={recent.id} className='recentCard'>
            {recent.attributes.cover && recent.attributes.cover.data && (
              <Link to={`/${recent.attributes.slug}`}>
                <img loading='lazy' src={`${recent.attributes.cover.data.attributes.url}`} alt='Gamer' />
              </Link>
            )}
            <div className='content'>
              <Link to={`/${recent.attributes.slug}`}>
                <h3 className='title'>{recent.attributes.title}</h3>
              </Link>

              <p className='body'>{recent.attributes.blog.slice(0, 100)}...</p>
              {recent.attributes.categories && (
                recent.attributes.categories.data.length > 0 &&
                <Link to={`/category/${recent.attributes.categories.data[0].attributes.slug}`}>
                  <h4 className='cat'>{recent.attributes.categories.data[0].attributes.name}</h4>
                </Link>
              )}


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recent;
