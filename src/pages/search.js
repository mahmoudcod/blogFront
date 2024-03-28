import { useLazyQuery, gql } from "@apollo/client";
import { Link, useParams } from 'react-router-dom';
import Header from '../component/header';
import Footer from '../component/footer';
import '../style/search.css';
import { Helmet, HelmetProvider } from "react-helmet-async";
import React from 'react';


const SEARCH_BLOGS = gql`
    query SearchBlogs($searchQ: String!) {
        blogs(filters: { title:{containsi:$searchQ } }) {
            data {
                id
                attributes {
                    title
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
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>نتيجة البحث  {searchQ}</title>
                    <meta name="description" content={`Search results for ${searchQ}`} />
                    <meta property="og:title" content="Search Results" />
                    <meta property="og:description" content={`Search results for ${searchQ}`} />
                    <meta property="og:type" content="website" />
                </Helmet>

                <Header />
                <div className='container'>

                    <h3 className='search-title'> نتيجة بحث "{searchQ}"</h3>

                    <div className='search-cards'>
                        {loading && null}
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

export default Search;
