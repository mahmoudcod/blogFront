import React, { useRef } from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa6";
import { PiBankFill } from "react-icons/pi";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import '../style/catDetails.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const GET_CAT_DETAILS = gql`
    query GetCatDetails($slug: String!, $limit: Int!, $start: Int!) {
        categories(filters: { slug:{eq:$slug} }) {
             data{
                id
                attributes {
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




const CatDetails = () => {
    const { slug } = useParams();
    const { loading, error, data, fetchMore } = useQuery(GET_CAT_DETAILS, {
        variables: { slug, start: 0, limit: 12 },
    });
    const categories = data?.categories?.data[0].attributes;

    const currentDataRef = useRef(null);

    const fetchMoreData = () => {
        currentDataRef.current = data;
        fetchMore({
            variables: {
                start: data.categories.data[0].attributes.blogs.data.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                let newBlogs = fetchMoreResult.categories.data[0].attributes.blogs.data;
                let oldBlogs = prev.categories && prev.categories.data && prev.categories.data[0] && prev.categories.data[0].attributes && prev.categories.data[0].attributes.blogs && prev.categories.data[0].attributes.blogs.data ? prev.categories.data[0].attributes.blogs.data : (currentDataRef.current && currentDataRef.current.categories ? currentDataRef.current.categories.data[0].attributes.blogs.data : []);
                return {
                    categories: {
                        ...fetchMoreResult.categories,
                        data: [
                            {
                                ...fetchMoreResult.categories.data[0],
                                attributes: {
                                    ...fetchMoreResult.categories.data[0].attributes,
                                    blogs: {
                                        ...fetchMoreResult.categories.data[0].attributes.blogs,
                                        data: [
                                            ...oldBlogs,
                                            ...newBlogs,
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

    let iconStyles = { color: "#0280CD", fontSize: "32px", marginLeft: "5px" }; if (loading) return null;
    if (error) return `Error! ${error.message}`;
    const CategoryIcon = () => {
        switch (categories.name) {
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
            // Add more cases for each category
            default:
                return null; // Default icon or handle unknown categories
        }
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    {/* normal meta tags */}
                    <title>{categories.name}</title>
                    <meta name="description" content={categories.name} />
                    <meta name="keywords" content="Category, Blogs, Details" />
                    <meta name="author" content="Your Name" />
                    {/* meta tags for openGraph */}
                    <meta property="og:title" content={categories.name} />
                    {/* <meta property="og:description" content={categories.attributes.description}/> */}
                    <meta property="og:image" content={categories.blogs.data[0]?.attributes.cover.data.attributes.url} />
                    <meta property="og:type" content="website" />
                </Helmet>

                <Header />
                <div className='container'>
                    <div className='cat-details'>
                        <div className='catTitle-details'>
                            < CategoryIcon />
                            <h2  >{categories.name}</h2>
                        </div>
                        <p className='cat-disc'>قسم أفكار المشاريع هو الجزء في المنصة الذي يوفر للمستخدمين مجموعة من الافكار والاقتراحات لتطوير مشاريع جديدة. يهدف هذا القسم إلى توفير مصادر إلهام وإشارات لمن يبحثون عن فرص استثمارية أو مشاريع جديدة لتطويرها. يمكن أن يشمل القسم تحليلًا للاتجاهات الصاعدة في السوق، وفحصاً للحاجات الاستهلاكية أو الفجوات في الصناعة.
                        </p>
                        <div className='cat-links'>
                            {categories.sub_categories.data.map(sub => (
                                <Link to={`/category/${categories.slug}/${sub.attributes.slug}`} key={sub.id} className={window.location.pathname === `/${categories.slug}/${sub.attributes.slug}` ? 'active' : ''}>{sub.attributes.subName}</Link>
                            ))}
                        </div>
                    </div>

                    <div className='other-blogs'>
                        <InfiniteScroll
                            dataLength={categories.blogs.data.length}
                            next={fetchMoreData}
                            hasMore={true}
                        >
                            {categories.blogs.data.map(blog => (
                                <div key={blog.id} className='other-blog-card'>
                                    <div className='blog-img'>
                                        <Link to={`/${blog.attributes.slug}`}>
                                            <img loading='lazy' src={blog.attributes.cover.data.attributes.url} alt='blog' />
                                        </Link>
                                    </div>

                                    <div className='blog-content'>
                                        <Link to={`/${blog.attributes.slug}`}><h3 className='title'>{blog.attributes.title}</h3></Link>
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
};

export default CatDetails;
