import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from './pages/SignUp';
import DashBoard from './pages/DashBoard';
import Projects from './pages/Projects';

export default function App() {
  return (
		<BrowserRouter>
			<Routes>
        <Route path="/"  component={<Home />} />
        <Route path="/about" component={<About />} />
        <Route path="/sign-in" component={<SignIn />} />
        <Route path="/sign-up" component={<SignUp />} />
        <Route path="/dashboard" component={<DashBoard />} />
        <Route path="/projects" component={<Projects />} />
			</Routes>
		</BrowserRouter>
  );
}
