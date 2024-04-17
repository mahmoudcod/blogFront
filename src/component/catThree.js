

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

let iconStyles = { color: "#0280CD", fontSize: "32px", marginLeft: "5px" }; function CatThree() {
  const { loading, error, data } = useQuery(getCatThree);

  if (loading) return null;
  if (error) return <p>Error....</p>;

  const cat = data.category.data.attributes.blogs.data.slice(0, 4);
  const slug = data.category.data.attributes.slug;

  return (
    <>
      <div className='container'>
        <div className='CatTitle'>
          <div className='title'>
            <IoCartOutline style={iconStyles} />
            <Link to={`/category/${slug}`}>    <h3>التجارة الاكترونية</h3></Link>
          </div>
          <Link to={`/category/${slug}`}> <p>اقراء المزيد</p></Link>

        </div>
        <div className='catThreeCards'>
          {cat.map((blog) => {

            return (
              <div key={blog.id} className='catThreeCardLeft'>
                {blog.attributes.cover && blog.attributes.cover.data && (
                  <Link to={`/${blog.attributes.slug}`} >
                    <img loading='lazy' src={`${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                  </Link>

                )}                <div className='content'>
                  <Link to={`/${blog.attributes.slug}`} ><h3 className='title'>{blog.attributes.title}</h3></Link>
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

