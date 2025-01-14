"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { EditIcon, MoveRight } from "lucide-react";
import { MdDelete } from "react-icons/md";

import Navbar2 from "../components/Navbar2";
import Navbar3 from "../components/Navbar3";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import BackToTopButton from "../components/BackToTopButton";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/blogs`);
        const result = await res.json();
        if (result.success) {
          setBlogs(result.data);
          setFilteredBlogs(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(blogs);

  return (
    <>
      <head>
        <title>International Gift Blogs</title>
        <meta name="description" content="Blogs from International Gift." />
      </head>

      <body>
        <Navbar2 />
        <Navbar3 />
        <Breadcrumbs page_title="Our BLogs" />
        <div className="container py-5 lg:px-16 px-6">
          <div className="hero_blogs">
            <h2 className="text-3xl font-semibold mb-3">Our Blogs</h2>
          </div>
          <div className="blogs_card_wrapper flex flex-wrap gap-4">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="blogs_card rounded shadow-md border border-slate-500 p-3 h-[350px] w-[280px] bg-white m-2 max-sm:w-full"
                >
                  <img
                    src={
                      blog.cardImage || "https://via.placeholder.com/300x200"
                    } // Fallback image URL
                    alt={blog.title}
                    className="rounded h-[75%] w-full border mb-2"
                  />
                  <Link
                    href={"/blogs/" + blog.url}
                    className="text-xl mt-3 text-black font-semibold"
                  >
                    {blog.title.length > 20
                      ? blog.title.slice(0, 20) + "..."
                      : blog.title}
                  </Link>
                  <div className="text-sm text-slate-500 font-medium">
                    Date: {new Date(blog.date).toLocaleDateString()}
                  </div>
                  <Link
                    href={"/blogs/" + blog.url}
                    className="rounded-full py-1 text-xs text-black flex items-center hover:text-violet-500"
                  >
                    Read this blog{" "}
                    <span className="ml-2">
                      <MoveRight size={14} />
                    </span>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No blogs found</div>
            )}
          </div>
        </div>

        <Footer />
      </body>
    </>
  );
}
