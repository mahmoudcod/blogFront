// components/Layout.js
import Head from 'next/head';
import React from 'react';

const Layout = ({ children, title, description, image, favicon }) => (
    <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Favicon */}
            <link rel="icon" href={favicon} />
        </Head>
        {children}
    </>
);

export default Layout;
