"use client";
const convertPrice = (price, currency, exchangeRates) => {
  const rate = exchangeRates[currency];
  return price * rate;
};
import { FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { CurrencyContext } from "../../CurrencyContext";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import { useCountUp } from "use-count-up";
import { useCartStore } from "../../../stores/useCartStore";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Variations from "../../components/Variations";
import ExploreFeeds from "../../components/ExploreFeeds";
import Magnify from "../../components/Magnify";
import { FaStar, FaCheck, FaRegHeart } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaCircleChevronDown } from "react-icons/fa6";
import { FaCircleChevronUp } from "react-icons/fa6";
import { useSession, signIn, signOut } from "next-auth/react";
import StarRating from "../../components/StarRating";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper/modules";
import "swiper/css";
// import "swiper/swiper-bundle.min.css"; // Import Swiper CSS
import "swiper/css/navigation"; // Import Swiper Navigation CSS

import useFromStore from "../../../hooks/useFromStore";
import axios from "axios";
import Breadcrumbs from "../../components/Breadcrumbs";
import NewArrival from "../../components/NewArrival";
import StarRating2 from "../../components/StarRating2";
import { Check, CheckCircle } from "lucide-react";
import { Checkbox } from "@material-tailwind/react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = ({ params }) => {
  const urldata = decodeURIComponent(params.productname);
  // //console.log("urldata is",urldata);

  const notify = () =>
    toast.success("Product added to cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const [activeTab, setActiveTab] = useState("general_info");
  const [activeProductTab, setActiveProductTab] = useState(0); // State to track active tab
  const [isCounting, setIsCounting] = useState(false);
  const [progressValues, setProgressValues] = useState([0, 0, 0, 0, 0]);
  const [productData, setProductData] = useState(null);
  const [sku, setSku] = useState([]);
  const [quantity, setQuantity] = useState(1); // Local state for quantity
  const [skuData, setSkuData] = useState([]);
  const addToCart = useCartStore((state) => state.addToCart);
  const reviewsSectionRef = useRef(null); // Ref for the reviews section
  const imgTabRef = useRef(null);
  const [review, setReview] = useState("");
  const [reviewData, setReviewData] = useState({ reviews: [] });
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setusername] = useState("");
  const [number, setnumber] = useState("");
  const [files, setFiles] = useState([]);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { data: session } = useSession();
  const [usersessions, setUsersessions] = useState([]);

  // Initial quantity
  const [isDisabled, setIsDisabled] = useState(false); // State to control button disabled status

  useEffect(() => {
    axios.get(`/api/productDetail?condition=${urldata}`).then((response) => {
      setProductData(response.data[0]);
      setReview(response.data[0]._id);
      setSku(response.data[0].sku); // Assuming the API returns an array of products
    });
  }, [urldata]);

  useEffect(() => {
    axios.get(`/api/productskuDetail?condition=${sku}`).then((response) => {
      setSkuData(response.data);
      // Assuming the API returns an array of products
    });
  }, [sku]);

  useEffect(() => {
    const fetchData = async () => {
      if (review) {
        try {
          const response = await axios.get(`/api/reviews?condition=${review}`);
          setReviewData(response.data);

          //console.log("the updated module data is", response.data);

          // Set teacher if moduleData has at least one item

          const count = response.data.length;
          return count;
        } catch (error) {
          //console.log(error);
        }
      }
    };

    fetchData();
  }, [review]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.email) {
          const email = session.user.email;
          //console.log("Fetching user data in setting for email:", email);
          const response = await axios.get(`/api/user?condition=${email}`);
          setUsersessions(response.data);

          // setEnrolledcourseData(response.data?.boughtcourses);
          // //console.log("boughtcourses", response.data?.boughtcourses)
          // setCompletecourseData(response.data?.completcourses);
        }
      } catch (error) {
        //console.log(error);
      }
    };
    fetchData();
  }, [session]);

  const cart = useFromStore(useCartStore, (state) => state.cart);
  //console.log("cart data is", cart)

  useEffect(() => {
    // Ensure cart is defined and is an array
    if (Array.isArray(cart)) {
      const existingProduct = cart.find(
        (item) => item._id === productData?._id
      );

      //console.log("cart item", existingProduct);
      if (existingProduct) {
        setQuantity(existingProduct.quantity || 1); // Set quantity to the existing one or 1 if not found
        if (existingProduct.quantity >= maxQuantity) {
          setIsDisabled(true); // Disable the button if maxQuantity is reached
        } else {
          setIsDisabled(false); // Ensure the button is enabled if below maxQuantity
        }
      } else {
        setIsDisabled(false); // Ensure the button is enabled if product is not in cart
      }
    }
  }, [cart, productData]);

  //console.log("sku data is", skuData);

  const { value: value1, reset: resetValue1 } = useCountUp({
    isCounting,
    duration: 1,
    start: 0,
    end: progressValues[0],
  });
  const { value: value2, reset: resetValue2 } = useCountUp({
    isCounting,
    duration: 1,
    start: 0,
    end: progressValues[1],
  });
  const { value: value3, reset: resetValue3 } = useCountUp({
    isCounting,
    duration: 1,
    start: 0,
    end: progressValues[2],
  });
  const { value: value4, reset: resetValue4 } = useCountUp({
    isCounting,
    duration: 1,
    start: 0,
    end: progressValues[3],
  });
  const { value: value5, reset: resetValue5 } = useCountUp({
    isCounting,
    duration: 1,
    start: 0,
    end: progressValues[4],
  });

  const { currency, exchangeRates } = useContext(CurrencyContext);

  const calculateAverageRating = (reviews) => {
    const totalRating = reviews?.reduce(
      (acc, review) => acc + parseInt(review.rating),
      0
    );
    const averageRating = totalRating / reviews?.length;
    return Math.round(averageRating);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleProductTabClick = (index) => {
    setActiveProductTab(index); // Update active tab when a tab button is clicked
  };

  useEffect(() => {
    if (activeTab === "reviews") {
      setProgressValues([75, 50, 60, 80, 90]); // Update with your desired values
      resetValue1();
      resetValue2();
      resetValue3();
      resetValue4();
      resetValue5();
      setIsCounting(true);
    } else {
      setIsCounting(false);
    }
  }, [
    activeTab,
    resetValue1,
    resetValue2,
    resetValue3,
    resetValue4,
    resetValue5,
  ]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  const convertedPrice = convertPrice(
    productData.discountedPrice,
    currency,
    exchangeRates
  );
  const convertedActualPrice = convertPrice(
    productData.price,
    currency,
    exchangeRates
  );
  const averageRating = calculateAverageRating(productData.reviews);

  const addToCart1 = (e, item) => {
    e.preventDefault();
    // Prevent default form submission or link behavior
    addToCart(item);
    // Prevent default form submission or link behavior

    notify();
    // Prevent default form submission or link behavior
  };

  const addToCart2 = (e, item) => {
    // Prevent default form submission or link behavior
    addToCart(item);
    window.location.replace("/cart");
  };

  const scrollImages = (direction) => {
    const container = imgTabRef.current;
    if (container) {
      if (direction === "up") {
        container.scrollBy({ top: -160, behavior: "smooth" });
        // //console.log('up clicked')
      } else if (direction === "down") {
        container.scrollBy({ top: 160, behavior: "smooth" });
        // //console.log('down clicked')
      }
    }
  };

  const addToCartHandler = (e, item) => {
    e.preventDefault();
    addToCart({ ...item, quantity });
  };

  const maxQuantity = productData?.stockQuantity - 7;
  const increaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;

      // Check if newQuantity exceeds or hits the limit
      if (newQuantity >= maxQuantity) {
        setIsDisabled(true); // Disable button if limit is reached
      }

      // Call addToCartHandler with the updated quantity
      addToCartHandler(new Event("click"), {
        ...productData,
        quantity: newQuantity,
      });

      return newQuantity <= maxQuantity ? newQuantity : prev; // Prevent going above the limit
    });
  };

  const decreaseQuantity = () => {
    // if (quantity > 1) setQuantity((prev) => prev - 1);
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent decrementing below 1
  };

  var hasPurchasedCourse = true;

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const handleFileChange = (e) => {
    // Convert FileList to Array and check length
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      alert("You can only select up to 5 files.");
      return;
    }

    setFiles(selectedFiles);
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!file) {
  //     alert("Please select a file to upload");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     // Make the POST request to upload the file
  //     const { data } = await axios.post("/api/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     // Log the uploaded file URL
  //     //console.log("Uploaded File URL:", data.link);

  //     if (typeof window !== "undefined") {
  //       sessionStorage.setItem("message", message);
  //       sessionStorage.setItem("imageUrl", data.link);
  //       alert("Data saved in session");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   } finally {
  //     // Close the modal
  //     setShowModal(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      alert("Please select files to upload");
      return;
    }

    if (files.length > 5) {
      alert("You can only upload a maximum of 5 files");
      return;
    }

    const formData = new FormData();

    // Append each file to the FormData object
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      // Make the POST request to upload the files
      const { data } = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Log the uploaded file URLs
      //console.log("Uploaded File URLs:", data.links);

      if (typeof window !== "undefined") {
        sessionStorage.setItem("message", message);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("number", number);

        // Store all image URLs in sessionStorage as a JSON string
        sessionStorage.setItem("imageUrls", JSON.stringify(data.links));

        alert("Data Uploaded");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      // Close the modal
      setShowModal(false);
    }
  };

  const handleRatingChange = (newRating) => {
    //console.log("Rating Changed:", newRating);
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = async () => {
    //console.log("Submit Review Function Called");
    const name = usersessions.firstName + usersessions.lastName;
    if (rating && reviewText) {
      const newReview = {
        name: name,
        rating: rating,
        comment: reviewText, // Adjusted to match the 'comment' field in your API
        user_id: usersessions?._id, // Replace with the actual user_id if needed
        product_id: productData?._id,
        product_name: productData?.title, // Replace with the actual module_data_id
      };

      try {
        // Send the review data to the API
        const response = await axios.post("/api/reviews", newReview);

        if (response.status === 201) {
          // Update the local state with the new review
          setReview([...review, newReview]);
          setRating(0);
          setReviewText("");
          alert("Review Submitted");
          window.location.reload();
          //console.log("Review Submitted:", newReview);
        } else {
          console.error("Failed to submit review:", response.data.error);
          alert("Failed to submit review. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        alert(error.response.data.error);
      }
    }

    // if (rating && reviewText) {
    //   const newReview = {
    //     name: usersessions?.name,
    //     rating: rating,
    //     comment: reviewText, // Adjusted to match the 'comment' field in your API
    //     user_id: usersessions?._id, // Replace with the actual user_id if needed
    //     module_data_id: item._id, // Replace with the actual module_data_id
    //   };

    //   try {
    //     // Send the review data to the API
    //     const response = await axios.post('/api/reviews', newReview);

    //     if (response.status === 201) {
    //       // Update the local state with the new review
    //       setReview([...review, newReview]);
    //       setRating(0);
    //       setReviewText("");
    //       alert("Review Submitted");
    //       window.location.reload()
    //       //console.log("Review Submitted:", newReview);
    //     } else {
    //       console.error("Failed to submit review:", response.data.error);
    //       alert("Failed to submit review. Please try again.");
    //     }
    //   } catch (error) {
    //     console.error("Error submitting review:", error);
    //     alert("An error occurred while submitting the review. Please try again.");
    //   }
    // }
  };

  // useEffect(() => {
  //   if (urldata == skuData._id) {

  //   }
  // }, []);


  const handleReviewsClick = () => {
    // Set the active tab to 'reviews'
    handleTabClick('reviews');
    // Scroll to the reviews section
    reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar />
      <Breadcrumbs page_title="Product Details" />
      <ToastContainer />

      <div className="product mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 product_img_wrapper">
              <div className="product_img_wrapper_container">
                <div
                  className="scroll_button"
                  onClick={() => scrollImages("up")}
                >
                  <FaCircleChevronUp />
                </div>
                <div className="product_img_tab_btns" ref={imgTabRef}>
                  {productData.images.map((image, index) => (
                    <button
                      key={index}
                      className={index === activeProductTab ? "active" : ""}
                      onClick={() => handleProductTabClick(index)}
                    >
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        width={150}
                        height={160}
                      />
                    </button>
                  ))}
                </div>
                <div
                  className="scroll_button"
                  onClick={() => scrollImages("down")}
                >
                  <FaCircleChevronDown />
                </div>
                <div className="product_img_tab_content">
                  {productData.images.map((image, index) => (
                    <div
                      key={index}
                      className={
                        index === activeProductTab ? "active" : "hidden"
                      }
                    >
                      <Magnify
                        imageSrc={productData.images[activeProductTab]}
                        alt={`Product image ${activeProductTab + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6 product_about_wrapper">
              <h3 className=" product_main_tatile">{productData.title}</h3>

              <div className="rating_div flex align-middle mt-2">
                <div className="stars flex align-middle mr-3">
                  {reviewData ? (
                    <StarRating rating={reviewData?.averageRating || 5} />
                  ) : (
                    <span>No Ratings</span>
                  )}
                </div>
                <div className="review cursor-pointer hover:underline" onClick={handleReviewsClick}>
                  <a href="#forReviewClicked">
                    {reviewData?.reviews.length
                      ? reviewData?.reviews.length
                      : "No"}{" "}
                    Reviews
                  </a>
                </div>
              </div>

              <p className="green_font text-xl font-extrabold price mt-2">
                {currency === "INR" ? "₹" : "$"} {convertedPrice.toFixed(2)}{" "}
                &nbsp;
                <span>
                  {currency === "INR" ? "₹" : "$"}{" "}
                  {convertedActualPrice.toFixed(2)}
                </span>
                <div className="text-xs">Inclusive of all taxes</div>
              </p>
              <div className="my-2">
                <img src="/assets/images/icons/payment.png" alt="" />
              </div>

              <p className="text-base light_black_font mt-3">
                <span className="text-black font-semibold">
                  Short Description:{" "}
                </span>
                {productData.shortDescriptionPoints?.map((point, index) => (
                  <ul key={index}>
                    <li>
                      <span className="flex">
                        <span className="h-[12px] w-[12px] mr-4 pt-1">
                          <CheckCircle size={20} />
                        </span>{" "}
                        {point}
                      </span>
                    </li>
                  </ul>
                ))}
              </p>

              <td className="pt-2">
                <div className=" flex items-center justify-center border border-black rounded-full px-4 py-1 my-2">
                  <button onClick={decreaseQuantity}>-</button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span>{quantity}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button onClick={increaseQuantity} disabled={isDisabled}>
                    +
                  </button>
                </div>
              </td>

              {/* <div className="flex"> */}

              <div className="cart_btns mt-4  ">
                <button onClick={(e) => addToCart2(e, productData)}>
                  buy now{" "}
                </button>
                <button onClick={(e) => addToCart1(e, productData)}>
                  <span>
                    <HiOutlineShoppingBag />
                  </span>{" "}
                  &nbsp; add to cart{" "}
                </button>

                {/* <button onClick={notify}>Notify!</button> */}
                {/* <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  transition:Bounce/> */}
              </div>
              {productData.custom ? (
                <div className="cart_btns mt-4  ">
                  <button onClick={() => setShowModal(true)}>Customize</button>
                </div>
              ) : null}

              {/* </div> */}

              <div>
                {showModal ? (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                      <p className="text-red-500">
                        * Only one Customize product at a time{" "}
                      </p>
                      <h2 className="text-xl font-semibold mb-4">
                        Customize Your : {productData.title}{" "}
                      </h2>

                      {/* Form inside the modal */}
                      {/* <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message:
                          </label>
                          <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message"
                            className="w-full border border-gray-300 rounded p-2"
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload File:
                          </label>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full"
                            required
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </form> */}
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter The Name Here:
                          </label>
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            placeholder="Enter your Name (Under 20 Character)"
                            className="w-full border border-gray-300 rounded p-2"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message:
                          </label>
                          <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message( Under 80 Character)"
                            className="w-full border border-gray-300 rounded p-2"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter Your Whats app Number:
                          </label>
                          <input
                            type="text"
                            value={number}
                            onChange={(e) => setnumber(e.target.value)}
                            placeholder=" Whats app Number"
                            className="w-full border border-gray-300 rounded p-2"
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Files:
                          </label>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full"
                            multiple // Allow multiple file selection
                            required
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="product_variations">
                <h2 className="text-xl font-semibold light_black_font mt-4">
                  Variations
                </h2>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1.5}
                  loop={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  pagination={{ clickable: true }}
                  navigation={ true }
                  scrollbar={{ draggable: true }}
                  breakpoints={{
                    500: {
                      slidesPerView: 3.4,
                    },
                    780: {
                      slidesPerView: 3.8,
                    },
                    1300: {
                      slidesPerView: 4.6,
                    },
                  }}
                  modules={[Autoplay, Navigation, A11y]}
                  className="swiper-wrapper mx-auto mb-4"
                >
                  {skuData.map((data) => (
                    //  <Variations key={data._id} images={data.images} />
                    <SwiperSlide key={data._id}>
                      <a href={`/product/${data._id}`}>
                        {/* <div className="border rounded-lg"> */}
                        <div
                          className={`border rounded-lg ${
                            urldata === data._id
                              ? "border-4 border-black-500 shadow-xl"
                              : ""
                          }`}
                        >
                          <img
                            src={data.images[0]}
                            alt={data.title}
                            height={100}
                            width={100}
                            className="rounded-t-xl"
                          />
                          <p className="font-semibold variation_title px-2">
                            {" "}
                            {data.title}
                          </p>
                          <p className="font-normal green_font px-2">
                            {" "}
                            ₹{data.discountedPrice}
                          </p>
                        </div>
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="row product_details mt-4" id="forReviewClicked">
            <div className="mb-4 mt-2 flex justify-center align-middle">
              <ul
                className="flex tabs_ul flex-wrap -mb-px text-sm font-medium text-center"
                role="tablist"
              >
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block mt-2 px-4 py-2 ${
                      activeTab === "general_info"
                        ? "green_bg_white_font"
                        : "hover:text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => handleTabClick("general_info")}
                  >
                    General Information
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block mt-2 px-4 py-2 ${
                      activeTab === "additional_info"
                        ? "green_bg_white_font"
                        : "hover:text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => handleTabClick("additional_info")}
                  >
                    Additional Information
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block mt-2 px-4 py-2 ${
                      activeTab === "reviews"
                        ? "green_bg_white_font"
                        : "hover:text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => handleTabClick("reviews")}
                  >
                    Reviews
                  </button>
                </li>
              </ul>
            </div>
            <div>
              {activeTab === "general_info" && (
                <div className="p-4 rounded-xl bg-gray-50">
                  {/* <p className="text-sm text-gray-500">
                    {productData.description}
                  </p> */}

                  <div
                    className="text-lg product_parsed_data text-gray-500"
                    // style={{ all: "initial" }}
                    dangerouslySetInnerHTML={{
                      __html: productData?.description,
                    }}
                  />
                </div>
              )}
              {activeTab === "additional_info" && (
                <>
                  <div className="p-4 rounded-xl bg-gray-50">
                    {productData?.property && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              {/* First Column: Show up to 5 entries */}
                              <td className="w-1/2 align-top p-4">
                                <table className="min-w-full table-auto">
                                  <tbody>
                                    {Object.entries(productData.property)
                                      .slice(0, 10)
                                      .map(([key, value], index) => (
                                        <tr
                                          key={index}
                                          className="border-b border-t"
                                        >
                                          <td className="px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                            {key}
                                          </td>
                                          <td className="px-4 py-2 text-gray-500 bg-white">
                                            {value}
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </td>

                              {/* Second Column: Remaining entries after the first 5 */}
                              <td className="w-1/2 align-top p-4">
                                <table className="min-w-full table-auto">
                                  <tbody>
                                    {Object.entries(productData.property)
                                      .slice(5)
                                      .map(([key, value], index) => (
                                        <tr
                                          key={index}
                                          className="border-b border-t"
                                        >
                                          <td className="px-4 py-2 font-medium text-gray-700 bg-gray-100">
                                            {key}
                                          </td>
                                          <td className="px-4 py-2 text-gray-500 bg-white">
                                            {value}
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              )}
              {activeTab === "reviews" && (
                <div className="p-4 rounded-xl bg-gray-50" ref={reviewsSectionRef}>
                  <div className="row">
                    {/* <div className="col-md-4 left_review_section">
                                            <div className="average_rating_div">
                                            </div>
                                        </div> */}
                    <div className="col-md-12 right_review_section px-5">
                      <div className="average_review mb-4">
                        <p className="text-lg font-medium text-gray-900">
                          Average Review: &nbsp;
                          <span className="green_font">
                            {reviewData?.averageRating.toFixed(2) || "N/A"}
                          </span>
                        </p>
                        <div className="flex align-middle">
                          {/* <div className="stars flex align-middle mr-3">
                                                            {Array.isArray(averageRating) && averageRating.length > 0 ? (
                                                                averageRating.map((_, index) => (
                                                                    <span key={index} className="colored_star">
                                                                        <FaStar />
                                                                    </span>
                                                                ))
                                                            ) : (
                                                                <span>No rating available</span>
                                                            )}
                                                        </div> */}
                          <div className="review mt-3">
                            Total Reviews: {reviewData?.reviews.length}
                          </div>
                        </div>
                      </div>
                      <div className="review_items">
                        {/* {Array.isArray(productData.reviews) &&
                        reviewData.length > 0 ? (
                          reviewData.reviews.map((review, index) => {
                            const rating = parseInt(review.rating, 10) || 0; // Default to 0 if rating is invalid

                            return (
                              <div className="review_item mb-4" key={index}>
                                <div className="author_info flex align-middle">
                                  <div className="author_image mr-3">
                                    <FaUserCircle size={25} />
                                  </div>
                                  <div className="author_about flex flex-col align-middle">
                                    <div className="author_name font-semibold flex">
                                      {review.name}{" "}
                                      <span className="author_badge pt-1 pl-1 green_font">
                                        <MdVerified />
                                      </span>
                                    </div>

                                    <div className="author_rating flex align-middle mt-2 mb-1">
                                      <div className="author_stars flex align-middle mr-1">
                                        {[...Array(rating)].map((_, i) => (
                                          <span
                                            key={i}
                                            className="colored_star"
                                          >
                                            <FaStar />
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="author_date text-sm">
                                      {review.comment}
                                    </div>
                                  </div>
                                </div>
                                <div className="review_content mt-2">
                                  <p className="text-sm">{review.text}</p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div>No reviews available</div>
                        )} */}

                        <div>
                          {reviewData?.reviews &&
                          reviewData?.reviews.length > 0 ? (
                            reviewData?.reviews?.map((reviewer, index) => (
                              <div key={index} className="flex gap-4 mb-5">
                                <div>
                                  <FaUserCircle size={25} />
                                </div>
                                <div>
                                  <h5 className="text-sm text-textClr font-semibold mb-2">
                                    {reviewer.name}
                                  </h5>
                                  <div className="flex items-center text-yellowclr mb-3">
                                    <StarRating rating={reviewer.rating || 5} />
                                  </div>
                                  <p className="text-base text-textClr font-normal">
                                    {reviewer.comment}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-textClr">
                              No reviews found.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-5">
                        {session ? (
                          <>
                            {hasPurchasedCourse ? (
                              <div className="mt-5">
                                <div className="section-title">
                                  <h4 className="text-lg text-blackClr font-bold">
                                    Write your review
                                  </h4>
                                  <hr className="text-textClr my-3" />
                                </div>

                                <div className="mb-4 star_clr">
                                  <StarRating2
                                    rating={rating}
                                    onRatingChange={handleRatingChange}
                                  />
                                </div>

                                <textarea
                                  value={reviewText}
                                  onChange={handleCommentChange}
                                  placeholder="Write your review"
                                  className="w-full h-24 p-2 border rounded outline-none"
                                ></textarea>

                                <button
                                  onClick={handleSubmitReview}
                                  className="bg_green text-sm text-white py-2 px-4 rounded mt-3"
                                >
                                  Add Review
                                </button>
                              </div>
                            ) : (
                              <div className="mt-5">
                                <div className="section-title">
                                  <h4 className="text-lg text-blackClr font-bold">
                                    Write your review
                                  </h4>
                                  <hr className="text-textClr my-3" />
                                </div>

                                <p className="text-center text-textClr">
                                  <span className="text-textClr font-bold text-lg block">
                                    Purchase Required
                                  </span>
                                  <span className="block mb-4">
                                    To write a review, you must purchase this
                                    course.
                                  </span>
                                  <span className="">
                                    <Link
                                      href="/cart"
                                      className="bg_green text-sm text-white py-2 px-4 rounded mt-3 mr-4"
                                      prefetch={true}
                                    >
                                      Buy Now
                                    </Link>
                                    OR
                                    <Link
                                      href="/login"
                                      className="bg_green text-sm text-white py-2 px-4 rounded mt-3 ml-4"
                                      prefetch={true}
                                    >
                                      Login
                                    </Link>
                                  </span>
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <p> Login first To Write Review</p>
                            <a className="cart_btns mt-4" href="/login">
                              <button>Login</button>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <NewArrival />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
