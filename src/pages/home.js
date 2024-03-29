
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
import { Helmet, HelmetProvider } from 'react-helmet-async';
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
          <HelmetProvider>
            <Helmet>
              <title>اسواق المال</title>
              <meta name="description" content="إن المعلومات الاستثمارية والتعليقات والأفكار الواردة هنا ليست ضمن الاستشارات أو التوصيات الإستثمارية. والغرض منها هو توضيح الأفكار وتسهيلها دون الأخذ بها كتوصيات مالية. تستند التعليقات الواردة والشروحات على الآراء الشخصية لمن يقدمون المشورة وقد لا تكون هذه الآراء مناسبة لوضعك المالي والإستثماري وتفصيلاتك المتعلقة بالمخاطرة والعائد. بالنسبة للمعلومات المكتوبة والرسوم التوضيحية ضمن نطاق موقعنا، فإنها قد كُتبت لإثراء الثقافة المالية والحصول على معلومات تُفيد المستخدم العربي، وهي تخلي مسئوليتنا من أي قرار استثماري وما قد يترتب عليه.
" />
              <meta property="og:title" content="My Blog" />
              <meta property="og:description" content="إن المعلومات الاستثمارية والتعليقات والأفكار الواردة هنا ليست ضمن الاستشارات أو التوصيات الإستثمارية. والغرض منها هو توضيح الأفكار وتسهيلها دون الأخذ بها كتوصيات مالية. تستند التعليقات الواردة والشروحات على الآراء الشخصية لمن يقدمون المشورة وقد لا تكون هذه الآراء مناسبة لوضعك المالي والإستثماري وتفصيلاتك المتعلقة بالمخاطرة والعائد. بالنسبة للمعلومات المكتوبة والرسوم التوضيحية ضمن نطاق موقعنا، فإنها قد كُتبت لإثراء الثقافة المالية والحصول على معلومات تُفيد المستخدم العربي، وهي تخلي مسئوليتنا من أي قرار استثماري وما قد يترتب عليه.
" />
              <meta property="og:type" content="website" />
              {/* <meta property="og:url" content="http://www.myblog.com" /> */}
              <meta property="og:image" content="../public/Untitled.png" />
            </Helmet>
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
          </HelmetProvider>
        </>
      )}
    </>
  );
}

export default Home;
