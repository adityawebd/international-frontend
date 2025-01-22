import React from "react";
import AllCollectionCard from "./AllCollectionCard";
import { useEffect, useState } from "react";
import axios from "axios";

const allCollection = [
  {
    title: "New Arrivals",
    tagline: "Gold Special Gifts",
    discount_text: "",
    discount: "30",
    img_src: "/assets/image/cat-1-1-removebg-preview.png",
    order_link: "/products/Diwali%20Gift",
  },
  {
    title: "New Trending",
    tagline: "Best Gold Gifts",
    discount_text: "Buy any 3 items & get",
    discount: "30",
    img_src: "/assets/image/cat-1-2-removebg-preview.png",
    order_link: "/products/Birthday%20Gift",
  },
];

const AllCollection = () => {
  const [allCollection, setAllCollections] = useState([]);
  useEffect(() => {
    fetchAllCollections();
  }, []);

  const fetchAllCollections = async () => {
    try {
      const res = await axios.get("/api/AllCollection");
      setAllCollections(res.data.data);
    } catch (error) {
      console.error("Failed to fetch AllCollections:", error);
    }
  };
  return (
    <div>
      <div className="all_collection py-5" id="all_collection">
        <h2
          data-aos="fade-up"
          data-aos-duration="600"
          className="mb-4 font-semibold text-4xl text-center light_black_font"
        >
          Shop All Collection
        </h2>

        <div className="container">
          <div
            className="grid grid-cols-2 max-sm:grid-cols-1 gap-4"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {allCollection.map((data, index) => (
              <AllCollectionCard
                key={index}
                title={data.title}
                tagline={data.tagline}
                discount_text=""
                discount={data.discount}
                img_src={data.img_src}
                order_link={data.order_link}
              />
            ))}
            {/* <div className="row"></div>
            <div
              className="col-md-6"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <AllCollectionCard
                title="New Trending"
                tagline="Best Gold Gifts"
                discount_text="Buy any 3 items & get"
                discount="30"
                img_src="/assets/image/cat-1-2-removebg-preview.png"
                order_link="/products/Birthday%20Gift"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCollection;
