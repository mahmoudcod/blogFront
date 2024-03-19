import React, { useState, useEffect } from 'react';
import { TiThMenu } from 'react-icons/ti';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
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
  };


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
            <li key={cat.id}>{cat.attributes.name}</li>
          ))}
        </ul>
        <div className="search">
          <IoMdSearch />
        </div>
        {isSmallScreen && (
          <div className="menu-icon" onClick={toggleMenu}>
            {showMenu ? <IoMdClose /> : <TiThMenu />}
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;

