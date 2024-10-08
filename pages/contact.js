import React, { useState } from 'react';
import Layout from '../src/component/layout';
import Header from '../src/component/header';
import Footer from '../src/component/footer';
import { gql, useMutation, useQuery } from '@apollo/client';

const contactQuery = gql`
  mutation createContactUs($data: ContactUsInput!) {
    createContactUs(data: $data) {
      data {
        id
      }
    }
  }
`;

const GET_LOGO = gql`
  query getLogo {
    logo {
      data {
        id
        attributes {
          appName
        }
      }
    }
  }
`;

function Contact() {
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);
    const [createContactUs] = useMutation(contactQuery, {
        onCompleted: () => {
            setContactData({ name: '', email: '', phone: '', message: '' });
            setSuccessMessageVisible(true);
            setTimeout(() => {
                setSuccessMessageVisible(false);
            }, 3000); // Hide success message after 3 seconds
        },
    });

    const { loading, error, data } = useQuery(GET_LOGO);

    const handleSubmit = (event) => {
        event.preventDefault();
        createContactUs({
            variables: {
                data: {
                    name: contactData.name,
                    email: contactData.email,
                    phone: contactData.phone,
                    message: contactData.message,
                },
            },
        });
    };

    if (loading) return <p></p>;
    if (error) return <p>Error: {error.message}</p>;

    const appName = data.logo.data.attributes.appName;

    return (
        <>
            <Layout
                title={`اتصل بنا - ${appName}`}
                description={`${appName} هو محتوي يقدم نصايح للمال ومعلومات عن الاقتصاد`}
                image={`https://res.cloudinary.com/datnay9zk/image/upload/v1710429087/Untitled_0ca8759c27.png`}
            >
                <Header />
                <div className="container">
                    <div className="contactUs">
                        <h2>اتصل بنا</h2>
                        <p>
                            استخدم نموذج الاتصال بنا للتواصل مع موقع {appName}، وتقديم مقترحاتك
                            لتطوير خدماتنا
                        </p>
                        <h3 className='contacth3'>اتصل بنا في اي وقت</h3>
                    </div>

                    <div className="contactForm">
                        {successMessageVisible ? (
                            <div className="successMessage">إستقبل فريق {appName} بياناتك بنجاح، انتظر اتصالنا في أقرب وقت. نقدر ثقتكم بنا.</div>
                        ) : <form onSubmit={handleSubmit}>
                            {/* Form inputs remain the same */}
                            <label>الاسم بالكامل *</label>
                            <input
                                type="text"
                                required
                                value={contactData.name}
                                onChange={(e) =>
                                    setContactData({ ...contactData, name: e.target.value })
                                }
                            />
                            <label> رقم الهاتف *</label>
                            <input
                                type="number"
                                required
                                value={contactData.phone}
                                onChange={(e) =>
                                    setContactData({ ...contactData, phone: e.target.value })
                                }
                            />
                            <label>البريد الالكتروني *</label>
                            <input
                                type="email"
                                required
                                value={contactData.email}
                                onChange={(e) =>
                                    setContactData({ ...contactData, email: e.target.value })
                                }
                            />
                            <label>الموضوع *</label>
                            <textarea
                                required
                                value={contactData.message}
                                onChange={(e) =>
                                    setContactData({ ...contactData, message: e.target.value })
                                }
                            ></textarea>
                            <button type="submit">ارسال</button>
                        </form>}
                    </div>
                </div>
                <Footer />
            </Layout>
        </>
    );
}

export default Contact;