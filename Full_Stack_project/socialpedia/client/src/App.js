import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import {Home, Login, Register, ResetPassword, Profile} from "./pages"

function Layout() {
  const user = null;
  const location = useLocation();

  return user?.token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}
function App() {
  return (
    <div className="w-full min-h-[100vh]">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
