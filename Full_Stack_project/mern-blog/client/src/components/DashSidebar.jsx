import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOutStart, signOutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function DashSidebar() {
	const location = useLocation();
	const [tab, setTab] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	 const { currentUser } = useSelector((state) => state.user);

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
					{currentUser && currentUser.isAdmin && (
						<Link to="/dashboard?tab=dash">
							<Sidebar.Item
								active={tab === "dash" || !tab}
								icon={HiChartPie}
								as="div"
							>
								Dashboard
							</Sidebar.Item>
						</Link>
					)}
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
					{currentUser.isAdmin && (
						<Link to="/dashboard?tab=posts">
							<Sidebar.Item
								active={tab === "posts"}
								icon={HiDocumentText}
								as="div"
							>
								Posts
							</Sidebar.Item>
						</Link>
					)}
					{currentUser.isAdmin && (
						<>
							<Link to="/dashboard?tab=users">
								<Sidebar.Item
									active={tab === "users"}
									icon={HiOutlineUserGroup}
									as="div"
								>
									Users
								</Sidebar.Item>
							</Link>
							<Link to="/dashboard?tab=comments">
								<Sidebar.Item
									active={tab === "comments"}
									icon={HiAnnotation}
									as="div"
								>
									Comments
								</Sidebar.Item>
							</Link>
						</>
					)}
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
