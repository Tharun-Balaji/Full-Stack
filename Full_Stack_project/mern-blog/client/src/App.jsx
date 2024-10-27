import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Header, PrivateRoute } from "./components";
import { About, DashBoard, Home, Projects, SignIn, SignUp } from "./pages";

export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route element={<PrivateRoute />}>
					<Route path="/dashboard" element={<DashBoard />} />
				</Route>
				<Route path="/projects" element={<Projects />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}
