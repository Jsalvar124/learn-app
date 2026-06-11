
import { Header } from './layout/Header';
import { Login } from './pages/Login';
import { Footer } from './layout/Footer';
import { Registration } from './pages/Registration';
import { JoinUs } from './pages/JoinUs';
import { Box } from './components/common/Box';
import boxImg from './assets/box-img3-crop.png'


function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        {/* page content */}
        {/* <Login /> */}
        <JoinUs />
      </main>
      <Footer />
    </div>
  );
}

export default App;
