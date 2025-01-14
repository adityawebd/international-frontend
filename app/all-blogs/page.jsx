import React from "react";
import Navbar2 from "../components/Navbar2";
import Navbar3 from "../components/Navbar3";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import BackToTopButton from "../components/BackToTopButton";

import { GoDotFill } from "react-icons/go";

const page = () => {
  return (
    <div>
      <Navbar2 />
      <Navbar3 />
      <Breadcrumbs page_title="All Blogs" />

      <div className="lg:px-16 px-6 py-5">
        <div className="row">
          <div className="">
            <h2 className="text-3xl font-semibold text-black mb-4">
              All Blogs
            </h2>

            {/* <img loading='lazy' className='rounded-xl mt-4 mb-5' src="/assets/terms.jpg" alt="" /> */}
            <div className="h3 mb-3">
              International Gift: Leading Destination for Global Gifts
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default page;
