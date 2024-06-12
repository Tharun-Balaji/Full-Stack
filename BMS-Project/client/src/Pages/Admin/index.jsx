import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/PageTitle";
import MovieList from "./MovieList";
import TheatresList from "./TheatreList";

export default function Admin() {
	// return (
	//   <div>
	//     <PageTitle title = "Admin" />
	//     <Tabs defaultActiveKey='movies' >
	//       <Tabs.TabPane tab = "Movies" key= "movies" >
	//         <MovieList/>
	//       </Tabs.TabPane>
	//       <Tabs.TabPane tab = "Theatres" key = "theatres" >
	//       <TheatresList/>
	//       </Tabs.TabPane>
	//     </Tabs>
	//   </div>
	// )

	const tabItems = [
		{
			key: "1",
			label: "Movies",
			children: <MovieList />,
		},

		{
			key: "2",
			label: "Theatres",
			children: <TheatresList />,
		},
	];

	return (
		<div>
			<PageTitle title="Admin" />
      <Tabs items={tabItems} />
		</div>
	);
}
