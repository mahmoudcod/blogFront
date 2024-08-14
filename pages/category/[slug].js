import React, { useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import Layout from '../../src/component/layout';
import Header from '../../src/component/header';
import Footer from '../../src/component/footer';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa6";
import { PiBankFill } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { initializeApollo } from '../../src/lip/apolloClient';

const GET_CAT_DETAILS = gql`
    query GetCatDetails($slug: String!, $limit: Int!, $start: Int!) {
        categories(filters: { slug:{eq:$slug} }) {
            data{
                id
                attributes {
                    name
                    slug
                    description
                    sub_categories{
                        data{
                            id
                            attributes{
                                subName
                                slug
                            }
                        }
                    }
                    blogs(pagination: {limit: $limit, start: $start}, sort: "createdAt:desc") {
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

export async function getServerSideProps(context) {
    const apolloClient = initializeApollo();
    const { slug } = context.params;

    const { data: categoryData } = await apolloClient.query({
        query: GET_CAT_DETAILS,
        variables: { slug, start: 0, limit: 12 },
    });

    const { data: logoData } = await apolloClient.query({
        query: GET_LOGO,
    });

    if (!categoryData.categories.data.length) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            category: categoryData.categories.data[0],
            appName: logoData.logo.data.attributes.appName,
        },
    };
}

const CatDetails = ({ category: initialCategory, appName }) => {
    const currentDataRef = useRef(null);
    const { data, fetchMore } = useQuery(GET_CAT_DETAILS, {
        variables: { slug: initialCategory.attributes.slug, start: 0, limit: 12 },
    });

    const fetchMoreData = () => {
        currentDataRef.current = data;
        fetchMore({
            variables: {
                slug: initialCategory.attributes.slug,
                start: data.categories.data[0].attributes.blogs.data.length,
                limit: 12,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || fetchMoreResult.categories.data[0].attributes.blogs.data.length === 0) {
                    return prev;
                }
                let newBlogs = fetchMoreResult.categories.data[0].attributes.blogs.data;
                let oldBlogs = prev.categories.data[0].attributes.blogs.data;
                return {
                    categories: {
                        ...prev.categories,
                        data: [
                            {
                                ...prev.categories.data[0],
                                attributes: {
                                    ...prev.categories.data[0].attributes,
                                    blogs: {
                                        ...prev.categories.data[0].attributes.blogs,
                                        data: [...oldBlogs, ...newBlogs],
                                    },
                                },
                            },
                        ],
                    },
                };
            },
        });
    };

    const category = data ? data.categories.data[0] : initialCategory;

    const CategoryIcon = () => {
        let iconStyles = { color: "#0280CD", fontSize: "32px", marginLeft: "5px" };
        switch (category.attributes.name) {
            case ' صناع المال':
                return <RiMoneyDollarCircleLine style={iconStyles} />;
            case 'ادارة الوقت':
                return <CgProfile style={iconStyles} />;
            case 'افكار المشاريع':
                return <FaBuilding style={iconStyles} />;
            case 'البنوك':
                return <PiBankFill style={iconStyles} />;
            case 'الربح من الانترنت':
                return <IoCartOutline style={iconStyles} />;
            case 'دليل المصانع والشركات':
                return <CgProfile style={iconStyles} />;
            default:
                return null;
        }
    };

    const pageTitle = `${category.attributes.name} - ${appName}`;
    const pageDescription = category.attributes.description;
    const pageImage = category.attributes.blogs.data[0]?.attributes.cover.data.attributes.url || '/default-image.jpg';

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
                        <CategoryIcon />
                        <h2>{category.attributes.name}</h2>
                    </div>
                    <p className='cat-disc'>{category.attributes.description}</p>
                    <div className='cat-links'>
                        {category.attributes.sub_categories.data.map(sub => (
                            <Link href={`/category/${category.attributes.slug}/${sub.attributes.slug}`} key={sub.id}>{sub.attributes.subName}</Link>
                        ))}
                    </div>
                </div>

                <div className='other-blogs'>
                    <InfiniteScroll
                        dataLength={category.attributes.blogs.data.length}
                        next={fetchMoreData}
                        hasMore={true}
                        loader={<h4></h4>}
                    >
                        {category.attributes.blogs.data.map(blog => (
                            <div key={blog.id} className='other-blog-card'>
                                <Link href={`/${blog.attributes.slug}`}>
                                    <img loading='lazy' src={blog.attributes.cover.data.attributes.url} alt={blog.attributes.title} />
                                </Link>
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

export default CatDetails;
