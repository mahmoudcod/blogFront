import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from 'react-router-dom';
import Header from '../component/header';
import Footer from '../component/footer';
import '../style/search.css';
import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";


const TagsBlog = gql`
    query getTags($id: ID!) {
        tag(id: $id) {
            data {
                id
                attributes {
                    name
                    posts{
                        data{
                            id
                            attributes {
                                title
                                slug
                                description
                                categories {
                                    data {
                                        attributes {
                                            name
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
            }
        }
    }
`;


const Tags = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(TagsBlog, {
        variables: { id },
    });
    const tags = data?.tag?.data

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{tags?.attributes?.name}</title>
                    <meta name="description" content={tags?.attributes?.name} />
                </Helmet>
                <Header />
                <div className='container'>

                    <h3 className='search-title'> {tags?.attributes?.name}  </h3>

                    <div className='search-cards'>
                        {loading && null}
                        {error && <p>Error....</p>}
                        {data && data.tag.data.length === 0 && (
                            <p>لا توجد نتائج عن "{tags?.attributes?.name}"</p>
                        )}
                        {tags && tags.attributes.posts.data.map((recent) => (
                            <div key={recent.id} className='recentCard'>
                                {recent.attributes.cover && recent.attributes.cover.data && (
                                    <img src={recent.attributes.cover.data.attributes.url} alt={recent.attributes.title} />
                                )}
                                <div className='content'>
                                    <Link to={`/details/${recent.attributes.slug}`}>
                                        <h3 className='title'>{recent.attributes.title}</h3>
                                        <p className='dis'>{`${recent?.attributes?.description?.slice(0, 100) ?? ""}`}</p>
                                    </Link>
                                    <small className='cat-name'>{recent.attributes.categories.data[0].attributes.name}</small>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <Footer />
            </HelmetProvider>
        </>
    );
}

export default Tags;
