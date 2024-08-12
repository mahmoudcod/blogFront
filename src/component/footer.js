import Logo from './logo';
import React from 'react';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';

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
    const { loading, error, data } = useQuery(GET_FOOTER);
    if (loading) return null;
    if (error) return `Error! ${error}`;

    // Flatten the categories and subcategories
    const allItems = data.categories.data.reduce((acc, category) => {
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

    const lastItem = <li><Link href={`/contact`}> اتصل بنا</Link> </li>;
    const anotherItem = <li><Link href={`/about`}> عن صناع المال</Link> </li>;

    return (
        <footer className='footer'>
            <div className='container'>
                <div className='sectionOne'>
                    <Logo />
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
                                {index === chunkArray(allItems, 4).length - 1 && lastItem}
                                {index === chunkArray(allItems, 4).length - 1 && anotherItem}
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
                            <Link href={`/about`}> سياسة الخصوصية</Link>
                        </li>
                    </ul>
                </div>
                <div className='sectionThree'>
                    <p> 2024© جميع الحقوق محفوظة</p>
                    <a href='https://adainc.co/' target='blank'>  <small className='footerSmall'>صمم بكل حب في ادا</small></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
