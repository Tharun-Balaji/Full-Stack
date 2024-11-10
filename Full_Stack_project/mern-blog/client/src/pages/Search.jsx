
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Select, TextInput } from 'flowbite-react';


export default function Search() {

   const [sidebarData, setSidebarData] = useState({
		searchTerm: "",
		sort: "desc",
		category: "uncategorized",
   });
  
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [showMore, setShowMore] = useState(false);

   const location = useLocation();

  const navigate = useNavigate();
  
  useEffect(() => {
     
		// Get the URL parameters from the current URL
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromUrl = urlParams.get("searchTerm");
		const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

		// If any of the URL parameters have changed, update the state
		if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
			setSidebarData({
				...sidebarData,
				searchTerm: searchTermFromUrl,
				sort: sortFromUrl,
				category: categoryFromUrl,
			});
		}

		// Fetch the posts from the server based on the current URL parameters
		const fetchPosts = async () => {
			setLoading(true);
			// Create the search query string from the URL parameters
			const searchQuery = urlParams.toString();
			// Fetch the posts from the server
			const res = await fetch(`/api/post/getposts?${searchQuery}`);
			if (!res.ok) {
				// If the request failed, stop loading and return
				setLoading(false);
				return;
			}
			if (res.ok) {
				// If the request was successful, update the state with the posts
				// and set the loading state to false
				const data = await res.json();
				setPosts(data.posts);
				setLoading(false);
				// If there are 9 posts, show the "Show More" button
				if (data.posts.length === 9) {
					setShowMore(true);
				} else {
					// Otherwise, hide the "Show More" button
					setShowMore(false);
				}
			}
		};
		fetchPosts();
	}, [location.search]);
	

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission behavior
		const urlParams = new URLSearchParams(location.search); // Get the current URL parameters
		urlParams.set("searchTerm", sidebarData.searchTerm); // Set the search term in the query parameters
		urlParams.set("sort", sidebarData.sort); // Set the sort order in the query parameters
		urlParams.set("category", sidebarData.category); // Set the category in the query parameters
		const searchQuery = urlParams.toString(); // Convert the URL parameters to a query string
		navigate(`/search?${searchQuery}`); // Navigate to the new URL with the updated query parameters
	};

	const handleChange = (e) => { };



	return (
		<div className="flex flex-col md:flex-row">
			<div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
				<form className="flex flex-col gap-8" onSubmit={handleSubmit}>
					<div className="flex   items-center gap-2">
						<label className="whitespace-nowrap font-semibold">
							Search Term:
						</label>
						<TextInput
							placeholder="Search..."
							id="searchTerm"
							type="text"
							value={sidebarData.searchTerm}
							onChange={handleChange}
						/>
					</div>
					<div className="flex items-center gap-2">
						{" "}
						<label className="font-semibold">Sort:</label>
						<Select
							onChange={handleChange}
							value={sidebarData.sort}
							id="sort"
						>
							<option value="desc">Latest</option>
							<option value="asc">Oldest</option>
						</Select>
					</div>
					<div className="flex items-center gap-2">
						<label className="font-semibold">Category:</label>
						<Select
							onChange={handleChange}
							value={sidebarData.category}
							id="category"
						>
							<option value="uncategorized">Uncategorized</option>
							<option value="reactjs">React.js</option>
							<option value="nextjs">Next.js</option>
							<option value="javascript">JavaScript</option>
						</Select>
					</div>
					<Button
						type="submit"
						outline
						gradientDuoTone="purpleToPink"
					>
						Apply Filters
					</Button>
				</form>
			</div>
		</div>
	);
}
