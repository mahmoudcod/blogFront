import React from 'react';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';

const GET_LOGO = gql`
  query getLogo {
    logo {
      data {
        id
        attributes {
          appName
          description
          footerLogo {
            data {
              id
              attributes {
                url
              }
            }
          }
          favicon {
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

const GET_FOOTER = gql`
  query getFooter {
    categories {
      data {
        attributes {
          name
          slug
          sub_categories {
            data {
              attributes {
                subName
                slug
              }
            }
          }
        }
      }
    }
  }
`;

function Footer() {
  const { loading: footerLoading, error: footerError, data: footerData } = useQuery(GET_FOOTER);
  const { loading: logoLoading, error: logoError, data: logoData } = useQuery(GET_LOGO);

  if (footerLoading || logoLoading) return null;
  if (footerError) return `Error! ${footerError}`;
  if (logoError) return `Error! ${logoError}`;

  // Flatten the categories and subcategories
  const allItems = footerData.categories.data.reduce((acc, category) => {
    acc.push(category.attributes);
    acc.push(...category.attributes.sub_categories.data.map(sub => sub.attributes));
    return acc;
  }, []);

  // Function to chunk the array into groups of 4
  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const currentYear = new Date().getFullYear();
  const appName = logoData.logo.data.attributes.appName;
  const footerLogoUrl = logoData.logo.data.attributes.footerLogo.data?.attributes.url;

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='sectionOne'>
          {footerLogoUrl ? (
            <div className="footer-logo">
              <Link href='/'>  <img src={footerLogoUrl} alt={appName} /></Link>
            </div>
          ) : (
            <h2>{appName}</h2>
          )}
          {chunkArray(allItems, 4).map((chunk, index) => (
            <div key={index}>
              <ul>
                {chunk.map((item, itemIndex) => (
                  <li key={item.slug}>
                    <Link href={`/category/${item.subName ? `${item.slug}/${item.slug}` : item.slug}`}>
                      {item.name || item.subName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='sectionTwo'>
          <ul>
            <li>
              <Link href={`/advertising`}> سياسة الاعلان</Link>
            </li>
            <li>
              <Link href={`/publish`}> حقوق النشر</Link>
            </li>
            <li>
              <Link href={`/usage`}> شروط الاستخدام</Link>
            </li>
            <li>
              <Link href={`/privacy`}> سياسة الخصوصية</Link>
            </li>
            <li>
              <Link href={`/contact`}> اتصل بنا</Link>
            </li>
            <li>
              <Link href={`/about`}> عن {appName}</Link>
            </li>
          </ul>
        </div>
        <div className='sectionThree'>
          <p> {currentYear}©  جميع الحقوق محفوظة لدي {appName} </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
