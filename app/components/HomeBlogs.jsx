import Link from "next/link";
import React, { useState, useEffect } from "react";

const HomeBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  // useEffect(() => {
  //   fetch("/api/blogs")
  //     .then((res) => res.json())
  //     .then((data) => setBlogs(data.data));
  // },[])

  useEffect(() => {
    setLoading(true); // Start loading
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.data); // Set blogs data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

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
    <div>
      <div className="p-2 mt-10">
        <h2 className="mb-2 font-semibold text-4xl text-center light_black_font">
          Our Blogs
        </h2>
        <p className="text-center text-sm light_black_font">
          Unveiling Spiritual Wisdom
        </p>
        {loading ? (
          <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-4 px-10 max-sm:px-2">
            <div className="animate-pulse h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full bg-gray-300 rounded"></div>
            <div className="animate-pulse h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full bg-gray-300 rounded"></div>
            <div className="animate-pulse h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full bg-gray-300 rounded"></div>
            <div className="animate-pulse h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full bg-gray-300 rounded"></div>
          </div>
        ) : (
          <div className="grid gap-4 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 max-sm:grid-cols-1 mt-4">
            {blogs?.length > 0 ? (
              blogs?.map((blog) => (
                <div key={blog?._id} className="mb-4 rounded-lg shadow-sm">
                  <div className="">
                    <div className="overflow-hidden w-full h-[400px] group  transition duration-500">
                      <Link
                        href={`/blogs/${blog?.url}`}
                        className="overflow-hidden w-full h-[400px] group  transition duration-500"
                      >
                        <img
                          className="object-cover h-full scale-100 group-hover:scale-110 transition duration-500 rounded-t-lg"
                          src={blog?.cardImage}
                          alt={blog?.title}
                        />
                      </Link>
                    </div>
                    <div className="mt-3 p-4">
                      <p className="text-sm text-gray-600">{blog?.date}</p>
                      <Link
                        href={`/blogs/${blog?.url}`}
                        className="font-semibold text-xl text-gray-800"
                      >
                        {blog?.title}
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-red-500">No Blogs available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeBlogs;
