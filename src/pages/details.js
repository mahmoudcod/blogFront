

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/header';
import CommentSection from '../component/comments';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import MostPopular from '../component/mostPopular';
import Footer from '../component/footer';
import { CgProfile } from "react-icons/cg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import Loader from '../component/loading'
import ReactMarkdown from 'react-markdown'
import '../style/details.css'
import { IoMdAdd } from "react-icons/io";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";


const blogQuery = gql`
    query GetBlog($id: ID!) {
        blog(id: $id) {
            data {
                id
                attributes {
                    title
                    blog
                    description
                    contnetArticle
                    sources
                    users_permissions_user{
                        data{
                            id
                            attributes{
                                username
                                description
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
                    categories {
                        data {
                            id
                            attributes {
                                name
                                blogs {
                                    data {
                                        id
                                        attributes {
                                            title
                                            publishedAt
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

const DetailsPage = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(blogQuery, {
        variables: { id },
    });

    const [showSources, setShowSources] = useState(false);

    if (loading) return <Loader />
    if (error) return <p>Error....</p>;
    const blog = data?.blog?.data;
    const { title, categories, publishedAt } = blog?.attributes || {};
    const formattedPublishedAt = format(new Date(publishedAt), "dd MMMM yyyy 'م'", { locale: ar });
    const categoryBlogs = categories.data[0].attributes.blogs.data.slice(0, 5);

    const toggleSources = () => {
        setShowSources(!showSources);
    };

    return (
        <>
            <Header />
            <div className='container'>
                {categories.data.length > 0 && (
                    <small>{categories.data[0].attributes.name}</small>
                )}
                <div className="row">
                    <div className="rightColumn">
                        <div className="dCard">
                            <h3>{title}</h3>
                            <div className='imgCard'>
                                <img loading='lazy' src={blog.attributes.cover.data.attributes.url} alt={title} />
                                <div className='imgText'>
                                    <p>{blog.attributes.description}</p>
                                </div>
                            </div>
                            <div className='cal-profile'>
                                <div className='profile'>
                                    <CgProfile />
                                    <p key={blog?.attributes?.users_permissions_user?.data?.id ?? ''}>   {blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.username}
                                    </p>
                                </div>
                                <div className='cal'>
                                    <FaRegCalendarAlt />
                                    <p>{formattedPublishedAt}</p>
                                </div>
                            </div>
                            <div className='holder'>
                                <div className='social'>
                                    <div className='socialI'>
                                        <SlSocialTwitter />
                                    </div>
                                    <div className='socialI'>
                                        <SlSocialFacebook />
                                    </div>
                                    <div className='socialI'>
                                        <SlSocialInstagram />
                                    </div>
                                </div>
                                <div className='blog-holder'>
                                    <div className='article'>
                                        <h3>محتويات المقالة</h3>
                                        <ReactMarkdown>{blog.attributes.contnetArticle}</ReactMarkdown>
                                    </div>
                                    <div className='blog'>
                                        <ReactMarkdown>{blog.attributes.blog}</ReactMarkdown>

                                    </div>
                                </div>

                            </div>
                            <div className='source'>
                                <div className='toggle'>
                                    <h3>المصادر</h3>
                                    <IoMdAdd className='addIcon' onClick={toggleSources} />
                                </div>
                                {showSources && (
                                    <div className='sourceInfo'>
                                        <ReactMarkdown>{blog.attributes.sources}</ReactMarkdown>
                                    </div>
                                )}
                            </div>
                            <div className='author'>
                                <div className='authorInfo'>
                                    <div className='profileInfo'>
                                        <Link to={`/profile/${blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.id}`}>
                                            <img
                                                loading='lazy'
                                                src={blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.cover && blog.attributes.users_permissions_user.data.attributes.cover.data && blog.attributes.users_permissions_user.data.attributes.cover.data.attributes && blog.attributes.users_permissions_user.data.attributes.cover.data.attributes.url}
                                                alt={blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.username}
                                            />
                                        </Link>
                                        <p key={blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.id}>
                                            {blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.username}
                                        </p>
                                    </div>
                                    <div className='profileSocial'>
                                        <div className='socialI'>
                                            <SlSocialTwitter />
                                        </div>
                                        <div className='socialI'>
                                            <SlSocialFacebook />
                                        </div>
                                        <div className='socialI'>
                                            <SlSocialInstagram />
                                        </div>
                                    </div>
                                </div>
                                <div className='authorDesc'>
                                    <p>
                                        {blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.description}
                                    </p>
                                </div>
                            </div>
                            <div className='comments'>
                                <CommentSection postId={id} />
                            </div>
                        </div>
                    </div>
                    <div className="leftColumn">
                        <div className="dCard">
                            <MostPopular currentId={id} />

                        </div>
                        <div className="dCard">
                            <div className="fakeimg">
                                <p>adds</p>
                            </div>
                        </div>
                        <div className="dCard">
                            <h3>ذات صلة</h3>
                            {categoryBlogs.map((blog) => (
                                <div className='mostPopular' key={blog.id}>
                                    <h3 className='title bor'><Link to={id === blog.id ? "#" : `/details/${blog.id}`} key={blog.id}>
                                        {blog.attributes.title}
                                    </Link></h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='suggestion'>
                    <h3 className='suggestion-comment-title'> قد يعجبك ايضا</h3>
                    <div className='suggestion-flex'>
                        {categoryBlogs.slice(0, 4).map((blog) => (
                            <div className='mostPopular' key={blog.id}>
                                <img src={blog.attributes.cover.data.attributes.url} alt={blog.attributes.title} />
                                <h3 className='title'> <Link to={id === blog.id ? "#" : `/details/${blog.id}`} key={blog.id}>
                                    {blog.attributes.title}
                                </Link></h3>
                                <span className='after'>{format(new Date(blog.attributes.publishedAt), "dd MMMM yyyy", { locale: ar })}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />

        </>

    );
};

export default DetailsPage;
