import Header from '../component/header';
import Footer from '../component/footer';
import Loader from '../component/loading';
import { useParams } from 'react-router-dom';
import { SlSocialFacebook } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { useQuery, gql } from '@apollo/client';
import '../style/profile.css';

const profileQuery = gql`
    query GetProfile($id: ID!) {
        usersPermissionsUser(id: $id) {
            data {
                id
                attributes {
                    username
                    description
                    linkedin
                    x
                    facebook
                    posts{
                        data{
                            id
                            attributes{
                                title
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
    const { id } = useParams();
    const { loading, error, data } = useQuery(profileQuery, {
        variables: { id }
    });

    if (loading) return <Loader />;
    if (error) return <p>Error: {error.message}</p>;

    const profile = data.usersPermissionsUser.data.attributes;

    return (
        <div>
            <Header />
            <div className='container'>
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
                    <div className='profile-posts-list'>
                        {profile.posts && profile.posts.data && profile.posts.data.length > 0 ? (
                            profile.posts.data.map((post) => (
                                <div key={post.id} className='profile-posts-info'>
                                    {post.attributes.cover && (
                                        <img src={`${post.attributes.cover.data.attributes.url}`} alt='Cover' />
                                    )}
                                    <h3>{post.attributes.title}</h3>
                                </div>
                            ))
                        ) : (
                            <p>No posts found.</p>
                        )}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Profile;
