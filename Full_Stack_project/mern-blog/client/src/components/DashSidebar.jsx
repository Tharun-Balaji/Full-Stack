import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOutStart, signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

function DashSidebar() {
	const location = useLocation();
	const [tab, setTab] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");

		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);

		const handleSignOut = async () => {
			dispatch(signOutStart());

			try {
				const res = await fetch("/api/user/signout", {
					method: "POST",
				});

				const data = await res.json();

				if (!res.ok) {
					console.log(data.message);
				} else {
					dispatch(signOutSuccess());
					navigate("/sign-in");
				}
			} catch (error) {
				console.log(error.message);
			}
		};

	return (
		<Sidebar className="w-full md:w-56">
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Link to="/dashboard?tab=profile">
						<Sidebar.Item
							active={tab === "profile"}
							icon={HiUser}
							label="User"
							labelColor="dark"
							as="div"
						>
							Profile
						</Sidebar.Item>
					</Link>
					<Sidebar.Item
						icon={HiArrowSmRight}
						className="cursor-pointer"
						onClick={handleSignOut}
					>
						Sign Out
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
}

export default DashSidebar;
