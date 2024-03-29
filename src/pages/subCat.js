
import Header from '../component/header';
import Footer from '../component/footer';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import '../style/catDetails.css';
import Loader from '../component/loading';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const GET_CAT_DETAILS = gql`
    query GetCatDetails($slug: String!) {
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
                    posts{
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
    const { loading, error, data } = useQuery(GET_CAT_DETAILS, {
        variables: { slug },
    });
    const subCategory = data?.subCategories.data[0];  // Optional chaining

    if (loading) return <Loader />;
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
                                <Link to={`/category/${subCategory.attributes.category.data.attributes.slug}/sub/${sub.attributes.slug}`} key={sub.id} className={window.location.pathname === `/category/${subCategory.attributes.category.data.attributes.slug}/sub/${sub.attributes.slug}` ? 'active' : ''}>{sub.attributes.subName}</Link>
                            ))}
                        </div>
                    </div>
                    <div className='first-blog'>
                        {subCategory.attributes.posts.data.slice(0, 1).map(blog => (
                            <div key={blog.id} className='first-blog'>
                                <div className='blog-img'>
                                    <img loading='lazy' src={blog.attributes.cover.data.attributes.url} alt='blog' />
                                </div>
                                <div className='blog-content'>
                                    <Link to={`/details/${blog.attributes.slug}`} ><h3>{blog.attributes.title}</h3></Link>
                                    <p>{blog.attributes.blog.slice(0, 100)}</p>
                                    <p>{format(new Date(blog.attributes.createdAt), "dd MMMM yyyy", { locale: ar })}</p>                            </div>
                            </div>
                        ))}
                    </div>
                    <div className='other-blogs'>
                        {subCategory.attributes.posts.data.slice(1).map(blog => (
                            <div key={blog.id} className='other-blog-card'>
                                <div className='blog-img'>
                                    <img loading='lazy' src={blog.attributes.cover.data.attributes.url} alt='blog' />
                                </div>
                                <div className='blog-content'>
                                    <p>{format(new Date(blog.attributes.createdAt), "dd MMMM yyyy", { locale: ar })}</p>
                                    <Link to={`/details/${blog.attributes.slug}`}><h3>{blog.attributes.title}</h3></Link>
                                    <p>{blog.attributes.blog.slice(0, 100)}</p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
                <Footer />
            </HelmetProvider>
        </>
    );
};

export default SupCatDetails;
