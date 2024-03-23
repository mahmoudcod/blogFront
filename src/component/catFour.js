
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import '../style/catFour.css'
import { useQuery, gql } from '@apollo/client';
const getCatFour = gql`
query GetCat {
  category(id: 4) {
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
function CatFour() {
  const { loading, error, data } = useQuery(getCatFour);

  if (loading) return null
  if (error) return <p>Error....</p>;

  const cat = data.category.data.attributes.blogs.data.slice(0, 8);

  return (
    <>
      <div className="container">
        <div className="CatTitle">
          <div className="title">
            <RiMoneyDollarCircleLine style={iconStyles} />
            <h3>اسواق المال</h3>
          </div>
          <Link to='category/4'><p>اقراء المزيد</p> </Link>
        </div>
        <div className="catFourCards">
          {cat.map((blog) => {
            const publishedDate = new Date(blog.attributes.publishedAt).toISOString().split('T')[0];

            return (
              <div key={blog.id} className='catFourCard'>
                {blog.attributes.cover && blog.attributes.cover.data && (
                  <img src={`${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                )}                <div className='content'>
                  <small className='date'>{publishedDate}</small>
                  <Link to={`details/${blog.id}`}><p className='title'>{blog.attributes.title}</p></Link>
                  <p className='body'>{blog.attributes.blog.slice(0, 100)}...</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default CatFour;
