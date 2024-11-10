
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


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
	



  return <div>Search</div>;
}
