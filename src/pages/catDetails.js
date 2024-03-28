
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


const GET_CAT_DETAILS = gql`
    query GetCatDetails($id: ID!) {
        category(id: $id) {
             data{
                id
                attributes {
                    name
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


    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_CAT_DETAILS, {
        variables: { id },
    });
    let iconStyles = { color: "#0280CD", fontSize: "1.8rem", marginLeft: "10px" };


    if (loading) return <Loader />;
    if (error) return `Error! ${error.message}`;
    const CategoryIcon = () => {
        switch (data.category.data.attributes.name) {
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
            <Header />
            <div className='container'>
                <div className='cat-details'>
                    <div className='catTitle-details'>
                        < CategoryIcon />
                        <h2  >{data.category.data.attributes.name}</h2>
                    </div>
                    <p className='cat-disc'>قسم أفكار المشاريع هو الجزء في المنصة الذي يوفر للمستخدمين مجموعة من الافكار والاقتراحات لتطوير مشاريع جديدة. يهدف هذا القسم إلى توفير مصادر إلهام وإشارات لمن يبحثون عن فرص استثمارية أو مشاريع جديدة لتطويرها. يمكن أن يشمل القسم تحليلًا للاتجاهات الصاعدة في السوق، وفحصاً للحاجات الاستهلاكية أو الفجوات في الصناعة.
                    </p>
                    <div className='cat-links'>
                        {data.category.data.attributes.sub_categories.data.map(sub => (
                            <Link to={`/category/${sub.id}`} key={sub.id}>{sub.attributes.subName}</Link>
                        ))}
                    </div>
                </div>
                <div className='first-blog'>
                    {data.category.data.attributes.blogs.data.slice(0, 1).map(blog => (
                        <div key={blog.id} className='first-blog'>
                            <div className='blog-img'>
                                <img loading='lazy' src={blog.attributes.cover.data.attributes.url} alt='blog' />
                            </div>
                            <div className='blog-content'>
                                <Link to={`/details/${blog.id}`} ><h3>{blog.attributes.title}</h3></Link>
                                <p>{blog.attributes.blog.slice(0, 100)}</p>
                                <p>{format(new Date(blog.attributes.createdAt), "dd MMMM yyyy", { locale: ar })}</p>                            </div>
                        </div>
                    ))}
                </div>
                <div className='other-blogs'>
                    {data.category.data.attributes.blogs.data.slice(1).map(blog => (
                        <div key={blog.id} className='other-blog-card'>
                            <div className='blog-img'>
                                <img loading='lazy' src={blog.attributes.cover.data.attributes.url} alt='blog' />
                            </div>
                            <div className='blog-content'>
                                <p>{format(new Date(blog.attributes.createdAt), "dd MMMM yyyy", { locale: ar })}</p>
                                <Link to={`/details/${blog.id}`} ><h3>{blog.attributes.title}</h3></Link>
                                <p>{blog.attributes.blog.slice(0, 100)}</p>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CatDetails;
