import React from 'react';
import { PiBankFill } from "react-icons/pi";
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link';

let iconStyles = { color: "#0280CD", fontSize: "32px", marginLeft: "5px" }; const getCatTwo = gql`
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

function CatTwo() {
  const { loading, error, data } = useQuery(getCatTwo);

  if (loading) return null;
  if (error) return <p>Error: {error.message}</p>;

  const projects = data.category.data.attributes.blogs.data.slice(0, 10);


  return (
    <>
      <div className='container'>
        <div className='CatTitle'>
          <div className='title'>
            <PiBankFill style={iconStyles} />
            <Link href={`/category/${data.category.data.attributes.slug}`}>   <h3>الاقتصاد</h3></Link>
          </div>
          <Link href={`/category/${data.category.data.attributes.slug}`}>  <p>اقراء المزيد</p> </Link>
        </div>
        <div className='catTwoCards'>
          {projects.map((project) => (
            <div className='catTwoCard' key={project.id}>
              <div className='cardTwo-img'>
                {project.attributes.cover && project.attributes.cover.data && (
                  <Link href={`/${project.attributes.slug}`}>
                    <img loading='lazy' src={`${project.attributes.cover.data.attributes.url}`} alt='Gamer' />
                  </Link>
                )}
              </div>
              <div className='cardTwo-title'>
                <Link href={`/${project.attributes.slug}`}> <h3 className="title">{project.attributes.title}</h3> </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CatTwo;