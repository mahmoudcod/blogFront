import { useState, useRef } from 'react';
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from 'react-router-dom';
import Header from '../component/header';
import Footer from '../component/footer';
import '../style/search.css';
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet, HelmetProvider } from "react-helmet-async";


const TagsBlog = gql`
    query getTags($slug: String!, $limit: Int!, $start: Int!) {
        tags(filters: {slug: {eq: $slug}}) {
            data {
                id
                attributes {
                    name
                    slug
                    posts(pagination: {limit: $limit, start: $start}, sort: "createdAt:desc") {
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
    const { slug } = useParams();
    const { loading, error, data, fetchMore } = useQuery(TagsBlog, {
        variables: { slug, limit: 4, start: 0 },
    });
    const tags = data?.tags?.data && data.tags.data[0];
    const [hasMore, setHasMore] = useState(true);

    const currentDataRef = useRef(null);

    const loadMore = () => {
        if (!tags) {
            return;
        }
        currentDataRef.current = data;
        fetchMore({
            variables: {
                start: tags.attributes.posts.data.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                let newPosts = fetchMoreResult.tags.data[0].attributes.posts.data;
                let oldPosts = prev.tags && prev.tags.data && prev.tags.data[0] && prev.tags.data[0].attributes && prev.tags.data[0].attributes.posts && prev.tags.data[0].attributes.posts.data ? prev.tags.data[0].attributes.posts.data : (currentDataRef.current && currentDataRef.current.tags ? currentDataRef.current.tags.data[0].attributes.posts.data : []);
                if (newPosts.length < 4) {
                    setHasMore(false);
                }
                return {
                    tags: {
                        ...fetchMoreResult.tags,
                        data: [
                            {
                                ...fetchMoreResult.tags.data[0],
                                attributes: {
                                    ...fetchMoreResult?.tags?.data[0]?.attributes,
                                    posts: {
                                        ...fetchMoreResult?.tags?.data[0]?.attributes?.posts,
                                        data: [
                                            ...oldPosts,
                                            ...newPosts,
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                };
            },
        });
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{tags?.attributes?.name}</title>
                    <meta name="description" content={tags?.attributes?.name} />
                </Helmet>
                <Header />
                <div className='container'>

                    <h3 className='search-title'>دليله : {tags?.attributes?.name}  </h3>
                    <InfiniteScroll
                        dataLength={tags ? tags.attributes.posts.data.length : 0}
                        next={loadMore}
                        hasMore={hasMore}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b></b>
                            </p>
                        }
                    >
                        <div className='search-cards'>
                            {loading && null}
                            {error && <p>Error....</p>}
                            {data && data.tags.data.length === 0 && (
                                <p>لا توجد نتائج عن "{tags?.attributes?.name}"</p>
                            )}
                            {tags && tags.attributes.posts.data.map((recent) => (
                                <div key={recent.id} className='recentCard'>
                                    {recent.attributes.cover && recent.attributes.cover.data && (
                                        <Link to={`/${recent.attributes.slug}`}>
                                            <img src={recent.attributes.cover.data.attributes.url} alt={recent.attributes.title} />
                                        </Link>
                                    )}
                                    <div className='content'>
                                        <Link to={`/${recent.attributes.slug}`}>
                                            <h3 className='title'>{recent.attributes.title}</h3>
                                            <p className='dis'>{`${recent?.attributes?.description?.slice(0, 100) ?? ""}`}</p>
                                        </Link>
                                        <Link to={`/category/${recent.attributes.categories.data[0].attributes.slug}`}>
                                            <small className='cat-name'>{recent.attributes.categories.data[0].attributes.name}</small>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
                <Footer />
            </HelmetProvider>
        </>
    );
}

export default Tags;
