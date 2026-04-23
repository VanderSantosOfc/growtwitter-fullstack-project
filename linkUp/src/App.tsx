import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Profile } from './pages/Profile'; 
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { useAppSelector } from './store/hooks';

export function App() {
  const { token } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/home" />} />
        
        {/* Se NÃO tiver token, bloqueia o acesso ao conteúdo */}
        <Route element={token ? <Layout /> : <Navigate to="/login" />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}