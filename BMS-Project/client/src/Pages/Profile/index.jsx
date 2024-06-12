import PageTitle from "../../components/PageTitle"
import {Tabs} from "antd";
import TheatresList from "./TheatreList";
import Bookings from "./Bookings";

export default function Profile() {
  // return (
  //   <div>
  //     <PageTitle title="Profile" />

  //     <Tabs defaultActiveKey="1">
  //       <Tabs.TabPane tab="Bookings" key="1">
  //         <Bookings />
  //       </Tabs.TabPane>
  //       <Tabs.TabPane tab="Apply for Theatre" key="2">
  //         <TheatresList/>
  //       </Tabs.TabPane>
  //     </Tabs>
  //   </div>
  // )
  const items = [
		{
			key: "1",
			label: "Theatres",
			children: <TheatresList />,
		},
		{
			key: "2",
			label: "Bookings",
			children: <Bookings />,
		},
		// {
		//   key: '3',
		//   label: 'Tab 3',
		//   children: 'Content of Tab Pane 3',
		// },
  ];

  return (
		<>
			<PageTitle title="Profile" />
			<Tabs defaultActiveKey="2" items={items} />
		</>
  );
}
