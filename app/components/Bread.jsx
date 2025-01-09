"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Bread = () => {
  const pathname = usePathname();
  const [previousCategory, setPreviousCategory] = useState(null);
  const [productTitle, setProductTitle] = useState(null);
  const [urldata, setUrldata] = useState(null); // Assuming this is the SKU or Product ID

  useEffect(() => {
    // Get the previous page URL using document.referrer
    const referrer = document.referrer;

    if (referrer) {
      // Check if the referrer is a category page
      const referrerPathSegments = new URL(referrer).pathname
        .split("/")
        .filter(Boolean);
      if (referrerPathSegments[0] === "products" && referrerPathSegments[1]) {
        // Decode category to remove %20 encoding
        const category = decodeURIComponent(referrerPathSegments[1]);
        setPreviousCategory(category);
      }
    }

    // Extract the product ID (SKU) from the URL (assuming it's a product page: /product/[id])
    const pathSegments = pathname.split("/").filter(Boolean);
    const productId = pathSegments[1]; // SKU or product ID is in the second segment

    if (productId) {
      setUrldata(productId); // Set the SKU or product ID
    }
  }, [pathname]);

  useEffect(() => {
    // Fetch product details using axios, when urldata (SKU) is set
    if (urldata) {
      axios
        .get(`/api/productDetail?condition=${urldata}`)
        .then((response) => {
          const product = response.data[0]; // Assuming the API returns an array of products
          setProductTitle(product.title); // Set the product title for the breadcrumb
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [urldata]);

  return (
    <div className="bg_gray breadcrumbs_wrapper py-3">
      <ul className="flex items-center justify-start space-x-2">
        <li className=" green_font text-sm">
          <Link href="/">Home</Link>
        </li>
        {previousCategory && (
          <li className="flex items-center justify-start green_font text-sm">
            <span>
              <MdKeyboardDoubleArrowRight />
            </span>
            <Link href={`/products/${encodeURIComponent(previousCategory)}`}>
              {previousCategory}
            </Link>
          </li>
        )}
        {productTitle && (
          <li className="flex items-center text-sm productTitle">
          <span>
              <MdKeyboardDoubleArrowRight />
            </span>
            <span className="productTitle">{productTitle}</span> {/* Displaying product title */}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Bread;
