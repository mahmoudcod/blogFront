
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
 


function Home() {
  return (
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
  );
}

export default Home;
