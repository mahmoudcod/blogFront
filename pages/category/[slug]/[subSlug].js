import React, { useState, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import Layout from '../../../src/component/layout';
import Header from '../../../src/component/header';
import Footer from '../../../src/component/footer';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { initializeApollo } from '../../../src/lip/apolloClient';

const GET_CAT_DETAILS = gql`
    query GetCatDetails($subSlug: String!, $limit: Int!, $start: Int!) {
        subCategories(filters: {slug:{eq:$subSlug}}) {
             data{
                id
                attributes {
                    subName
                    slug
                    description
                    category{
                        data{
                            id
                            attributes{
                                name
                                slug
                                sub_categories{
                                    data{
                                        id
                                        attributes{
                                            subName
                                            slug
                                        }
                                    }
                                }
                            }
                        }
                    }
                    posts(pagination: {limit: $limit, start: $start}, sort: "createdAt:desc") {
                        data{
                            id
                            attributes{
                                title
                                blog
                                slug
                                createdAt
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
`;

export async function getServerSideProps(context) {
    const apolloClient = initializeApollo();
    const { subSlug } = context.params;

    const { data } = await apolloClient.query({
        query: GET_CAT_DETAILS,
        variables: { subSlug, limit: 12, start: 0 },
    });

    if (!data.subCategories.data.length) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            subCategory: data.subCategories.data[0],
        },
    };
}

const SupCatDetails = ({ subCategory: initialSubCategory }) => {
    const [hasMore, setHasMore] = useState(true);
    const { data, fetchMore } = useQuery(GET_CAT_DETAILS, {
        variables: { subSlug: initialSubCategory.attributes.slug, limit: 12, start: 0 },
    });

    const fetchMoreData = () => {
        fetchMore({
            variables: {
                subSlug: initialSubCategory.attributes.slug,
                start: data.subCategories.data[0].attributes.posts.data.length,
                limit: 12,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || fetchMoreResult.subCategories.data[0].attributes.posts.data.length === 0) {
                    setHasMore(false);
                    return prev;
                }
                const newPosts = fetchMoreResult.subCategories.data[0].attributes.posts.data;
                return {
                    subCategories: {
                        ...prev.subCategories,
                        data: [
                            {
                                ...prev.subCategories.data[0],
                                attributes: {
                                    ...prev.subCategories.data[0].attributes,
                                    posts: {
                                        ...prev.subCategories.data[0].attributes.posts,
                                        data: [
                                            ...prev.subCategories.data[0].attributes.posts.data,
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

    const subCategory = data ? data.subCategories.data[0] : initialSubCategory;

    const pageTitle = `${subCategory.attributes.subName}`;
    const pageDescription = subCategory.attributes.description;
    const pageImage = subCategory.attributes.posts.data[0]?.attributes.cover.data.attributes.url;

    return (
        <Layout
            title={pageTitle}
            description={pageDescription}
            image={pageImage}
        >
            <Header />
            <div className='container'>
                <div className='cat-details'>
                    <div className='catTitle-details'>
                        <h2>{subCategory.attributes.subName}</h2>
                    </div>
                    <p className='cat-disc'>{subCategory.attributes.description}</p>
                    <div className='cat-links'>
                        {subCategory.attributes.category.data.attributes.sub_categories.data.map(sub => (
                            <Link href={`/category/${subCategory.attributes.category.data.attributes.slug}/${sub.attributes.slug}`} key={sub.id} className={`/category/${subCategory.attributes.category.data.attributes.slug}/${sub.attributes.slug}` === `/category/${subCategory.attributes.category.data.attributes.slug}/${subCategory.attributes.slug}` ? 'active' : ''}>{sub.attributes.subName}</Link>
                        ))}
                    </div>
                </div>
                <div className='other-blogs'>
                    <InfiniteScroll
                        dataLength={subCategory.attributes.posts.data.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4></h4>}
                    >
                        {subCategory.attributes.posts.data.map(blog => (
                            <div key={blog.id} className='other-blog-card'>
                                <div className='blog-img'>
                                    <Link href={`/${blog.attributes.slug}`}>
                                        <img loading='lazy' src={blog.attributes.cover.data.attributes.url} alt={blog.attributes.title} />
                                    </Link>
                                </div>
                                <div className='blog-content'>
                                    <Link href={`/${blog.attributes.slug}`}><h3 className='title'>{blog.attributes.title}</h3></Link>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default SupCatDetails;