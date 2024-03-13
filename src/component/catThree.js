

import '../style/catThree.css'
import { IoCartOutline } from "react-icons/io5";
 import { useQuery, gql } from '@apollo/client';

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

 let iconStyles = { color: "#0280CD", fontSize: "1.8rem" , marginLeft:"20px"};

function CatThree() {
  const { loading, error, data } = useQuery(getCatThree);

  if (loading) return <p>Loading...</p>;
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
          <p>اقراء المزيد</p>
        </div>
        <div className='catThreeCards'>
          {cat.map((blog) => {
            const publishedDate = new Date(blog.attributes.publishedAt).toISOString().split('T')[0];

            return (
              <div key={blog.id} className='catThreeCardLeft'>
 {blog.attributes.cover && blog.attributes.cover.data && (
                <img src={`https://demoblog-h71e.onrender.com${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                )}                <div className='content'>
                  <small className='date'>{publishedDate}</small>
                  <p className='title'>{blog.attributes.title}</p>
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

