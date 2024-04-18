import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/foodDisplay/FoodDisplay'
import AppDownload from '../../components/appDownload/AppDownload'
import Location from '../location/Location';

const Home = () => {

  const [category, setCategory] = useState("All");
  
  return (
    <div >
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category}/>
        <AppDownload/><br/>
        <Location/>
      
    </div>
  )
}

export default Home