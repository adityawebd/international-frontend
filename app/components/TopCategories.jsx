import React, { useState } from "react";
import Link from "next/link";

const TopCategories = () => {
  const [activeTab, setActiveTab] = useState("vertical-tab-with-border-1");

  const tabData = [
    {
      id: "1",
      category: "Religious Idol",
      img: "religious_idol.png",
      hoverImg: "religious_idol_hover.png",
      btn_link: "#1",
      img_src: "/assets/images/cat-banner/cat-11.jpg",
      categoryLink: "/contact-us",
    },
    {
      id: "2",
      category: "Decorative Item",
      img: "decorative_item.png",
      hoverImg: "decorative_item_hover.png",
      btn_link: "#2",
      img_src: "/assets/images/cat-banner/gift_bg.jpg",
      categoryLink: "/contact-us",
    },
    {
      id: "3",
      category: "Gift Items",
      img: "cat_3.png",
      hoverImg: "cat_3_1.png",
      btn_link: "#3",
      img_src: "/assets/images/cat-banner/cat-22.jpg",
      categoryLink: "/contact-us",
    },
    {
      id: "4",
      category: "Car Idol",
      img: "car_idol.png",
      hoverImg: "car_idol_hover.png",
      btn_link: "#4",
      img_src: "/assets/images/cat-banner/car_idol_bg.jpg",
      categoryLink: "/contact-us",
    },
  ];

 

  const handleTabClick = (tabId, btn_link) => {
    setActiveTab(tabId);
    window.location.href = btn_link;
  };

  return (
    <div>
      <div className="top_categories pt-5 pb-3">
        <h2
          data-aos="fade-up"
          data-aos-duration="500"
          className="mb-2 font-semibold text-4xl text-center light_black_font"
        >
          Top Categories
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-center text-sm light_black_font"
        >
          Browse The Collection of Top Products
        </p>

        <div className="container">
          <div className="hidden lg:block ">
            <div className="tabs_wrapper mt-4">
              <div className="flex gap-2">
                <div className="w-1/4">
                  <nav
                    className="grid gap-2 grid-cols-2 h-full"
                    aria-label="Tabs"
                    role="tablist"
                  >
                    {tabData.map(
                      ({ id, category, img, hoverImg, btn_link }) => (
                        <button
                          key={id}
                          type="button"
                          className={`tab-button flex-col gap-2 ${
                            activeTab === `vertical-tab-with-border-${id}`
                              ? "active"
                              : ""
                          }`}
                          id={`vertical-tab-with-border-item-${id}`}
                          onClick={() =>
                            handleTabClick(
                              `vertical-tab-with-border-${id}`,
                              btn_link
                            )
                          }
                          aria-controls={`vertical-tab-with-border-${id}`}
                          role="tab"
                          aria-selected={
                            activeTab === `vertical-tab-with-border-${id}`
                          }
                        >
                          <figure className="hover-image">
                            <img
                              loading="lazy"
                              className="default_img"
                              src={`/assets/images/icons/${img}`}
                              alt={`${category} Image`}
                            />
                            <img
                              loading="lazy"
                              className="hovered_img"
                              src={`/assets/images/icons/${hoverImg}`}
                              alt={`${category} Hover Image`}
                            />
                          </figure>
                          <div className="tab_btn_text text-center">
                            <div className="category">{category}</div>
                          </div>
                        </button>
                      )
                    )}
                  </nav>
                </div>

                <div className="w-3/4">
                  {tabData.map(({ id, img_src, btn_link, categoryLink }) => (
                    <div
                      key={id}
                      id={`vertical-tab-with-border-${id}`}
                      className={`tab_content ${
                        activeTab === `vertical-tab-with-border-${id}`
                          ? ""
                          : "hidden"
                      }`}
                      role="tabpanel"
                      aria-labelledby={`vertical-tab-with-border-item-${id}`}
                    >
                      <img loading="lazy" src={img_src} alt="" />

                      <div className="show_all_collection_btn">
                        <div className="all_collection_card_btn">
                          <a className="uppercase text-sm" href={categoryLink}>
                            View all
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden max-sm:block md:block mt-4 ">
            <div className="grid gap-2 grid-cols-1">
              {tabData.map((data) => {
                return (
                  <Link key={data.id} href={data.categoryLink}>
                    <div className="relative w-full overflow-hidden">
                      <img
                        src={data.img_src}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-0 left-0 inset-0 bg-black/70 hover:bg-black/40 transition duration-500 text-center z-10 text-white flex flex-col justify-center items-center h-full">
                        <h2 className="lg:text-4xl md:text-3xl max-sm:text-xl text-2xl  uppercase tracking-widest">
                          {" "}
                          {data.category}{" "}
                        </h2>
                        <p className="lg:text-7xl md:text-5xl max-sm:text-4xl text-4xl font-bold uppercase tracking-widest">
                          {" "}
                          {data.discount}{" "}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
