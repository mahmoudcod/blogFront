import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Header from '../../component/header';
import Footer from '../../component/footer';
import Link from 'next/link';
import { SlSocialFacebook } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { useQuery, gql } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';

const profileQuery = gql`
    query GetProfile($slug: String!, $limit: Int!, $start: Int!) {
        usersPermissionsUsers(filters: {slug: {eq: $slug}}) {
            data {
                id
                attributes {
                    username
                    description
                    linkedin
                    slug
                    x
                    facebook
                    posts (pagination: {limit: $limit, start: $start}, sort: "createdAt:desc") {
                        data{
                            id
                            attributes{
                                title
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

function Profile() {
    const router = useRouter(); // Get router object from useRouter
    const { slug } = router.query; // Access query parameters
    const { loading, error, data, fetchMore } = useQuery(profileQuery, {
        variables: { slug, limit: 12, start: 0 }
    });
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchMoreData = () => {
        setLoadingMore(true);
        fetchMore({
            variables: {
                start: profile.posts.data.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                setLoadingMore(false);
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    usersPermissionsUsers: {
                        ...prev.usersPermissionsUsers,
                        data: [
                            {
                                ...prev.usersPermissionsUsers.data[0],
                                attributes: {
                                    ...prev.usersPermissionsUsers.data[0].attributes,
                                    posts: {
                                        ...prev.usersPermissionsUsers.data[0].attributes.posts,
                                        data: [
                                            ...prev.usersPermissionsUsers.data[0].attributes.posts.data,
                                            ...fetchMoreResult.usersPermissionsUsers.data[0].attributes.posts.data
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                });
            }
        });
    };

    if (loading) return null;
    if (error) return <p>Error: {error.message}</p>;

    const profile = data.usersPermissionsUsers.data[0].attributes;

    return (
        <>
            <Header />
            <div className='container'>
                <div style={{ marginBottom: '3rem' }}>
                    <h2 >الكاتب: {profile.username}</h2>
                </div>
                <div className='profile-details'>
                    <div className='profile-cover'>
                        {profile.cover && profile.cover.data && (
                            <img src={`${profile.cover.data.attributes.url}`} alt='Cover' />
                        )}
                    </div>
                    <div className='profile-info'>
                        <h1>{profile.username}</h1>
                        <p className='profile-info-disc'>{profile.description}</p>
                        <div className='profile-social'>
                            {profile.linkedin && (
                                <a href={profile.linkedin} target='_blank' rel='noreferrer'>
                                    <FaLinkedinIn />
                                </a>
                            )}
                            {profile.facebook && (
                                <a href={profile.facebook} target='_blank' rel='noreferrer'>
                                    <SlSocialFacebook />
                                </a>
                            )}
                            {profile.x && (
                                <a href={profile.x} target='_blank' rel='noreferrer'>
                                    <FaXTwitter />
                                </a>
                            )}

                        </div>
                    </div>
                </div>
                <div className='profile-posts'>
                    <h2>مقالات <span>{profile.username}</span></h2>
                    <InfiniteScroll
                        dataLength={profile.posts.data.length}
                        next={fetchMoreData}
                        hasMore={loadingMore}
                    >
                        <div className='profile-posts-list'>
                            {profile.posts && profile.posts.data && profile.posts.data.length > 0 ? (
                                profile.posts.data.map((post) => (
                                    <div key={post.id} className='profile-posts-info'>
                                        {post.attributes.cover && (
                                            <Link href={`/${post.attributes.slug}`}>
                                                <img src={`${post.attributes.cover.data.attributes.url}`} alt='Cover' />
                                            </Link>
                                        )}
                                        <Link href={`/${post.attributes.slug}`}>
                                            <h3 className='title'>{post.attributes.title}</h3>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No posts found.</p>
                            )}
                        </div>
                    </InfiniteScroll>
                </div>

            </div>
            <Footer />
        </>
    );
}

export default Profile;
