import React, { useState } from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import { gql, useMutation } from '@apollo/client';

const contactQuery = gql`
  mutation createContactUs($data: ContactUsInput!) {
    createContactUs(data: $data) {
      data {
        id
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

    return (
        <>

            <Header />
            <div className="container">
                <div className="contactUs">
                    <h2>اتصل بنا</h2>
                    <p>
                        استخدم نموذج الاتصال بنا للتواصل مع موقع اقتصاد، وتقديم مقترحاتك
                        لتطوير خدماتنا
                    </p>

                    <h3 className='contacth3'>اتصل بنا في اي وقت</h3>
                </div>

                <div className="contactForm">
                    {successMessageVisible ? (
                        <div className="successMessage">إستقبل فريق صناع المال بياناتك بنجاح، انتظر اتصالنا في أقرب وقت. نقدر ثقتكم بنا.</div>
                    ) : <form onSubmit={handleSubmit}>
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
        </>
    );
}

export default Contact;
