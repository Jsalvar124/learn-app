
import { Header } from './layout/Header';
import { Login } from './pages/Login';
import { Footer } from './layout/Footer';
import { Registration } from './pages/Registration';

function App() {


  return (
    <>
      <Header />
      {/* <Login /> */}
      {/* <Registration role='student'/> */}
      <Registration role='trainer'/>

      <Footer />
    </>
  );
}

export default App;
