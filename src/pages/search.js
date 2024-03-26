import React from 'react';
import { useLazyQuery, gql } from "@apollo/client";
import { Link, useParams } from 'react-router-dom';
import Header from '../component/header';
import Footer from '../component/footer';

const SEARCH_BLOGS = gql`
    query SearchBlogs($searchQ: String!) {
        blogs(filters: { title:{containsi:$searchQ } }) {
            data {
                id
                attributes {
                    title
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
`;


const Search = () => {
    const { searchQ } = useParams();
    const [searchBlogs, { loading, error, data }] = useLazyQuery(SEARCH_BLOGS, {
        variables: { searchQ },
    });

    React.useEffect(() => {
        searchBlogs();
    }, [searchBlogs]);

    return (
        <>
            <Header />
            <div className='container'>

                <h3 className='search-title'> نتيجة بحث "{searchQ}"</h3>
                <div className='recentCards'>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error....</p>}
                    {data && data.blogs.data.length === 0 && (
                        <p>لا توجد نتائج عن "{searchQ}"</p>
                    )}
                    {data && data.blogs.data.map((recent) => (
                        <div key={recent.id} className='recentCard'>
                            {recent.attributes.cover && recent.attributes.cover.data && (
                                <img loading='lazy' src={`${recent.attributes.cover.data.attributes.url}`} alt='Gamer' />
                            )}
                            <div className='content'>
                                <Link to={`/details/${recent.id}`}>
                                    <h3 className='title'>{recent.attributes.title}</h3>
                                </Link>
                                <small>{recent.attributes.categories.data[0].attributes.name}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Search;
