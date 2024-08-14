import React from 'react';
import { FaBuilding } from "react-icons/fa6";
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client'
let iconStyles = { color: "#0280CD", fontSize: "32px", marginLeft: "5px" };
const getCatOne = gql`
       query GetCat {
 category(id:6){
        data{
            id
            attributes{
              slug
                blogs{
                  data{
                    id
                    attributes{
                      title
                      slug
                      cover{
                        data{
                          attributes{
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
 `

function CatOne() {
  const { loading, error, data } = useQuery(getCatOne);

  if (loading) return null
  if (error) return <p>error...</p>

  const projects = data.category.data.attributes.blogs.data.slice(0, 6);
  const slug = data.category.data.attributes.slug;

  return (
    <>
      <div className='container'>
        <div className='CatTitle'>
          <div className="title">
            <FaBuilding style={iconStyles} />
            <Link href={`/category/${slug}`}>    <h3>افكار المشاريع</h3></Link>
          </div>
          <Link href={`/category/${slug}`}><p>اقرأ المزيد</p></Link>
        </div>
        <div className='catOneCards'>
          {projects.map((project) => (
            <div className='catOneCard' key={project.id}>

              {project.attributes.cover && project.attributes.cover.data && (
                <Link href={`/${project.attributes.slug}`}>
                  <img loading='lazy' src={`${project.attributes.cover.data.attributes.url}`} alt='Gamer' />
                </Link>
              )}
              <Link href={`/${project.attributes.slug}`}>  <h3 className="title">{project.attributes.title}</h3></Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CatOne;