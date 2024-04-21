import React, { useState, useEffect } from 'react';
import Header from '../component/header';
import Grid from '../component/grid';
import Categories from '../component/categories';
import Recent from '../component/recent';
import CatOne from '../component/catOne';
import CatTwo from '../component/catTwo';
import CatThree from '../component/catThree';
import CatFour from '../component/catFour';
import Hint from '../component/hint';
import Footer from '../component/footer';

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate page loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000); // Adjust the delay time as needed or remove it if not necessary

    return () => clearTimeout(timer);
  }, []);

  return (
    <>

      <div className={isLoaded ? '' : 'fade-out'}>
        <Header />
        <Grid />
        <Categories />
        <Recent />
        <CatOne />
        <CatTwo />
        <CatThree />
        <CatFour />
        <Hint />
        <Footer />
      </div>
    </>
  );
}

export default Home;
