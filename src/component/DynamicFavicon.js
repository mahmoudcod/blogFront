// components/DynamicFavicon.js
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_FAVICON = gql`
  query getFavicon {
    logo {
      data {
        id
        attributes {
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

function DynamicFavicon() {
    const { loading, error, data } = useQuery(GET_FAVICON);

    useEffect(() => {
        if (!loading && !error && data?.logo?.data?.[0]?.attributes?.favicon?.data?.attributes?.url) {
            const faviconUrl = data.logo.data.attributes.favicon.data.attributes.url;
            const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = faviconUrl;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
    }, [loading, error, data]);

    return null;
}

export default DynamicFavicon;