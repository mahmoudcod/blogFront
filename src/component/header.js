import React, { useState, useEffect } from 'react';
import { TiThMenu } from 'react-icons/ti';
import { IoMdClose, IoMdSearch, IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';
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
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Initialize with false initially
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    const handleResizeListener = window.addEventListener('resize', handleResize);

    // Set initial value of isSmallScreen on component mount
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResizeListener);
    };
  }, []);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsSticky(currentScrollPos > 0 && currentScrollPos > prevScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      <Logo />
      <ul className={`nav ${isSmallScreen && showMenu ? 'show-menu' : ''}`}>
        {categories.map(cat => (
          <li key={cat.id} onMouseEnter={() => setHoveredCategory(cat.id)} onMouseLeave={() => setHoveredCategory(null)}>
            <Link href={`/category/${cat.attributes.slug}`}>
              {cat.attributes.name}
              {cat.attributes.sub_categories.data.length > 0 && <IoIosArrowDown style={{ color: '#000', fontSize: '15px', margin: " -4px 2" }} />}
            </Link>
            {hoveredCategory === cat.id && cat.attributes.sub_categories.data.length > 0 && (
              <ul className="sub-categories">
                {cat.attributes.sub_categories.data.map(subCat => (
                  <li key={subCat.id}><Link href={`/category/${cat.attributes.slug}/${subCat.attributes.slug}`}>{subCat.attributes.subName}</Link></li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="search" onClick={toggleSearch}>
        {showSearch ? <IoMdClose /> : <IoMdSearch />}
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
  );
}

export default Header;
