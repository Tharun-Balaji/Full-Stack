import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Header, OnlyAdminPrivateRoute, PrivateRoute } from "./components";
import { About, CreatePost, DashBoard, Home, Projects, SignIn, SignUp, UpdatePost } from "./pages";


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
				<Route element={<OnlyAdminPrivateRoute />}>
					<Route path="/create-post" element={<CreatePost />} />
					<Route
						path="/update-post/:postId"
						element={<UpdatePost />}
					/>
				</Route>
				<Route path="/projects" element={<Projects />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}
