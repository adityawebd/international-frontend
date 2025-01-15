import Link from "next/link";
import React, { useState, useEffect } from "react";

const HomeBlogs = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data.data));
  },[])

  // const blogs = [
  //   {
  //     _id: 1,
  //     image:
  //       "https://svastika.in/cdn/shop/articles/Which_Hanuman_Idol_is_Good_for_Home--_Blog_thumbnail_high_520x500_52ad9e2a-590c-4e42-8dba-31148fb70c69.jpg?v=1736850213&width=360",
  //     date: "January 10, 2025",
  //     title: "Which Hanuman Idol is Good for Home?",
  //   },
  //   {
  //     _id: 2,
  //     image:
  //       "https://svastika.in/cdn/shop/articles/Which_Hanuman_Idol_is_Good_for_Home--_Blog_thumbnail_high_520x500_52ad9e2a-590c-4e42-8dba-31148fb70c69.jpg?v=1736850213&width=360",
  //     date: "January 10, 2025",
  //     title: "Which Hanuman Idol is Good for Home?",
  //   },
  //   {
  //     _id: 3,
  //     image:
  //       "https://svastika.in/cdn/shop/articles/Which_Hanuman_Idol_is_Good_for_Home--_Blog_thumbnail_high_520x500_52ad9e2a-590c-4e42-8dba-31148fb70c69.jpg?v=1736850213&width=360",
  //     date: "January 10, 2025",
  //     title: "Which Hanuman Idol is Good for Home?",
  //   },
  //   {
  //     _id: 4,
  //     image:
  //       "https://svastika.in/cdn/shop/articles/Which_Hanuman_Idol_is_Good_for_Home--_Blog_thumbnail_high_520x500_52ad9e2a-590c-4e42-8dba-31148fb70c69.jpg?v=1736850213&width=360",
  //     date: "January 10, 2025",
  //     title: "Which Hanuman Idol is Good for Home?",
  //   },
  // ];
  return (
    <div >
      <div className="p-2">
        <h2 className="mb-2 font-semibold text-4xl text-center light_black_font">
          Our Blogs
        </h2>
        <p className="text-center text-sm light_black_font">
          Unveiling Spiritual Wisdom
        </p>

        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-2 max-sm:grid-cols-1 mt-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="mb-4 rounded-lg shadow-sm">
              <div className="">
                <div className="overflow-hidden w-full h-[400px] group  transition duration-500">
                  <Link
                    href={`/blogs/${blog.url}`}
                    className="overflow-hidden w-full h-[400px] group  transition duration-500"
                  >
                    <img
                      className="object-cover h-full scale-100 group-hover:scale-110 transition duration-500 rounded-t-lg"
                      src={blog.cardImage}
                      alt={blog.title}
                    />
                  </Link>
                </div>
                <div className="mt-3 p-4">
                  <p className="text-sm text-gray-600">{blog.date}</p>
                  <Link
                    href={`/blogs/${blog.url}`}
                    className="font-semibold text-xl text-gray-800"
                  >
                    {blog.title}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBlogs;
