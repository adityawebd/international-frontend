import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const TopCategories = () => {
  const [tabData, setTabData] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // Initially null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/TopCollection`);
        const data = response.data.data;
        setTabData(data);
        if (data && data.length > 0) {
          setActiveTab(`vertical-tab-with-border-${data[0]._id}`); // Set activeTab based on the first item's _id
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTabClick = (tabId, discount) => {
    setActiveTab(tabId);
    document.getElementById(discount)?.scrollIntoView({ behavior: "smooth" });
  };

  if (!tabData || tabData.length === 0) {
    return <div>No categories found.</div>;
  }

  return (
    <div>
      <div className="top_categories pt-5 pb-3">
        <h2 className="mb-2 font-semibold text-4xl text-center light_black_font">
          Top Categories
        </h2>
        <p className="text-center text-sm light_black_font">
          Browse The Collection of Top Products
        </p>

        <div className="container">
          <div className="hidden lg:block">
            <div className="tabs_wrapper mt-4">
              <div className="flex gap-2">
                <div className="w-1/4">
                  <nav
                    className="grid gap-2 grid-cols-2 h-full"
                    aria-label="Tabs"
                    role="tablist"
                  >
                    {tabData.map(
                      ({ _id, title, tagline, discount_text, discount }) => (
                        <button
                          key={_id}
                          type="button"
                          className={`tab-button flex-col gap-2 ${
                            activeTab === `vertical-tab-with-border-${_id}`
                              ? "active"
                              : ""
                          }`}
                          id={`vertical-tab-with-border-item-${_id}`}
                          onClick={() =>
                            handleTabClick(`vertical-tab-with-border-${_id}`, discount)
                          }
                          aria-controls={`vertical-tab-with-border-${_id}`}
                          role="tab"
                          aria-selected={
                            activeTab === `vertical-tab-with-border-${_id}`
                          }
                        >
                          <figure className="hover-image">
                            <img
                              loading="lazy"
                              className="default_img"
                              src={`/assets/images/icons/${tagline}`}
                              alt={`${title} Image`}
                            />
                            <img
                              loading="lazy"
                              className="hovered_img"
                              src={`/assets/images/icons/${discount_text}`}
                              alt={`${title} Hover Image`}
                            />
                          </figure>
                          <div className="tab_btn_text text-center">
                            <div className="title">{title}</div>
                          </div>
                        </button>
                      )
                    )}
                  </nav>
                </div>

                <div className="w-3/4">
                  {tabData.map(({ _id, img_src, discount, order_link }) => (
                    <div
                      key={_id}
                      id={`vertical-tab-with-border-${_id}`}
                      className={`tab_content ${
                        activeTab === `vertical-tab-with-border-${_id}`
                          ? ""
                          : "hidden"
                      }`}
                      role="tabpanel"
                      aria-labelledby={`vertical-tab-with-border-item-${_id}`}
                    >
                      <img loading="lazy" src={img_src} alt={`${discount} image`} />

                      <div className="show_all_collection_btn">
                        <div className="all_collection_card_btn">
                          <Link legacyBehavior href={order_link}>
                            <a className="uppercase text-sm">View all</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden max-sm:block md:block mt-4">
            <div className="grid gap-2 grid-cols-1">
              {tabData.map((data) => (
                <Link legacyBehavior key={data._id} href={data.order_link}>
                  <div className="relative w-full overflow-hidden">
                    <img
                      src={data.img_src}
                      alt={`${data.title} image`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-0 left-0 inset-0 bg-black/70 hover:bg-black/40 transition duration-500 text-center z-10 text-white flex flex-col justify-center items-center h-full">
                      <h2 className="lg:text-4xl md:text-3xl max-sm:text-xl text-2xl uppercase tracking-widest">
                        {data.title}
                      </h2>
                      <p className="lg:text-7xl md:text-5xl max-sm:text-4xl text-4xl font-bold uppercase tracking-widest">
                        {data.discount}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
