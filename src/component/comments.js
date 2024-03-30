
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import '../style/comment.css';

const CREATE_COMMENT = gql`
    mutation createComment($data: CommentInput!) {
        createComment(data: $data) {
            data{
                id
            }
        }
    }
`;

const CommentSection = () => {

    const [commentData, setCommentData] = useState({ name: '', email: '', comment: '' });
    const [createComment] = useMutation(CREATE_COMMENT, {
        onCompleted: () => {
            // Optionally, you can handle success actions here
            setCommentData({ name: '', email: '', comment: '' });
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        createComment({
            variables: {
                data: {
                    name: commentData.name,
                    email: commentData.email,
                    comment: commentData.comment,
                },
            },
        });
    };

    return (
        <div className='comments'>
            <div className='comment-inputs'>
                <form className='comment-form' onSubmit={handleSubmit}>
                    <h3 className='suggestion-comment-title'>أضف تعليقك</h3>
                    <div className='comment-info'>
                        <div className='comment-info-flex'>
                            <label>اسمك</label>
                            <input
                                type='text'
                                value={commentData.name}
                                onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className='comment-info-flex'>
                            <label>بريدك الإلكتروني</label>
                            <input
                                type='email'
                                value={commentData.email}
                                onChange={(e) => setCommentData({ ...commentData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <label>اكتب تعليقك</label>
                    <textarea
                        value={commentData.comment}
                        onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
                        required
                    />
                    <div className='comment-button'>
                        <div className='comment-checkbox'>
                            <input type='checkbox' /> <label>أحفظ بياناتي للتعليق بسهولة في المرة القادمة</label>
                        </div>
                        <button type='submit'> ارسال</button>
                    </div>

                </form>
            </div>
            {/* Here you can display the list of comments */}
        </div>
    );
};


export default CommentSection;
