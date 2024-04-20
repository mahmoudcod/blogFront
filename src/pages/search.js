import { useState, useRef } from 'react';
import { useLazyQuery, gql } from "@apollo/client";
import { Link, useParams } from 'react-router-dom';
import Header from '../component/header';
import Footer from '../component/footer';
import '../style/search.css';
import { Helmet, HelmetProvider } from "react-helmet-async";
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';


const SEARCH_BLOGS = gql`
    query SearchBlogs($searchQ: String!, $start: Int!, $limit: Int!) {
        blogs(filters: { title:{containsi:$searchQ } },pagination: {start: $start, limit: $limit}) {
            data {
                id
                attributes{
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
`;


const Search = () => {
    const { searchQ } = useParams();
    const [searchBlogs, { loading, error, data, fetchMore }] = useLazyQuery(SEARCH_BLOGS, {
        variables: { searchQ, start: 0, limit: 12 },
    });
    const [hasMore, setHasMore] = useState(true);

    const currentDataRef = useRef(null);

    const loadMore = () => {
        currentDataRef.current = data;
        fetchMore({
            variables: {
                start: data.blogs.data.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                let newBlogs = fetchMoreResult.blogs.data;
                let oldBlogs = prev.blogs && prev.blogs.data ? prev.blogs.data : (currentDataRef.current && currentDataRef.current.blogs ? currentDataRef.current.blogs.data : []);
                if (newBlogs.length < 4) {
                    setHasMore(false);
                }
                return {
                    blogs: {
                        ...fetchMoreResult.blogs,
                        data: [
                            ...oldBlogs,
                            ...newBlogs,
                        ],
                    },
                };
            },
        });
    };
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
                    <div className='other-blogs'>
                        <InfiniteScroll
                            dataLength={data ? data.blogs.data.length : 0}
                            next={loadMore}
                            hasMore={hasMore}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b></b>
                                </p>
                            }
                        >


                            {loading && null}
                            {error && <p>Error....</p>}
                            {data && data.blogs.data.length === 0 && (
                                <p>لا توجد نتائج عن "{searchQ}"</p>
                            )}
                            {data && data.blogs.data.map((recent) => (
                                <div key={recent.id} className='other-blog-card'>
                                    <div className='blog-img'>
                                        {recent.attributes.cover && recent.attributes.cover.data && (
                                            <Link to={`/${recent.attributes.slug}`}>
                                                <img loading='lazy' src={`${recent.attributes.cover.data.attributes.url}`} alt='Gamer' />
                                            </Link>
                                        )}
                                    </div>

                                    <div className='blog-content'>
                                        <Link to={`/${recent.attributes.slug}`}>
                                            <h3 className='title'>{recent.attributes.title}</h3>
                                        </Link>
                                    </div>
                                </div>
                            ))}

                        </InfiniteScroll>
                    </div>

                </div>
                <Footer />
            </HelmetProvider>
        </>
    );
}

export default Search;
