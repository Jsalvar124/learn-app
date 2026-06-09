
import { Header } from './layout/Header';
import { Login } from './pages/Login';
import { Footer } from './layout/Footer';
import { Registration } from './pages/Registration';
import * as Icons from 'nucleo-core-essential-outline-24';

function App() {
console.log(Object.keys(Icons).filter(name => 
  name.toLowerCase().includes('ellipsis') || 
  name.toLowerCase().includes('more') ||
  name.toLowerCase().includes('circle')
));
  return (
    <>
      <Header />
      {/* <Login /> */}
      <Registration role='student'/>
      {/* <Registration role='trainer'/> */}
      <Footer />
    </>
  );
}

export default App;
