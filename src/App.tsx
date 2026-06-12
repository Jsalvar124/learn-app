
import { Header } from './layout/Header';
// import { Login } from './pages/Login';
import { Footer } from './layout/Footer';
// import { JoinUs } from './pages/JoinUs';
import { StudentAccount } from './pages/StudentAccount';


function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        {/* page content */}
        {/* <Login /> */}
        <StudentAccount />
        {/* <JoinUs /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
