import React, { useState } from 'react';
import Header from '../components/Header';
import ExploreMenu from '../components/ExploreMenu';
import FoodDisplay from '../components/FoodDisplay';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <div>
        <Header />
        <div id="menu">
          <ExploreMenu category={category} setCategory={setCategory} />
        </div>
        <FoodDisplay category={category} />
        <div id="mobile-app">
          <AppDownload />
        </div>
        <div id="contact-us">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
