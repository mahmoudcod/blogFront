import { useState, useRef } from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import '../style/catDetails.css';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const GET_CAT_DETAILS = gql`
    query GetCatDetails($slug: String!, $limit: Int!,$start: Int!) {
        subCategories(filters: {slug:{eq:$slug}}) {
             data{
                id
                attributes {
                    subName
                    slug
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




const SupCatDetails = () => {


    const { slug } = useParams();
    const { loading, error, data, fetchMore } = useQuery(GET_CAT_DETAILS, {
        variables: { slug, limit: 12, start: 0 },
    });
    const subCategory = data?.subCategories.data[0];  // Optional chaining

    const [hasMore, setHasMore] = useState(true);
    const currentDataRef = useRef(null);

    const fetchMoreData = () => {
        currentDataRef.current = data;
        fetchMore({
            variables: {
                start: data.subCategories.data[0].attributes.posts.data.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if (fetchMoreResult.subCategories.data[0].attributes.posts.data.length < 4) {
                    setHasMore(false);
                }
                let newBlogs = fetchMoreResult.subCategories.data[0].attributes.posts.data;
                let oldBlogs = prev.subCategories && prev.subCategories.data && prev.subCategories.data[0] && prev.subCategories.data[0].attributes && prev.subCategories.data[0].attributes.posts && prev.subCategories.data[0].attributes.posts.data ? prev.subCategories.data[0].attributes.posts.data : (currentDataRef.current && currentDataRef.current.subCategories ? currentDataRef.current.subCategories.data[0].attributes.posts.data : []);
                return {
                    subCategories: {
                        ...fetchMoreResult.subCategories,
                        data: [
                            {
                                ...fetchMoreResult.subCategories.data[0],
                                attributes: {
                                    ...fetchMoreResult.subCategories.data[0].attributes,
                                    posts: {
                                        ...fetchMoreResult.subCategories.data[0].attributes.posts,
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
    if (loading) return null
    if (error) return `Error! ${error.message}`;

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    {/* normal meta tags */}
                    <title>{subCategory.attributes.subName}</title>
                    <meta name="description" content={subCategory.attributes.subName} />
                    <meta name="keywords" content="Category, Blogs, Details" />
                    {/* meta tags for openGraph */}
                    <meta property="og:title" content={subCategory.attributes.subName} />
                    {/* <meta property="og:description" content={subCategory.attributes.description}/> */}
                    <meta property="og:type" content="website" />
                </Helmet>

                <Header />
                <div className='container'>
                    <div className='cat-details'>
                        <div className='catTitle-details'>
                            <h2  >{subCategory.attributes.subName}</h2>
                        </div>
                        <p className='cat-disc'>قسم أفكار المشاريع هو الجزء في المنصة الذي يوفر للمستخدمين مجموعة من الافكار والاقتراحات لتطوير مشاريع جديدة. يهدف هذا القسم إلى توفير مصادر إلهام وإشارات لمن يبحثون عن فرص استثمارية أو مشاريع جديدة لتطويرها. يمكن أن يشمل القسم تحليلًا للاتجاهات الصاعدة في السوق، وفحصاً للحاجات الاستهلاكية أو الفجوات في الصناعة.
                        </p>
                        <div className='cat-links'>
                            {subCategory.attributes.category.data.attributes.sub_categories.data.map(sub => (
                                <Link to={`/category/${subCategory.attributes.category.data.attributes.slug}/${sub.attributes.slug}`} key={sub.id} className={window.location.pathname === `/category/${subCategory.attributes.category.data.attributes.slug}/${sub.attributes.slug}` ? 'active' : ''}>{sub.attributes.subName}</Link>
                            ))}
                        </div>
                    </div>
                    <div className='other-blogs'>
                        <InfiniteScroll
                            dataLength={subCategory.attributes.posts.data.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                        >
                            {subCategory.attributes.posts.data.slice(1).map(blog => (
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

export default SupCatDetails;
