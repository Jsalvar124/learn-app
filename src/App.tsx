
import { Header } from './layout/Header';
// import { Login } from './pages/Login';
import { Footer } from './layout/Footer';
// import { JoinUs } from './pages/JoinUs';
import { StudentAccount } from './pages/StudentAccount';
import { useState } from 'react';
import avatar from './assets/student-avatar-cropped.png'

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
