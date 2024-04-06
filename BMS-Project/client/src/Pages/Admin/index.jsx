import React from 'react'
import { Tabs } from "antd";
import PageTitle from '../../components/PageTitle'
import MovieList from './MovieList';

export default function Admin() {
  return (
    <div>
      <PageTitle title = "Admin" />
      <Tabs defaultActiveKey='movies' >
        <Tabs.TabPane tab = "Movies" key= "movies" >
          <MovieList/>
        </Tabs.TabPane>
        <Tabs.TabPane tab = "Theatres" key = "theatres" >
        Theatre List
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
