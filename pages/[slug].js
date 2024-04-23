
import React, { useState, useEffect } from 'react';
import Layout from '../src/component/layout';
import Link from 'next/link';
import Header from '../src/component/header';
import CommentSection from '../src/component/comments';
import { useQuery, gql } from '@apollo/client';
import MostPopular from '../src/component/mostPopular';
import Footer from '../src/component/footer';
import { CgProfile } from "react-icons/cg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown'
import { IoMdAdd } from "react-icons/io";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { useRouter } from 'next/router';


const blogQuery = gql`
    query GetBlog($slug: String!) {
        blogs(filters: { slug:{eq:$slug} }) {
            data {
                id
                attributes {
                    slug
                    title
                    blog
                    description
                    contnetArticle
                    sources
                    tags{
                        data{
                            id
                            attributes{
                                name
                                slug
                            }
                        }
                    }
                    users_permissions_user{
                        data{
                            id
                            attributes{
                                username
                                slug
                                description
                                facebook
                                x
                                linkedin
                                show
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
                                slug
                                blogs {
                                    data {
                                        id
                                        attributes {
                                            title
                                            slug
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
    const router = useRouter(); // Get router object from useRouter
    const { slug } = router.query; // Access query parameters
    const { loading, error, data } = useQuery(blogQuery, {
        variables: { slug },
    });
    const blog = data?.blogs?.data[0];
    const [headings, setHeadings] = useState([]);
    useEffect(() => {
        if (blog) {

            const renderedHtml = document.getElementById('rendered-html');

            if (renderedHtml) {
                const hElements = renderedHtml.querySelectorAll('h1, h2, h3, h4, h5, h6');
                const extractedHeadings = Array.from(hElements).map((heading, index) => {
                    const id = `heading-${index}`;
                    heading.setAttribute('id', id);
                    return { id, text: heading.textContent };
                });
                setHeadings(extractedHeadings);
            }
        }
    }, [blog]);

    const [showSources, setShowSources] = useState(false);

    if (loading) return null
    if (error) return <p>Error....</p>;

    const { title, categories, publishedAt } = blog?.attributes || {};
    const show = blog?.attributes?.users_permissions_user?.data?.attributes?.show;
    const formattedPublishedAt = format(new Date(publishedAt), "dd MMMM yyyy 'م'", { locale: ar });
    const categoryBlogs = categories.data[0].attributes.blogs.data.slice(0, 5);

    const toggleSources = () => {
        setShowSources(!showSources);
    };


    return (
        <>
            <Layout
                title={'صناع المال'}
                description={'صناع المال هو محتوي يقدم نصايح للمال ومعلومات عن الاقتصاد'}
                image={`https://res.cloudinary.com/datnay9zk/image/upload/v1710429087/Untitled_0ca8759c27.png`}
            >

                <Header />
                <div className='container'>

                    {categories.data.length > 0 && (
                        <Link href={`/category/${categories.data[0].attributes.slug}`}>
                            <small className='hov'>{categories.data[0].attributes.name}</small>
                        </Link>
                    )}
                    <div className="row">
                        <div className="rightColumn">
                            <div className="dCard">
                                <h3 className='title-details'>{title}</h3>
                                <div className='cal-profile'>
                                    {blog?.attributes?.users_permissions_user?.data?.id ? (<div className='profile'>
                                        <CgProfile />
                                        <Link href={`/profile/${blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes.slug}`}>
                                            <p key={blog?.attributes?.users_permissions_user?.data?.id ?? ''}>   {blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.username}
                                            </p>
                                        </Link>
                                    </div>) : ''}
                                    <div className='cal'>
                                        <FaRegCalendarAlt />
                                        <p>{formattedPublishedAt}</p>
                                    </div>
                                </div>
                                <div className='imgCard'>
                                    <img loading='lazy' src={blog.attributes.cover.data.attributes.url} alt={title} />
                                    <div className='imgText'>
                                        <p>{blog.attributes.description}</p>
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
                                            <ol>
                                                {headings.map((heading, index) => (
                                                    <li key={index}>
                                                        <a href={`#${heading.id}`}>{heading.text}</a>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                        <div id='rendered-html' className='blog'>
                                            <ReactMarkdown >
                                                {blog.attributes.blog}
                                            </ReactMarkdown>
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
                                <div className='tagsInfo'>
                                    {blog.attributes.tags.data.map((tag) => (
                                        <Link href={`/tags/${tag.attributes.slug}`} key={tag.id}>
                                            <p>{tag.attributes.name}</p>
                                        </Link>
                                    ))}
                                </div>
                                {show && (
                                    <div className='author'>
                                        <div className='authorInfo'>
                                            <div className='profileInfo'>
                                                <Link href={`/profile/${blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes.slug}`}>
                                                    <img
                                                        loading='lazy'
                                                        src={blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.cover && blog.attributes.users_permissions_user.data.attributes.cover.data && blog.attributes.users_permissions_user.data.attributes.cover.data.attributes && blog.attributes.users_permissions_user.data.attributes.cover.data.attributes.url}
                                                        alt={blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.username}
                                                    />
                                                </Link>
                                                <Link href={`/profile/${blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes.slug}`}>
                                                    <p key={blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.id}>
                                                        {blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.username}
                                                    </p>
                                                </Link>
                                            </div>
                                            <div className='profileSocial'>
                                                <div className='socialI'>
                                                    <Link href={blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.x}>
                                                        <SlSocialTwitter />
                                                    </Link>
                                                </div>
                                                <div className='socialI'>
                                                    <Link href={blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.facebook}>
                                                        <SlSocialFacebook />
                                                    </Link>
                                                </div>
                                                <div className='socialI'>
                                                    <Link href={blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.linkedin}>
                                                        <SlSocialInstagram />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='authorDesc'>
                                            <p>
                                                {blog && blog.attributes && blog.attributes.users_permissions_user && blog.attributes.users_permissions_user.data && blog.attributes.users_permissions_user.data.attributes && blog.attributes.users_permissions_user.data.attributes.description}
                                            </p>
                                        </div>
                                    </div>
                                )}


                                <div className='comments'>
                                    <CommentSection />
                                </div>
                            </div>
                        </div>
                        <div className="leftColumn">
                            <div className="dCard">
                                <MostPopular />

                            </div>
                            <div className="dCard">
                                <div className="fakeimg">
                                    <p>ADS</p>
                                </div>
                            </div>
                            <div className="dCard">
                                <h3 className='title-main'>ذات صلة</h3>
                                {categoryBlogs.map((blog) => (
                                    <div className='mostPopular-two' key={blog.id}>
                                        <h1 className='title bor'><Link href={`/${blog.attributes.slug}`} key={blog.id}>
                                            {blog.attributes.title}
                                        </Link></h1>
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
                                    <Link href={`/${blog.attributes.slug}`} key={blog.id}>
                                        <img src={blog.attributes.cover.data.attributes.url} alt={blog.attributes.title} />
                                    </Link>
                                    <h3 className='title'> <Link href={`/${blog.attributes.slug}`} key={blog.id}>
                                        {blog.attributes.title}
                                    </Link></h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </Layout >
        </>
    );

};



export default DetailsPage;
