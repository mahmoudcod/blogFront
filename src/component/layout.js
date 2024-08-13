// components/Layout.js
import Head from 'next/head';
import React from 'react';

const Layout = ({ children, title, description, image, favicon }) => (
    <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <link rel="icon" href={favicon} />  // Add this line
        </Head>
        {children}
    </>
);

export default Layout;