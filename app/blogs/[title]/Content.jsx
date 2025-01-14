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

        <div className="container lg:px-32 py-5">
          <div className="flex max-sm:flex-col">
            <div className="w-full">
              <div className="flex justify-center w-full p-3">
                <img
                  src={blogInfo?.cardImage}
                  loading="lazy"
                  alt="Card image"
                  className="mt-5 rounded w-[100%]"
                />
              </div>

              <div className="flex-row justify-center">
                <div className="container mx-auto">
                  <h1 className="text-3xl font-bold mb-3 text-center">
                    {blogInfo?.title}
                  </h1>
                  {/* <p className="text-sm text-gray-500">{blogInfo?.author}</p> */}
                  <div className="flex justify-center items-center">
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
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </>
  );
}
