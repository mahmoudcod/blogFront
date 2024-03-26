import React, { useState, useEffect } from 'react';
import { TiThMenu } from 'react-icons/ti';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';
import '../style/header.css';
import Logo from './logo'
import { useQuery, gql } from '@apollo/client';

const CatQurey = gql`
  query Getcat {
    categories{
        data{
            id
            attributes{
                name
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
  }

  const { loading, error, data } = useQuery(CatQurey);

  if (loading) return null;
  if (error) return <p>Error....</p>;

  const category = data.categories.data;

  return (
    <div className='container'>
      <header className="header">
        <Logo />
        <ul className={`nav ${isSmallScreen && showMenu ? 'show-menu' : ''}`}>
          {category.map(cat => (
            <li key={cat.id}> <Link to={`/category/${cat.id}`}> {cat.attributes.name}  </Link></li>
          ))}
        </ul>
        <div className="search">
          <IoMdSearch onClick={toggleSearch} />
          <input
            type="text"
            placeholder="Search..."
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
