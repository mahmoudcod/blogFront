

import '../style/catThree.css'
import { IoCartOutline } from "react-icons/io5";
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const getCatThree = gql`
query GetCat {
  category(id: 7) {
    data {
      id
      attributes {
        blogs {
          data {
            id
            attributes {
                 publishedAt
                        blog
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

let iconStyles = { color: "#0280CD", fontSize: "1.8rem", marginLeft: "20px" };

function CatThree() {
  const { loading, error, data } = useQuery(getCatThree);

  if (loading) return null;
  if (error) return <p>Error....</p>;

  const cat = data.category.data.attributes.blogs.data.slice(0, 4);

  return (
    <>
      <div className='container'>
        <div className='CatTitle'>
          <div className='title'>
            <IoCartOutline style={iconStyles} />
            <h3>التجارة الاكترونية</h3>
          </div>
          <Link to="category/7"> <p>اقراء المزيد</p></Link>

        </div>
        <div className='catThreeCards'>
          {cat.map((blog) => {
            const publishedDate = new Date(blog.attributes.publishedAt).toISOString().split('T')[0];

            return (
              <div key={blog.id} className='catThreeCardLeft'>
                {blog.attributes.cover && blog.attributes.cover.data && (
                  <img src={`${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                )}                <div className='content'>
                  <small className='date'>{publishedDate}</small>
                  <Link to={`/details/${blog.id}`} ><p className='title'>{blog.attributes.title}</p></Link>
                  <p className='body'>{blog.attributes.blog}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CatThree;

