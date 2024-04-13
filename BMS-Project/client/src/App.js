import { useSelector } from 'react-redux';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Admin from './Pages/Admin';
import Home from './Pages/Home/index';
import Login from './Pages/Login/index';
import Profile from './Pages/Profile';
import Register from './Pages/Register/index';
import TheatresForMovie from './Pages/TheatresForMovie/index';
import ProtectedRoute from './components/protectedRoute';
import "./stylesheets/alignments.css";
import "./stylesheets/custom.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/sizes.css";
import "./stylesheets/theme.css";

function App() {

  const {loading} = useSelector( (state) => state.loaders)
  // console.log(loading)

  return (
    
    <div>
      {
      loading && (
        <div className="loader-parent">
        <div className="loader"></div>
      </div>
      )
    }
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
           <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <TheatresForMovie />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
