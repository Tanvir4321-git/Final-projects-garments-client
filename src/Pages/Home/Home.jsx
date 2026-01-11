import React from 'react';
import Banner from './Banner';
import OurProducts from './OurProducts';
import HowitWorks from './HowitWorks';
import CustomerReviews from './CustomerReviews';
import WhychosseUs from './WhychosseUs';

import OurTrustedPartener from './OurTrustedPartener';
import ManufacturingProcess from './ManufacturingProcess';
import ProductCategories from './ProductCategories';
import OurExpertise from './OurExpertise';
import FAQSection from './FAQSection';
// import review from '../../assets/review.webp'


// import Marquee from "react-fast-marquee";



const Home = () => {
    return (
        <div className=''>
                  <title>Haque Garments-Home</title>
            <Banner></Banner>
            <OurProducts></OurProducts>
            <ProductCategories></ProductCategories>
            <HowitWorks></HowitWorks>
        <ManufacturingProcess></ManufacturingProcess>
          <CustomerReviews></CustomerReviews>
          <WhychosseUs></WhychosseUs>
          <OurExpertise></OurExpertise>
          <OurTrustedPartener></OurTrustedPartener>
          <FAQSection></FAQSection>
     




        </div>
    );
};

export default Home;