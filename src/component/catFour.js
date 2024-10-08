import React from 'react';
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
const getCatFour = gql`
query GetCat {
  category(id: 4) {
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

let iconStyles = { color: "#0280CD", fontSize: "1.8rem", marginLeft: "5px" };
function CatFour() {
  const { loading, error, data } = useQuery(getCatFour);

  if (loading) return null
  if (error) return <p>Error....</p>;

  const cat = data.category.data.attributes.blogs.data.slice(0, 8);
  const slug = data.category.data.attributes.slug;

  return (
    <>
      <div className="container">
        <div className="CatTitle">
          <div className="title">
            <RiMoneyDollarCircleLine style={iconStyles} />
            <Link href={`/category/${slug}`}>  <h3> صناع المال</h3></Link>
          </div>
          <Link href={`/category/${slug}`}><p>اقرأ المزيد</p> </Link>
        </div>
        <div className="catFourCards">
          {cat.map((blog) => {

            return (
              <div key={blog.id} className='catFourCard'>

                {blog.attributes.cover && blog.attributes.cover.data && (
                  <Link href={`/${blog.attributes.slug}`}>
                    <img loading='lazy' src={`${blog.attributes.cover.data.attributes.url}`} alt='Gamer' />
                  </Link>

                )}                <div className='content'>
                  <Link href={`/${blog.attributes.slug}`}><h3 className='title'>{blog.attributes.title}</h3></Link>
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
