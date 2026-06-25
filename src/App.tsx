
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
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from './store/slices/userSlice';
import { decodeToken } from './helpers/decodeToken';
import type { AppDispatch } from './store';
import { getUserProfileThunk } from './store/thunks/userThunk';

function App() {
    const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = decodeToken(token);

      dispatch(setUserData({
        username: decoded.sub,
        role: decoded.userType,
        token,
      }));

      dispatch(getUserProfileThunk({ username: decoded.sub, role: decoded.userType }));
    } catch (err) {
      // token is malformed/corrupted — clear it rather than leaving bad state
      localStorage.removeItem("token");
    }
  }, []); // run once, on mount

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
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
