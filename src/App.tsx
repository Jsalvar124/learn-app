
import { Header } from './layout/Header';
import { Login } from './pages/Login';
import { Footer } from './layout/Footer';
import { JoinUs } from './pages/JoinUs';
import { StudentAccount } from './pages/StudentAccount';
import { useState } from 'react';
import avatar from './assets/student-avatar-cropped.png'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Registration } from './pages/Registration';
import { Home } from './pages/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useState({
    userName: 'Marta_st',
    email: 'marta_12334@gmail.com',
    avatar: avatar,
  });


  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        onSignIn={() => setIsLoggedIn(true)}
        onSignOut={() => setIsLoggedIn(false)}
      />
      <main className="main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/my-account" element={<StudentAccount />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/training" element={<div>Training</div>} />
          <Route path="/change-password" element={<div>Change Password</div>} />
          <Route path="/registration-verification" element={<div>Registration Verification</div>} />
          <Route path="/" element={<Navigate to="/home" />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
