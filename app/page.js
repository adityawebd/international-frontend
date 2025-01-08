'use client'
import { Main } from "next/document";
import { CurrencyProvider } from './CurrencyContext';

import Image from "next/image";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Navbar3 from "./components/Navbar3";
import HeroSection from "./components/HeroSection";
import MonthlyBestSell from "./components/MonthlyBestSell";
import NewArrival from "./components/NewArrival";
import AllCollection from "./components/AllCollection";
import BestSeller from "./components/BestSeller";
import TopCategories from "./components/TopCategories";
import ProductTimer from "./components/ProductTimer";
import PromisesBanner from "./components/PromisesBanner";
import WoodStatue from "./components/WoodStatue";
import ClientBrands from "./components/ClientBrands";
import Testimonials from "./components/Testimonials";
import ExploreFeeds from "./components/ExploreFeeds";
import NewCom from "./components/NewCom";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import WhatsappButton from "./components/WhatsappButton";

export default function Home() {
  return (
    <main>
      <CurrencyProvider>
        {/* <Navbar/> */}
        <Navbar2 />
        <Navbar3 />
        <HeroSection/>
        <MonthlyBestSell />
        <NewArrival title="Monthly Best Sell" />
        <AllCollection />
        <BestSeller />
        <TopCategories />
        {/* <ProductTimer /> */}
        <PromisesBanner />
        <WoodStatue />
        {/* <ClientBrands /> */}
        {/* <Testimonials /> */}
        {/* <ExploreFeeds /> */}
        <Footer />
        <BackToTopButton />
        <WhatsappButton />
      </CurrencyProvider>
    </main>
  );
}
