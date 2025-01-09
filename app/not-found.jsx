"use client";

import Navbar2 from "./components/Navbar2";
import Navbar3 from "./components/Navbar3";
import Footer from "./components/Footer";

import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <Navbar2 />
      <Navbar3 />
      <div className="container">
        <div className="flex justify-center items-center h-[80vh] flex-col text-center">
          <h1 className="text-7xl font-bold">404 Error</h1>
          <p className="green_font font-semibold text-lg">Page Not Available</p>
          <Link href="/" className="bg_green py-2 px-4 text-white mt-3 text-sm">
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
