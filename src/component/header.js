import React, { useState, useEffect } from 'react';
import { TiThMenu } from 'react-icons/ti';
import { IoMdClose, IoMdSearch, IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import '../style/header.css';
import Logo from './logo';
import { useQuery, gql } from '@apollo/client';

const CatQuery = gql`
  query Getcat {
    categories {
      data {
        id
        attributes {
          name
          slug
          sub_categories {
            data {
              id
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

function Header() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    const handleResizeListener = window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResizeListener);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowSearch(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowMenu(false);
  };

  const { loading, error, data } = useQuery(CatQuery);

  if (loading) return null;
  if (error) return <p>Error....</p>;

  const categories = data.categories.data;

  return (
    <div className='container'>
      <header className="header">
        <Logo />
        <ul className={`nav ${isSmallScreen && showMenu ? 'show-menu' : ''}`}>
          {categories.map(cat => (
            <li key={cat.id} onMouseEnter={() => setHoveredCategory(cat.id)} onMouseLeave={() => setHoveredCategory(null)}>
              <Link to={`/category/${cat.attributes.slug}`}>
                {cat.attributes.name}
                {cat.attributes.sub_categories.data.length > 0 && <IoIosArrowDown style={{ color: '#000', fontSize: '15px', margin: '0px' }} />}
              </Link>
              {hoveredCategory === cat.id && cat.attributes.sub_categories.data.length > 0 && (
                <ul className="sub-categories">
                  {cat.attributes.sub_categories.data.map(subCat => (
                    <li key={subCat.id}><Link to={`/category/${cat.attributes.slug}/${subCat.attributes.slug}`}>{subCat.attributes.subName}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}

        </ul>
        <div className="search">
          <IoMdSearch onClick={toggleSearch} />
          <input
            type="text"
            placeholder="بحث..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={showSearch ? 'show-search' : 'display-none'}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                window.location.href = `/search/${searchValue}`;
              }
            }}
          />
          {showSearch && <div className="overlay" onClick={() => setShowMenu(false)}></div>}
          {isSmallScreen && (
            <div className="menu-icon" onClick={toggleMenu}>
              {showMenu ? <IoMdClose /> : <TiThMenu />}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
