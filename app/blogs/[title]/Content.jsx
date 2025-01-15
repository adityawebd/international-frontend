"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircleUserRound, User } from "lucide-react";
import Image from "next/image";
import Head from "next/head";
import "react-quill/dist/quill.snow.css";
import Navbar2 from "../../components/Navbar2";
import Navbar3 from "../../components/Navbar3";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";

// export const metadata: Metadata = {
//   title: 'Invoices',
// };
export default function Content({ blogInfo }) {
  // const [blogInfo, setBlogInfo] = useState([]);

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  function formatDate(dateString) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <head>
        <title>{blogInfo?.metatitle || "International Gift"}</title>
        <meta name="description" content={blogInfo?.metadesc || ""} />
        <meta
          property="og:title"
          content={blogInfo?.metatitle || ""}
          key="title"
        />
        <meta property="og:description" content={blogInfo?.metadesc || ""} />
        <meta property="og:image" content={blogInfo?.cardImage || ""} />
        <meta
          name="author"
          content={blogInfo?.author || "International Gift"}
        />
        <meta name="keywords" content={blogInfo?.keywords || ""} />
        <meta
          property="og:url"
          content={`http://internationalgift.com/blogs/view/${
            blogInfo?.url || ""
          }`}
        />
        <link
          rel="canonical"
          href={`http://internationalgift.com/blogs/view/${
            blogInfo?.url || ""
          }`}
        />
      </head>

      <body>
        <Navbar2 />
        <Navbar3 />
        <Breadcrumbs page_title="blogs" page_title2={blogInfo?.url} />

        <div className="mx-auto lg:px-32 px-6 ">
          <img
            src={blogInfo?.cardImage}
            loading="lazy"
            alt="Card image"
            className="mt-5 rounded lg:w-[80%] lg:h-[700px] h-[600px] w-full md:h-[500px] mx-auto"
          />

          <div className="flex flex-col justify-center items-center mt-10 w-[70%] mx-auto">
            <p className="text-sm">BLOG</p>
            <h1 className="text-4xl font-semibold text-black mt-4 max-sm:text-2xl text-center">{blogInfo?.title}</h1>
          </div>

          <div className="">
            {/* <p className="text-sm text-gray-500">{blogInfo?.author}</p> */}
            <div className="flex justify-center items-center mt-4 flex-wrap">
              <p className="text-sm text-gray-500 flex items-center">
                <User size={16} /> Published by{" "}
                {blogInfo?.author ? blogInfo?.author : "N/A"}
              </p>
              <span className="px-2 text-slate-400">|</span>
              <p className="text-sm text-gray-500">
                {formatDate(blogInfo?.createdAt)}
              </p>
            </div>

            <hr class="h-px my-8 dark:bg-gray-700" />

            <div
              className="text-lg blog_content"
              style={{ all: "initial" }}
              dangerouslySetInnerHTML={{ __html: blogInfo?.content }}
            />
          </div>
        </div>
        <Footer />
      </body>
    </>
  );
}
