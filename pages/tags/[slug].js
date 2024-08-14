import React, { useState, useRef } from 'react';
import { gql, useQuery } from "@apollo/client";
import Link from 'next/link';
import Header from '../../src/component/header';
import Footer from '../../src/component/footer';
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from 'next/router';
import Layout from '../../src/component/layout';

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

const Tags = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { loading: tagsLoading, error: tagsError, data: tagsData, fetchMore } = useQuery(TagsBlog, {
        variables: { slug, limit: 12, start: 0 },
    });
    const { loading: logoLoading, error: logoError, data: logoData } = useQuery(GET_LOGO);

    const tags = tagsData?.tags?.data && tagsData.tags.data[0];
    const [hasMore, setHasMore] = useState(true);

    const currentDataRef = useRef(null);

    const loadMore = () => {
        if (!tags) return;

        currentDataRef.current = tagsData;
        fetchMore({
            variables: {
                start: tags.attributes.posts.data.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                let newPosts = fetchMoreResult.tags.data[0].attributes.posts.data;
                let oldPosts = prev.tags?.data[0]?.attributes?.posts?.data || currentDataRef.current.tags.data[0].attributes.posts.data;

                if (newPosts.length < 4) setHasMore(false);

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

    if (tagsLoading || logoLoading) return <p></p>;
    if (tagsError) return <p>خطأ: {tagsError.message}</p>;
    if (logoError) return <p>خطأ: {logoError.message}</p>;

    const appName = logoData.logo.data.attributes.appName;
    const title = `كلمة دليليه: ${tags?.attributes?.name} - ${appName}`;
    const description = `استكشف المقالات المتعلقة ب"${tags?.attributes?.name}" في ${appName}.`;
    const image = 'https://res.cloudinary.com/datnay9zk/image/upload/v1710429087/Untitled_0ca8759c27.png';

    return (
        <Layout
            title={title}
            description={description}
            image={image}
        >
            <Header />
            <div className='container'>
                <h3 className='search-title'>كلمة دليليه: {tags?.attributes?.name}</h3>
                <div className='other-blogs'>
                    <InfiniteScroll
                        dataLength={tags ? tags.attributes.posts.data.length : 0}
                        next={loadMore}
                        hasMore={hasMore}
                        endMessage={<p style={{ textAlign: 'center' }}><b>لا مزيد من النتائج</b></p>}
                    >
                        {tagsLoading && null}
                        {tagsError && <p>Error....</p>}
                        {tagsData && tagsData.tags.data.length === 0 && (
                            <p>لا توجد نتائج عن "{tags?.attributes?.name}"</p>
                        )}
                        {tags && tags.attributes.posts.data.map((recent) => (
                            <div key={recent.id} className='other-blog-card'>
                                <div className='blog-img'>
                                    {recent.attributes.cover && recent.attributes.cover.data && (
                                        <Link href={`/${recent.attributes.slug}`}>
                                            <img src={recent.attributes.cover.data.attributes.url} alt={recent.attributes.title} />
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

export default Tags;
