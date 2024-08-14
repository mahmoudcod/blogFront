import React, { useState, useRef } from 'react';
import { useLazyQuery, useQuery, gql } from "@apollo/client";
import Link from 'next/link';
import Header from '../../src/component/header';
import Footer from '../../src/component/footer';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';
import Layout from '../../src/component/layout';

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

const GET_LOGO = gql`
    query getLogo {
        logo {
            data {
                id
                attributes {
                    appName
                }
            }
        }
    }
`;

const Search = () => {
    const router = useRouter(); // Get router object from useRouter
    const { searchQ } = router.query; // Access query parameters
    const { data: logoData } = useQuery(GET_LOGO); // Fetch appName
    const appName = logoData?.logo?.data?.attributes?.appName || 'AppName'; // Fallback to a default name
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

    const pageTitle = searchQ ? `Search results for "${searchQ}" - ${appName}` : `Search - ${appName}`;
    const pageDescription = `Search results for "${searchQ}" on ${appName}. Discover blogs, articles, and more related to your query.`;

    return (
        <Layout
            title={pageTitle}
            description={pageDescription}
        >
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
                                        <Link href={`/${recent.attributes.slug}`}>
                                            <img loading='lazy' src={`${recent.attributes.cover.data.attributes.url}`} alt='Gamer' />
                                        </Link>
                                    )}
                                </div>
                                <div className='blog-content'>
                                    <Link href={`/${recent.attributes.slug}`}>
                                        <h3 className='title'>{recent.attributes.title}</h3>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
            <Footer />
        </Layout>
    );
}

export default Search;
