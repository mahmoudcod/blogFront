import React, { useState, useEffect } from 'react';
import Layout from '../src/component/layout';
import Header from '../src/component/header';
import Grid from '../src/component/grid';
import Categories from '../src/component/categories';
import Recent from '../src/component/recent';
import CatOne from '../src/component/catOne';
import CatTwo from '../src/component/catTwo';
import CatThree from '../src/component/catThree';
import CatFour from '../src/component/catFour';
import Hint from '../src/component/hint';
import Footer from '../src/component/footer';

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
