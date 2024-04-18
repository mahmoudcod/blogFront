import '../style/catThree.css';
import { IoCartOutline } from "react-icons/io5";
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const getCatThree = gql`
  query GetCat {
    category(id: 7) {
      data {
        id
        attributes {
          slug
          blogs {
            data {
              id
              attributes {
                publishedAt
                blog
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
      }
    }
  }
`;

let iconStyles = { color: "#0280CD", fontSize: "32px", marginLeft: "5px" };

function CatThree() {
  const { loading, error, data } = useQuery(getCatThree);

  if (loading) return null;
  if (error) return <p>Error....</p>;

  const blogs = data.category.data.attributes.blogs.data;
  const slug = data.category.data.attributes.slug;

  // Split blogs into left and right arrays
  const leftBlogs = blogs.slice(0, 3);
  const rightBlog = blogs.slice(3, 4); // Only one card for the right side

  return (
    <>
      <div className='container'>
        <div className='CatTitle'>
          <div className='title'>
            <IoCartOutline style={iconStyles} />
            <Link to={`/category/${slug}`}><h3>التجارة الاكترونية</h3></Link>
          </div>
          <Link to={`/category/${slug}`}><p>اقراء المزيد</p></Link>
        </div>
        <div className='catThreeCards'>
          <div className='catThreeCardRight'>
            {rightBlog.map((blog) => (
              <div key={blog.id}>
                {blog.attributes.cover && blog.attributes.cover.data && (
                  <Link to={`/${blog.attributes.slug}`} >
                    <img loading='lazy' src={`${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                  </Link>
                )}
                <div className='content'>
                  <Link to={`/${blog.attributes.slug}`}><h3 className='title'>{blog.attributes.title}</h3></Link>
                </div>
              </div>
            ))}
          </div>
          <div className='catThreeCardLeft'>
            {leftBlogs.map((blog) => (
              <div key={blog.id}>
                {blog.attributes.cover && blog.attributes.cover.data && (
                  <Link to={`/${blog.attributes.slug}`} >
                    <img loading='lazy' src={`${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                  </Link>
                )}
                <div className='content'>
                  <Link to={`/${blog.attributes.slug}`}><h3 className='title'>{blog.attributes.title}</h3></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CatThree;
