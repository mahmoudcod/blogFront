import React, { useEffect, useState } from 'react';
import Layout from '../src/component/layout';
import Link from 'next/link';
import Header from '../src/component/header';
import { gql } from '@apollo/client';
import MostPopular from '../src/component/mostPopular';
import Footer from '../src/component/footer';
import { CgProfile } from "react-icons/cg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown'
import { IoMdAdd } from "react-icons/io";
import { SlSocialTwitter, SlSocialFacebook, SlSocialInstagram } from "react-icons/sl";
import { initializeApollo } from '../src/lip/apolloClient';

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
        logo {
            data {
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

    const { data } = await apolloClient.query({
        query: blogQuery,
        variables: { slug },
    });

    if (!data.blogs.data.length) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            blog: data.blogs.data[0],
            appName: data.logo.data.attributes.appName,
        },
    };
}

const DetailsPage = ({ blog, appName }) => {
    const [headings, setHeadings] = useState([]);
    const [showSources, setShowSources] = useState(false);

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

    const toggleSources = () => {
        setShowSources(!showSources);
    };

    const pageTitle = blog?.attributes?.title ? `${blog.attributes.title} - ${appName}` : appName;
    const pageDescription = blog?.attributes?.description;
    const pageImage = blog?.attributes?.cover?.data?.attributes?.url;

    // Filter out the current blog post from related posts
    const relatedBlogs = blog.attributes.categories.data[0].attributes.blogs.data.filter(
        relatedBlog => relatedBlog.id !== blog.id
    );

    return (
        <Layout
            title={pageTitle}
            description={pageDescription}
            image={pageImage}
        >
            <Header />
            <div className='container'>
                <>
                    {blog?.attributes?.categories?.data.length > 0 && (
                        <Link href={`/category/${blog.attributes.categories.data[0].attributes.slug}`}>
                            <small className='hov'>{blog.attributes.categories.data[0].attributes.name}</small>
                        </Link>
                    )}
                    <div className="row">
                        <div className="rightColumn">
                            <div className="dCard">
                                <h3 className='title-details'>{blog.attributes.title}</h3>
                                <div className='cal-profile'>
                                    {blog?.attributes?.users_permissions_user?.data?.id && (
                                        <div className='profile'>
                                            <CgProfile />
                                            <Link href={`/profile/${blog.attributes.users_permissions_user.data.attributes.slug}`}>
                                                <p>{blog.attributes.users_permissions_user.data.attributes.username}</p>
                                            </Link>
                                        </div>
                                    )}
                                    <div className='cal'>
                                        <FaRegCalendarAlt />
                                        <p>{format(new Date(blog.attributes.publishedAt), "dd MMMM yyyy 'م'", { locale: ar })}</p>
                                    </div>
                                </div>
                                <div className='imgCard'>
                                    <img loading='lazy' src={blog.attributes.cover.data.attributes.url} alt={blog.attributes.title} />
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
                                            <ReactMarkdown>
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
                                {blog.attributes.users_permissions_user.data.attributes.show && (
                                    <div className='author'>
                                        <div className='authorInfo'>
                                            <div className='profileInfo'>
                                                <Link href={`/profile/${blog.attributes.users_permissions_user.data.attributes.slug}`}>
                                                    <img
                                                        loading='lazy'
                                                        src={blog.attributes.users_permissions_user.data.attributes.cover.data.attributes.url}
                                                        alt={blog.attributes.users_permissions_user.data.attributes.username}
                                                    />
                                                </Link>
                                                <Link href={`/profile/${blog.attributes.users_permissions_user.data.attributes.slug}`}>
                                                    <p>{blog.attributes.users_permissions_user.data.attributes.username}</p>
                                                </Link>
                                            </div>
                                            <div className='profileSocial'>
                                                <div className='socialI'>
                                                    <Link href={blog.attributes.users_permissions_user.data.attributes.x}>
                                                        <SlSocialTwitter />
                                                    </Link>
                                                </div>
                                                <div className='socialI'>
                                                    <Link href={blog.attributes.users_permissions_user.data.attributes.facebook}>
                                                        <SlSocialFacebook />
                                                    </Link>
                                                </div>
                                                <div className='socialI'>
                                                    <Link href={blog.attributes.users_permissions_user.data.attributes.linkedin}>
                                                        <SlSocialInstagram />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='authorDesc'>
                                            <p>{blog.attributes.users_permissions_user.data.attributes.description}</p>
                                        </div>
                                    </div>
                                )}
                                {/* <div className='comments'>
                                    <CommentSection />
                                </div> */}
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
                            {relatedBlogs.length > 0 && (
                                <div className="dCard">
                                    <h3 className='title-main'>ذات صلة</h3>
                                    {relatedBlogs.slice(0, 5).map((relatedBlog) => (
                                        <div className='mostPopular-two' key={relatedBlog.id}>
                                            <h1 className='title bor'>
                                                <Link href={`/${relatedBlog.attributes.slug}`}>
                                                    {relatedBlog.attributes.title}
                                                </Link>
                                            </h1>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {relatedBlogs.length > 0 && (
                        <div className='suggestion'>
                            <h3 className='suggestion-comment-title'>قد يعجبك ايضا</h3>
                            <div className='suggestion-flex'>
                                {relatedBlogs.slice(0, 4).map((suggestedBlog) => (
                                    <div className='mostPopular' key={suggestedBlog.id}>
                                        <Link href={`/${suggestedBlog.attributes.slug}`}>
                                            <img src={suggestedBlog.attributes.cover.data.attributes.url} alt={suggestedBlog.attributes.title} />
                                        </Link>
                                        <h3 className='title'>
                                            <Link href={`/${suggestedBlog.attributes.slug}`}>
                                                {suggestedBlog.attributes.title}
                                            </Link>
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            </div>
            <Footer />
        </Layout>
    );
};

export default DetailsPage;