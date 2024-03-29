
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
import Loader from '../component/loading';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const GET_CAT_DETAILS = gql`
    query GetCatDetails($slug: String!) {
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
                            }
                        }
                    }
                    blogs{
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
    const { loading, error, data } = useQuery(GET_CAT_DETAILS, {
        variables: { slug },
    });
    let iconStyles = { color: "#0280CD", fontSize: "1.8rem", marginLeft: "10px" };
    const categories = data?.categories.data[0];  // Optional chaining

    if (loading) return <Loader />;
    if (error) return `Error! ${error.message}`;
    const CategoryIcon = () => {
        switch (categories.attributes.name) {
            case 'اسواق المال':
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
                    <title>{categories.attributes.name}</title>
                    <meta name="description" content={categories.attributes.name} />
                    <meta name="keywords" content="Category, Blogs, Details" />
                    <meta name="author" content="Your Name" />
                    {/* meta tags for openGraph */}
                    <meta property="og:title" content={categories.attributes.name} />
                    {/* <meta property="og:description" content={categories.attributes.description}/> */}
                    <meta property="og:image" content={categories.attributes.blogs.data[0]?.attributes.cover.data.attributes.url} />
                    <meta property="og:type" content="website" />
                </Helmet>

                <Header />
                <div className='container'>
                    <div className='cat-details'>
                        <div className='catTitle-details'>
                            < CategoryIcon />
                            <h2  >{categories.attributes.name}</h2>
                        </div>
                        <p className='cat-disc'>قسم أفكار المشاريع هو الجزء في المنصة الذي يوفر للمستخدمين مجموعة من الافكار والاقتراحات لتطوير مشاريع جديدة. يهدف هذا القسم إلى توفير مصادر إلهام وإشارات لمن يبحثون عن فرص استثمارية أو مشاريع جديدة لتطويرها. يمكن أن يشمل القسم تحليلًا للاتجاهات الصاعدة في السوق، وفحصاً للحاجات الاستهلاكية أو الفجوات في الصناعة.
                        </p>
                        <div className='cat-links'>
                            {categories.attributes.sub_categories.data.map(sub => (
                                <Link to={`/category/${sub.attributes.slug}`} key={sub.id}>{sub.attributes.subName}</Link>
                            ))}
                        </div>
                    </div>
                    <div className='first-blog'>
                        {categories.attributes.blogs.data.slice(0, 1).map(blog => (
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
                        {categories.attributes.blogs.data.slice(1).map(blog => (
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

export default CatDetails;
