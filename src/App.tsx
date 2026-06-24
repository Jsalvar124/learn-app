
import { Header } from './layout/Header';
import { Login } from './pages/Login';
import { Footer } from './layout/Footer';
import { JoinUs } from './pages/JoinUs';
import { StudentAccount } from './pages/StudentAccount';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Registration } from './pages/Registration';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Trainings } from './pages/Trainings';
import { ChangePassword } from './pages/ChangePassword';

function App() {

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/my-account" element={<StudentAccount />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/change-password" element={<ChangePassword />} />
          {/* <Route path="/registration-verification" element={<div>Registration Verification</div>} /> */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
