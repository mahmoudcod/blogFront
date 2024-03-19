
import Header from '../component/header'
import Grid from '../component/grid'
import Categories from '../component/categories'
import Recent from '../component/recent'
import CatOne from '../component/catOne'
import CatTwo from '../component/catTwo'
import CatThree from '../component/catThree'
import CatFour from '../component/catFour'
import Hint from '../component/hint'
import Footer from '../component/footer'
import Loader from '../component/loading'
import React, { useState, useEffect } from 'react';

 




function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch('https://demoblog-h71e.onrender.com/graphql');
        // Simulating API loading with a setTimeout
        setTimeout(() => {
          setIsLoading(false);
        }, response); // Replace this with your desired timeout duration


      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();

    // Clean up the effect
    return () => {
      clearTimeout();
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

export default Home;
