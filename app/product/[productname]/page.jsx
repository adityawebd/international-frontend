"use client";
const convertPrice = (price, currency, exchangeRates) => {
  const rate = exchangeRates[currency];
  return price * rate;
};
import { useRouter } from "next/router";

import { notFound } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { CurrencyContext } from "../../CurrencyContext";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import { useCountUp } from "use-count-up";
import { useCartStore } from "../../../stores/useCartStore";
import Navbar2 from "../../components/Navbar2";
import Navbar3 from "../../components/Navbar3";
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
import {
  ShoppingBasket,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  X,
  ZoomIn,
  Headset,
  Box,
  CircleHelp,
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Copy,
  Video,
} from "lucide-react";
import Bread from "../../components/Bread";

import { TbTruckDelivery } from "react-icons/tb";
import { GrReturn } from "react-icons/gr";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import RelatedProduct from "../../components/RelatedProduct";

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

  const [displayName, setDisplayName] = useState(""); // For updating the image overlay dynamically
  const [textColor, setTextColor] = useState("#000000"); // Default text color
  const [activeTab, setActiveTab] = useState("general_info");
  const [activeProductTab, setActiveProductTab] = useState(0); // State to track active tab
  const [isCounting, setIsCounting] = useState(false);
  const [progressValues, setProgressValues] = useState([0, 0, 0, 0, 0]);
  const [productData, setProductData] = useState('');
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
  console.log(productData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const imageContainerRef = useRef(null);
  const contentRefs = useRef([null, null, null]);
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });

  const [openNewModal, setOpenNewModal] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);
  const [copiedCouponIndex, setCopiedCouponIndex] = useState(null); // State to track copied coupon index

  const handleOpenModal = (modalId) => {
    setOpenNewModal(modalId);
  };

  const handleCloseModal = () => {
    setOpenNewModal(null);
  };

  // Initial quantity
  const [isDisabled, setIsDisabled] = useState(false); // State to control button disabled status

  // const [activeProductTab, setActiveProductTab] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);

    if (imageContainerRef.current) {
      const thumbnail = imageContainerRef.current.children[index];

      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: "smooth",
          block: "center", // Centers the thumbnail vertically
          inline: "center", // Centers the thumbnail horizontally
        });
      } else {
        console.error(`Thumbnail at index ${index} does not exist.`);
      }
    } else {
      console.error(
        "imageContainerRef is not assigned or contains no children."
      );
    }
  };

  const handleProductTabClick = (index) => {
    setActiveProductTab(index);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % productData.images?.length;
      handleThumbnailClick(newIndex); // Center the new active thumbnail
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex =
        (prevIndex - 1 + productData.images?.length) %
        productData.images?.length;
      handleThumbnailClick(newIndex); // Center the new active thumbnail
      return newIndex;
    });
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false); // Reset zoom when closing modal
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCouponIndex(index); // Set the copied coupon index
      setTimeout(() => setCopiedCouponIndex(null), 2000); // Reset after 2 seconds
    });
  };

  const [couponDiscounts, setDiscountCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const couponDiscounts = {
  //   // discountUnder: "4,060",
  //   // saveUpTo: "439",
  //   coupons: [
  //     {
  //       _id: 1,
  //       title: "Get 5% OFF",
  //       desc: "Extra 5% OFF on all Online Payments",
  //       code: "GIFT5",
  //       discountPercent: 5,
  //     },
  //     {
  //       _id: 2,
  //       title: "Get ₹500 OFF",
  //       desc: "₹500 OFF on 1st Pruchase of Lord Ganesha Idol",
  //       code: "GANESHA500",
  //       discountAmount: 500,
  //     },
  //   ],
  // };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get("/api/coupons");
        setDiscountCoupons(response.data); // Set coupons to state
        setError(null); // Reset any previous errors
      } catch (err) {
        setError("Failed to fetch coupons"); // Handle error
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchCoupons();

    // Cleanup function to avoid setting state after the component is unmounted
    return () => {
      setDiscountCoupons([]);
      setLoading(false);
      setError(null);
    };
  }, []);

  useEffect(() => {
    axios.get(`/api/productDetail?condition=${urldata}`).then((response) => {
      setProductData(response.data[0]);
      setReview(response.data[0]._id);
      setSku(response.data[0].sku); // Assuming the API returns an array of products
    });
  }, [urldata]);

  useEffect(() => {
    axios.get(`/api/productskuDetail?condition=${sku}`).then((response) => {
      setSkuData(response?.data);
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

          const count = response.data?.length;
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
  const maxQuantity = productData?.stockQuantity - 7;

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

  // const handleProductTabClick = (index) => {
  //   setActiveProductTab(index); // Update active tab when a tab button is clicked
  // };

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
    return (
      <div className="flex gap-2 justify-center items-center h-[100vh] border">
        <div className="loader w-8 h-8 border-4 border_green border-dashed rounded-full animate-spin"></div>
        <p className="ml-4 green_font text-sm mt-1">Loading product...</p>
      </div>
    );
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

  // const addToCart1 = (e, item) => {
  //   e.preventDefault();
  //   // Prevent default form submission or link behavior
  //   addToCart(item);
  //   // Prevent default form submission or link behavior

  //   notify();
  //   // Prevent default form submission or link behavior
  // };

  const addToCart1 = (e, item) => {
    e.preventDefault(); // Prevent default form submission or link behavior

    // console.log("quantity", quantity);
    // Run addToCart the number of times as quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }

    notify(); // Trigger a notification
  };

  const addToCart2 = (e, item) => {
    console.log("quantity", quantity);
    // Prevent default form submission or link behavior
    // addToCart(item);
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
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


  const increaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;

      // Disable button if the limit is reached
      if (newQuantity >= maxQuantity) {
        setIsDisabled(true);
      }

      return newQuantity <= maxQuantity ? newQuantity : prev; // Prevent going above the limit
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent decrementing below 1
    setIsDisabled(false); // Enable increase button if it was disabled
  };

  var hasPurchasedCourse = true;


  const handleFileChange = (e) => {
    // Convert FileList to Array and check length
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles?.length > 5) {
      alert("You can only select up to 5 files.");
      return;
    }

    setFiles(selectedFiles);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files?.length > 5) {
      alert("You can only upload a maximum of 5 files");
      return;
    }

    const formData = new FormData();

    // Append each file to the FormData object
    for (let i = 0; i < files?.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      let uploadedLinks = [];

      if (files && files?.length > 0) {
        // Make the POST request to upload the files
        const { data } = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        uploadedLinks = data.links; // Store uploaded file URLs
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("message", message);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("number", number);
        formData.append("textColor", textColor); // new value to backend for customize text color

        // Store image URLs or an empty array in sessionStorage as a JSON string
        sessionStorage.setItem("imageUrls", JSON.stringify(uploadedLinks));

        addToCart1(e, productData);
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



  const handleReviewsClick = () => {
    // Set the active tab to 'reviews'
    handleTabClick("reviews");
    // Scroll to the reviews section
    reviewsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStyle({
      display: "block",
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  const maxCouponDiscount = (discount1 = 0, discount2 = 0) => {
    discount1 =
      productData?.discountedPrice -
      (productData?.discountedPrice * discount1) / 100;
    discount2 =
      productData?.discountedPrice -
      (productData?.discountedPrice * discount2) / 100;

    // console.log(discount1)
    // console.log(discount2)

    let discount = discount1;
    if (discount1 < discount2) discount = discount1;
    else discount = discount2;

    return discount;
  };

  const isVideo = (url) => /\.(mp4|webm|ogg)$/.test(url);

  return (
    <div className="relative">
      <Navbar2 />
      <Navbar3 />
      {/* <Breadcrumbs page_title="Product" page_title2={productData.title} /> */}
      <Bread />
      <ToastContainer />

      <div className="product mt-3">
        <div className="container">
          <div className="container mx-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div>
              {/* Left: Image Section */}
              <div className="hidden lg:block md:block">
                <div className="flex gap-4">
                  {/* Smaller image */}
                  <div
                    ref={imageContainerRef}
                    className="flex flex-col gap-4 h-[auto] 2xl:max-h-[800px] xl:max-h-[700px] lg:max-h-[440px] md:max-h-[300px] max-sm:max-h-[200px] overflow-y-auto scrollbar-hidden relative"
                  >
                    {productData?.images?.map((media, index) => (
                      <div key={index} className="relative">
                        {/* Check if it's an image or video */}
                        {media.endsWith(".mp4") ? (
                          <div className="relative">
                            <video
                              src={media}
                              className={`border border-red-500 rounded-lg h-[auto] w-[100px] lg:max-h-[100px] md:max-h-[80px] max-sm:max-h-[60px] mx-auto cursor-pointer ${currentIndex === index
                                ? "border-primary bg-secondary-light"
                                : "border-gray-300"
                                }`}
                              onClick={() => handleThumbnailClick(index)}
                              muted
                            />
                            <span className="absolute top-0 right-0 bg_green text-white p-1 rounded-lg">
                              <Video size={16} />
                            </span>
                          </div>
                        ) : (
                          <img
                            src={media}
                            alt="Product Thumbnail"
                            className={`border rounded-lg h-[auto] lg:max-h-[100px] md:max-h-[80px] max-sm:max-h-[60px] mx-auto cursor-pointer ${currentIndex === index
                              ? "border-primary bg-secondary-light"
                              : "border-gray-300"
                              }`}
                            onClick={() => handleThumbnailClick(index)}
                          />
                        )}
                        {currentIndex === index && (
                          <div className="absolute inset-0 border-2 border-primary rounded-lg"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Bigger image */}
                  <div className="relative bg-secondary-light henlyproductslider overflow-hidden rounded-lg border-red-500">
                    <div
                      className="relative overflow-hidden"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      {productData?.images?.[currentIndex]?.endsWith(".mp4") ? (
                        <video
                          src={productData?.images?.[currentIndex]}
                          className="h-[auto] 2xl:max-h-[800px] xl:max-h-[700px] lg:max-h-[600px] md:max-h-[300px] max-sm:max-h-[200px] w-full mx-auto rounded-lg cursor-pointer"
                          controls
                        />
                      ) : (
                        <img
                          src={
                            productData?.images?.[currentIndex] ||
                            "/default-image.jpg"
                          }
                          alt={productData?.title || "Product Image"}
                          className="h-[auto] 2xl:max-h-[800px] xl:max-h-[700px] lg:max-h-[600px] md:max-h-[300px] max-sm:max-h-[200px] w-full mx-auto rounded-lg cursor-zoom-in"
                          onClick={() => openModal(currentIndex)}
                        />
                      )}
                      {productData.stockQuantity <= 0 && (
                        <>
                          <div className="absolute top-0 left-0 bg-black/70 p-10 text-white text-2xl w-full h-full flex justify-center items-center">
                            Out of Stock
                          </div>
                        </>
                      )}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          ...zoomStyle,
                          position: "absolute",
                          backgroundImage: `url(${productData?.images?.[currentIndex] ||
                            "/default-image.jpg"
                            })`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "200%", // Zoom level
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      ></div>
                    </div>

                    <button
                      onClick={prevImage}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border_green green_font p-2 rounded-full hover:p-3 product-button-prev"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border_green green_font p-2 rounded-full hover:p-3 product-button-next"
                    >
                      <ChevronRight />
                    </button>

                    <button
                      onClick={() => openModal(currentIndex)}
                      className="absolute right-0 top-10 transform -translate-y-1/2  text-green_font hover:bg-black hover:text-white p-2 rounded-full hover:p-3 product-button-next"
                    >
                      <ZoomIn />
                    </button>
                  </div>

                  {/* Modal */}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-50 ">
                      <div className="w-full h-[90%]">
                        <button
                          onClick={closeModal}
                          className="absolute top-0 right-0 p-2 text-white bg-transparent rounded-full hover:bg-gray-500 transition duration-300 "
                        >
                          <X />
                        </button>

                        {/* Image Container with Draggable */}
                        {/* <img
                          src={
                            productData?.images?.[currentIndex] ||
                            "/default-image.jpg"
                          }
                          alt={productData?.title || "Product Image"}
                          className={`h-full mx-auto rounded-lg transition-transform cursor-zoom-in ${
                            isZoomed ? "scale-150" : "scale-100"
                          }`}
                          onClick={toggleZoom}
                        /> */}

                        {/* Media Container in Modal */}
                        {productData?.images?.[currentIndex]?.endsWith(
                          ".mp4"
                        ) ? (
                          <video
                            src={productData?.images?.[currentIndex]}
                            className="h-full mx-auto rounded-lg transition-transform"
                            controls
                          />
                        ) : (
                          <img
                            src={
                              productData?.images?.[currentIndex] ||
                              "/default-image.jpg"
                            }
                            alt={productData?.title || "Product Image"}
                            className={`h-full mx-auto rounded-lg transition-transform cursor-zoom-in ${isZoomed ? "scale-150" : "scale-100"
                              }`}
                            onClick={toggleZoom}
                          />
                        )}

                        {/* Navigation Buttons */}
                        <button
                          onClick={prevImage}
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-full hover:p-3"
                        >
                          <ChevronLeft />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-full hover:p-3"
                        >
                          <ChevronRight />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="product_variations">
                  <h2 className="text-xl font-semibold light_black_font mt-4">
                    Variations
                  </h2>
                  <div className="">
                    {skuData?.length > 0 ? (
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
                        navigation={true}
                        scrollbar={{ draggable: true }}
                        breakpoints={{
                          // Mobile small (smaller than 500px)
                          320: {
                            slidesPerView: 2.2,
                            // spaceBetween: 20,
                          },
                          400: {
                            slidesPerView: 2.5,
                            // spaceBetween: 20,
                          },
                          640: {
                            slidesPerView: 3,
                            // spaceBetween: 20,
                          },
                          // Tablets (around 768px)
                          768: {
                            slidesPerView: 3, // Can show partial next slide
                            // spaceBetween: 15,
                          },
                          // Tablets large (around 1024px)
                          1024: {
                            slidesPerView: 3.5, // Showing 2 slides
                            // spaceBetween: 20,
                          },
                          // Laptops (around 1300px)
                          1300: {
                            slidesPerView: 4.5, // Show 2.5 slides
                            // spaceBetween: 25,
                          },
                          // Desktop (larger than 1500px)
                          1500: {
                            slidesPerView: 5, // Show 3 full slides
                            // spaceBetween: 15,
                          },
                          1920: {
                            slidesPerView: 6,
                            spaceBetween: 15,
                          },
                        }}
                        modules={[Autoplay, Navigation, A11y]}
                        className="swiper-wrapper mx-auto mb-4"
                      >
                        {skuData?.map((data) => (
                          //  <Variations key={data._id} images={data.images} />
                          <SwiperSlide key={data._id}>
                            <a href={`/product/${data._id}`}>
                              {/* <div className="border rounded-lg"> */}
                              <div
                                className={`border rounded-lg ${urldata === data._id
                                  ? "border-4 border-black-500 shadow-xl"
                                  : ""
                                  }`}
                              >
                                <img
                                  loading="lazy"
                                  src={data.images[0]}
                                  alt={data.title}
                                  className="rounded-t-lg"
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
                    ) : (
                      // Fallback message if no products are available
                      <p className="text-center green_font mt-4">
                        No products available at the moment.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* for mobile view */}
              <div className="lg:hidden md:hidden">
                <div className="flex flex-col gap-4 ">
                  {/* Smaller image */}
                  <div
                    ref={imageContainerRef}
                    className="flex flex-row gap-2 overflow-x-auto w-full scrollbar-hidden relative order-2"
                  >
                    {productData?.images?.map((media, index) => (
                      <div key={index} className="relative flex-none">
                        {/* <img
                          src={image}
                          alt="Product Thumbnail"
                          className={`border rounded-lg h-[60px] w-[60px] mx-auto cursor-pointer ${
                            currentIndex === index
                              ? "border-primary bg-secondary-light"
                              : "border-gray-300"
                          }`}
                          onClick={() => handleThumbnailClick(index)}
                        /> */}
                        {/* Check if it's an image or video */}
                        {media.endsWith(".mp4") ? (
                          <div className="relative">
                            <video
                              src={media}
                              className={`border rounded-lg h-[60px] w-[60px] mx-auto cursor-pointer ${currentIndex === index
                                ? "border-primary bg-secondary-light"
                                : "border-gray-300"
                                }`}
                              onClick={() => handleThumbnailClick(index)}
                              muted
                            />
                            <span className="absolute top-0 right-0 bg_green text-white p-1 rounded-lg">
                              <Video size={16} />
                            </span>
                          </div>
                        ) : (
                          <img
                            src={media}
                            alt="Product Thumbnail"
                            className={`border rounded-lg h-[60px] w-[60px] mx-auto cursor-pointer ${currentIndex === index
                              ? "border-primary bg-secondary-light"
                              : "border-gray-300"
                              }`}
                            onClick={() => handleThumbnailClick(index)}
                          />
                        )}
                        {currentIndex === index && (
                          <div className="absolute inset-0 border-2 border-primary rounded-lg"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Bigger image */}
                  <div className="relative bg-secondary-light henlyproductslider overflow-hidden rounded-lg order-1">
                    {/* <img
                      src={
                        productData?.images?.[currentIndex] ||
                        "/default-image.jpg"
                      }
                      alt={productData?.title || "Product Image"}
                      className="w-full mx-auto rounded-lg cursor-zoom-in"
                      onClick={() => openModal(currentIndex)}
                    /> */}
                    {productData?.images?.[currentIndex]?.endsWith(".mp4") ? (
                      <video
                        src={productData?.images?.[currentIndex]}
                        className="w-full mx-auto rounded-lg cursor-zoom-in"
                        controls
                      />
                    ) : (
                      <img
                        src={
                          productData?.images?.[currentIndex] ||
                          "/default-image.jpg"
                        }
                        alt={productData?.title || "Product Image"}
                        className="w-full mx-auto rounded-lg cursor-zoom-in"
                        onClick={() => openModal(currentIndex)}
                      />
                    )}
                    <button
                      onClick={prevImage}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border_green green_font p-2 rounded-full hover:p-3 product-button-prev"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border_green green_font p-2 rounded-full hover:p-3 product-button-next"
                    >
                      <ChevronRight />
                    </button>

                    <button
                      onClick={() => openModal(currentIndex)}
                      className="absolute right-1 top-10 transform -translate-y-1/2  text-black hover:bg-black hover:text-white p-2 rounded-full hover:p-3 "
                    >
                      <ZoomIn />
                    </button>
                  </div>

                  {/* Modal */}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-50">
                      <div className=" w-full">
                        <button
                          onClick={closeModal}
                          className="absolute top-2 right-0 p-2 text-white bg-transparent rounded-full hover:bg-gray-500 transition duration-300 "
                        >
                          <X />
                        </button>

                        {/* Image Container with Draggable */}
                        {/* <img
                          src={productData.images[currentIndex]}
                          alt="Product Image"
                          className={`w-full max-w-screen-sm mx-auto rounded-lg transition-transform cursor-zoom-in ${
                            isZoomed ? "scale-150" : "scale-100"
                          }`}
                          onClick={toggleZoom}
                        /> */}
                        {/* Media Container in Modal */}
                        {productData?.images?.[currentIndex]?.endsWith(
                          ".mp4"
                        ) ? (
                          <video
                            src={productData?.images?.[currentIndex]}
                            className="h-full mx-auto rounded-lg transition-transform"
                            controls
                          />
                        ) : (
                          <img
                            src={
                              productData?.images?.[currentIndex] ||
                              "/default-image.jpg"
                            }
                            alt={productData?.title || "Product Image"}
                            className={`w-full max-w-screen-sm mx-auto rounded-lg transition-transform cursor-zoom-in ${isZoomed ? "scale-150" : "scale-100"
                              }`}
                            onClick={toggleZoom}
                          />
                        )}

                        {/* Navigation Buttons */}
                        <button
                          onClick={prevImage}
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-full hover:p-3"
                        >
                          <ChevronLeft />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-full hover:p-3"
                        >
                          <ChevronRight />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:block md:block hidden">
              <div className="product_about_wrapper">
                <h3 className="productTiteNewBaskervilleFont">
                  {productData?.title}
                </h3>

                <div className="rating_div flex align-middle mt-2">
                  <div className="stars flex items-center mr-3">
                    {reviewData ? (
                      <StarRating rating={reviewData?.averageRating || 5} />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    className="review cursor-pointer hover:underline"
                    onClick={handleReviewsClick}
                  >
                    <a href="#forReviewClicked">
                      {reviewData?.reviews?.length ? (
                        `${reviewData?.reviews?.length} ${reviewData?.reviews?.length === 1
                          ? "Review"
                          : "Reviews"
                        } `
                      ) : (
                        <></>
                      )}{" "}
                    </a>
                  </div>
                </div>

                <div className="flex gap-2 items-center mt-2">
                  <h3 className="font-bold green_font text-3xl">
                    {currency === "INR" ? "₹" : "$"}
                    {convertedPrice.toFixed(2)}{" "}
                  </h3>
                  <h3 className="text-gray-400 pt-1 line-through">
                    {currency === "INR" ? "₹" : "$"}{" "}
                    {convertedActualPrice.toFixed(2)}
                  </h3>
                  <span className="mt-1 bg_green text-white discountPercentage rounded-full font-semibold py-1 px-3 mb-1">
                    {`SAVE ${Math.round(
                      ((convertedActualPrice - convertedPrice) /
                        convertedActualPrice) *
                      100
                    )}%`}
                  </span>
                </div>
                <div className="text-xs green_font font-semibold">
                  Inclusive of all taxes
                </div>

                <div className="my-2">
                  <img
                    loading="lazy"
                    src="/assets/images/icons/payment.png"
                    alt=""
                  />
                </div>

                <p className="text-base light_black_font mt-3">
                  <span className="text-black font-semibold">
                    Short Description:{" "}
                  </span>
                  {productData?.shortDescriptionPoints?.map((point, index) => (
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

                {/* <div className="flex"> */}

                {productData?.stockQuantity > 0 ? (
                  <>
                    <div className="2xl:block xl:block lg:block hidden">
                      {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 2xl:gap-6 xl:gap-4 lg:gap-2 mt-4">
                        <div className="">
                          <div className="flex items-center justify-center border border-gray-300 rounded-full">
                            <button
                              onClick={decreaseQuantity}
                              className="bg-gray-100 rounded-l-full 2xl:w-1/5 xl:w-1/5 lg:w-2/5  2xl:py-2 xl:py-2 lg:py-1 border-r border-gray-300"
                            >
                              -
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className=" w-3/5 text-center 2xl:py-2 xl:py-2 lg:py-1">
                              {quantity}
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                              onClick={increaseQuantity}
                              disabled={isDisabled}
                              className="bg-gray-100 rounded-r-full 2xl:w-1/5 xl:w-1/5 lg:w-2/5  2xl:py-2 xl:py-2 lg:py-1 border-l border-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="">
                          <button
                            onClick={(e) => addToCart1(e, productData)}
                            className="bg_darkgray flex gap-1 items-center justify-center text-white px-4 py-2 rounded-full capitalize text-center w-full 2xl:text-base xl:text-base lg:text-sm"
                          >
                            <span>
                              <HiOutlineShoppingBag />
                            </span>{" "}
                            &nbsp; add to cart{" "}
                          </button>
                        </div>
                        <div className="">
                          {productData.custom ? (
                            <div className="bg_darkgray text-white px-4 py-2 rounded-full capitalize text-center w-full  2xl:text-base xl:text-base lg:text-sm">
                              <button onClick={() => setShowModal(true)}>
                                Customize
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div> */}
                      <div className="grid lg:grid-cols-3 md:grid-cols-2 2xl:gap-6 xl:gap-4 lg:gap-2 mt-4">
                        <div className="">
                          <div className="flex items-center justify-center border border-gray-300 rounded-full">
                            <button
                              onClick={decreaseQuantity}
                              className="bg-gray-100 rounded-l-full 2xl:w-1/5 xl:w-1/5 lg:w-2/5 2xl:py-2 xl:py-2 lg:py-1 border-r border-gray-300"
                            >
                              -
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="w-3/5 text-center 2xl:py-2 xl:py-2 lg:py-1">
                              {quantity}
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                              onClick={increaseQuantity}
                              disabled={isDisabled}
                              className="bg-gray-100 rounded-r-full 2xl:w-1/5 xl:w-1/5 lg:w-2/5 2xl:py-2 xl:py-2 lg:py-1 border-l border-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div
                          className={`${productData?.custom ? "" : "lg:col-span-2"
                            }`}
                        >
                          <button
                            onClick={(e) => addToCart1(e, productData)}
                            className="bg_darkgray flex gap-1 items-center justify-center text-white px-4 py-2 rounded-full capitalize text-center w-full 2xl:text-base xl:text-base lg:text-sm"
                          >
                            <span>
                              <HiOutlineShoppingBag />
                            </span>
                            &nbsp; add to cart
                          </button>
                        </div>
                        {productData?.custom && (
                          <div className="">
                            <div className="bg_darkgray text-white px-4 py-2 rounded-full capitalize text-center w-full 2xl:text-base xl:text-base lg:text-sm">
                              <button onClick={() => setShowModal(true)}>
                                Customize
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <button
                          onClick={(e) => addToCart2(e, productData)}
                          className="bg_green hover:sha text-white px-4 py-2 rounded-full capitalize text-center w-full"
                        >
                          buy now{" "}
                        </button>
                      </div>
                    </div>

                    <div className="2xl:hidden xl:hidden lg:hidden md:block">
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="">
                          <div className="flex items-center justify-center border border-gray-300 rounded-full w-full">
                            <button
                              onClick={decreaseQuantity}
                              className="bg-gray-100 rounded-l-full w-2/5  py-1 border-r border-gray-300"
                            >
                              -
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className=" w-1/5 text-center py-1">
                              {quantity}
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                              onClick={increaseQuantity}
                              disabled={isDisabled}
                              className="bg-gray-100 rounded-r-full w-2/5  py-1 border-l border-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        {/* <div className="">
                          <button
                            onClick={(e) => addToCart1(e, productData)}
                            className="bg_darkgray flex gap-1 items-center justify-center text-white px-4 py-2 rounded-full capitalize text-center w-full text-sm"
                          >
                            <span>
                              <HiOutlineShoppingBag />
                            </span>{" "}
                            &nbsp; add to cart{" "}
                          </button>
                        </div> */}
                        <div className="">
                          {productData?.custom ? (
                            <div className="bg_darkgray text-white px-4 py-2 rounded-full capitalize text-center w-full  text-sm">
                              <button onClick={() => setShowModal(true)}>
                                Customize
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      {/* <div className="grid grid-cols-2 gap-2 mt-2"> */}
                      <div
                        className={`mt-2 grid gap-2 ${productData?.custom ? "" : "lg:col-span-2"
                          }`}
                      >
                        {/* <div className="">
                          <button
                            onClick={(e) => addToCart2(e, productData)}
                            className="bg_green hover:sha text-white px-4 py-2 rounded-full capitalize text-center w-full text-sm"
                          >
                            buy now{" "}
                          </button>
                        </div> */}
                      </div>
                    </div>

                    {/* </div> */}
                  </>
                ) : (
                  <div className="text-red-500 mt-4">
                    Currently Unavailable (Out of Stock)
                  </div>
                )}

                <div>
                  {showModal ? (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="grid grid-cols-2 max-sm:grid-cols-1 bg-white 2xl:w-[70%] xl:w-[70%] lg:w-[80%] md:w-[95%]">
                        <div className="relative p-6 flex justify-center items-center">
                          <img
                            src="/assets/customize.png"
                            alt="Customize Image Box Demo"
                            className="w-full rounded-lg"
                          />
                          {/* Overlay Text */}
                          <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                            style={{ color: textColor }} // Dynamically update text color
                          >
                            <p className="text-2xl font-bold bg-opacity-70 px-2 rounded">
                              {displayName || "Your Name Here"}
                            </p>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-200 w-full">
                          <div className="p-3 bg-white">
                            <p className="text-red-500">
                              * Only one Customize product at a time{" "}
                            </p>
                            <h2 className="text-xl font-semibold mb-4">
                              Customize Your : {productData?.title}{" "}
                            </h2>

                            <form onSubmit={handleSubmit}>
                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Enter The Name Here:{" "}
                                  <span className="text-red-600">*</span>
                                </label>
                                {/* <input
                                  type="text"
                                  value={username}
                                  onChange={(e) => setusername(e.target.value)}
                                  placeholder="Enter your Name (Under 30 Character)"
                                  className="w-full border border-gray-300 rounded p-2"
                                  required
                                  maxLength="30"
                                /> */}
                                <input
                                  type="text"
                                  value={username}
                                  onChange={(e) => {
                                    const value = e.target.value.slice(0, 30); // Limit input to 30 characters
                                    setusername(value);
                                    setDisplayName(value); // Update display name dynamically
                                  }}
                                  placeholder="Enter your Name (Under 30 Characters)"
                                  className="w-full border border-gray-300 rounded p-2"
                                  required
                                />
                              </div>
                              {/* Color Picker */}
                              <div className="mb-4 flex gap-2 items-center">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Choose Text Color:
                                </label>
                                <input
                                  type="color"
                                  value={textColor}
                                  onChange={(e) => setTextColor(e.target.value)} // Update text color
                                  className="w-12 h-8 cursor-pointer"
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
                                  maxLength="80"
                                />
                              </div>
                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Enter Your Whats app Number:
                                  <span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={number}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow only numbers and limit to 10 digits
                                    if (/^\d{0,10}$/.test(value)) {
                                      setnumber(value);
                                    }
                                  }}
                                  placeholder="WhatsApp Number"
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
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* shipping start */}
                <div className="mt-4 border grid lg:grid-cols-3 md:grid-cols-3 max-sm:grid-cols-1 p-2 rounded py-4">
                  {/* Free Shipping */}
                  <button
                    onClick={() => handleOpenModal("shipping")}
                    className="flex items-center justify-center 2xl:flex-row xl:flex-row lg:flex-col flex-col gap-2 lg:text-base text-xs hover:scale-105 hover:-mt-2 transition-all duration-200 group"
                  >
                    <span className="border-2 p-3 rounded-full green_font group-hover:border-teal-700">
                      <TbTruckDelivery size={30} />
                    </span>
                    <div className="text-left">
                      <p className="text-black">Free Shipping</p>
                      <p className="text-sm"> (2 Days Max.)</p>
                    </div>
                  </button>
                  {/* 7 Days Return */}
                  <button
                    onClick={() => handleOpenModal("return")}
                    className="flex items-center justify-center 2xl:flex-row xl:flex-row lg:flex-col flex-col gap-2 lg:text-base text-xs hover:scale-105 hover:-mt-2 transition-all duration-200 group"
                  >
                    <span className="border-2 p-3 rounded-full green_font group-hover:border-teal-700">
                      <GrReturn size={30} />
                    </span>
                    <div className="text-left">
                      <p className="text-black">7 Days Return</p>
                      <p className="text-sm"> (4 Days Max.)</p>
                    </div>
                  </button>
                  {/* Trusted By */}
                  <button
                    onClick={() => handleOpenModal("trusted")}
                    className="flex items-center justify-center 2xl:flex-row xl:flex-row lg:flex-col flex-col gap-2 lg:text-base text-xs hover:scale-105 hover:-mt-2 transition-all duration-200 group"
                  >
                    <span className="border-2 p-3 rounded-full green_font group-hover:border-teal-700">
                      <VscWorkspaceTrusted size={30} />
                    </span>
                    <p className="text-black">Trusted By 10000+</p>
                  </button>

                  {/* Modals */}
                  {openNewModal && (
                    <div
                      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                      onClick={handleCloseModal}
                    >
                      <div
                        className="bg-white rounded-lg shadow-lg max-w-md w-full relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Close Button */}
                        <button
                          className="absolute top-4 right-2 text-gray-500 hover:text-black"
                          onClick={handleCloseModal}
                        >
                          <X />
                        </button>

                        {/* Modal Content */}
                        {openNewModal === "shipping" && (
                          <div>
                            <h2 className="text-xl font-bold mb-4 bg-teal-50 px-6 py-3 rounded-t-lg flex gap-2 items-center">
                              <TbTruckDelivery
                                size={24}
                                className="text-teal-700"
                              />
                              Free Shipping
                            </h2>
                            <p className="px-6 pb-4">
                            We offer free shipping on all orders across India, ensuring fast and reliable delivery within 3 to 5 days along with secure packaging and live order tracking.
                            </p>
                          </div>
                        )}
                        {openNewModal === "return" && (
                          <div>
                            <h2 className="text-xl font-bold mb-4 bg-teal-50 px-6 py-3 rounded-t-lg flex gap-2 items-center">
                              <GrReturn size={24} className="text-teal-700" />7
                              Days Return
                            </h2>
                            <p className="px-6 pb-4">
                              Not satisfied? No worries! You can return the
                              product within 7 days for a full refund within 4
                              days maximum.
                            </p>
                          </div>
                        )}
                        {openNewModal === "trusted" && (
                          <div>
                            <h2 className="text-xl font-bold mb-4 bg-teal-50 px-6 py-3 rounded-t-lg flex gap-2 items-center">
                              <VscWorkspaceTrusted
                                size={24}
                                className="text-teal-700"
                              />
                              Trusted By 10000+
                            </h2>
                            <p className="px-6 pb-4">
                              We are trusted by over 10,000 customers worldwide
                              for quality products and services.
                            </p>
                          </div>
                        )}
                        {openNewModal === "needHelp" && (
                          <div>
                            <h2 className="text-xl font-bold mb-4 bg-teal-50 px-6 py-3 rounded-t-lg flex gap-2 items-center">
                              <Headset size={24} className="text-teal-700" />
                              How can we help You?
                            </h2>
                            <div className="px-6 pb-4">
                              {!selectedOption && (
                                <>
                                  <button
                                    onClick={() =>
                                      setSelectedOption("bulkOrder")
                                    }
                                    className="rounded-lg border-2 hover:border-teal-700 hover:bg-teal-50 transition duration-500 p-3 flex gap-2 items-center w-full"
                                  >
                                    <Box size={30} className="text-teal-700" />
                                    <div className="flex flex-col justify-start items-start">
                                      <h3 className="text-md font-semibold text-gray-600">
                                        Bulk Order Inquiry
                                      </h3>
                                      <p className="text-gray-500 text-left text-sm">
                                        Get special discount for orders above 30
                                        pieces
                                      </p>
                                    </div>
                                  </button>
                                  <button
                                    onClick={() =>
                                      setSelectedOption("generalHelp")
                                    }
                                    className="rounded-lg border-2 hover:border-teal-700 hover:bg-teal-50 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                  >
                                    <CircleHelp
                                      size={30}
                                      className="text-teal-700"
                                    />
                                    <div className="flex flex-col justify-start items-start">
                                      <h3 className="text-md font-semibold text-gray-600">
                                        General Help
                                      </h3>
                                      <p className="text-gray-500 text-left text-sm">
                                        Question about size, delivery, or other
                                        details
                                      </p>
                                    </div>
                                  </button>
                                </>
                              )}

                              {/* Bulk Order Content */}
                              {selectedOption === "bulkOrder" && (
                                <div className="flex gap-2 items-start">
                                  <button
                                    onClick={() => setSelectedOption(null)}
                                    className="mb-4 text-teal-700 underline"
                                  >
                                    <ArrowLeft />
                                  </button>
                                  <div className="border rounded-lg p-3 w-full bg-teal-50">
                                    <p className="text-sm border-b pb-2 mb-2">
                                      Mon - Sun - 10:00 am to 7:00 pm
                                    </p>
                                    <a
                                      href="https://wa.me/+918800217402"
                                      target="_blank"
                                      className="rounded-lg bg-white border-2 hover:border-teal-700 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                    >
                                      <MessageCircle
                                        size={30}
                                        className="text-teal-700"
                                      />
                                      <div className="flex flex-col justify-start items-start">
                                        <p className="text-teal-700 font-noraml text-left text-sm">
                                          Chat on Whatsapp
                                        </p>
                                      </div>
                                    </a>

                                    <a
                                      href="tel:+918800217402"
                                      className="rounded-lg bg-white border-2 hover:border-teal-700 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                    >
                                      <Phone
                                        size={30}
                                        className="text-teal-700"
                                      />
                                      <div className="flex flex-col justify-start items-start">
                                        <p className="text-teal-700 font-noraml text-left text-sm">
                                          +91 8800217402
                                        </p>
                                      </div>
                                    </a>

                                    <a
                                      href="mailto:rakesh@internationalgift.in"
                                      className="rounded-lg bg-white border-2 hover:border-teal-700 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                    >
                                      <Mail
                                        size={30}
                                        className="text-teal-700"
                                      />
                                      <div className="flex flex-col justify-start items-start">
                                        <p className="text-teal-700 font-noraml text-left text-sm">
                                          rakesh@internationalgift.in
                                        </p>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              )}

                              {/* General Help Content */}
                              {selectedOption === "generalHelp" && (
                                <div className="flex gap-2 items-start">
                                  <button
                                    onClick={() => setSelectedOption(null)}
                                    className="mb-4 text-teal-700 underline"
                                  >
                                    <ArrowLeft />
                                  </button>
                                  <div className="border rounded-lg p-3 w-full bg-teal-50">
                                    <p className="text-sm border-b pb-2 mb-2">
                                      Mon - Sun - 10:00 am to 7:00 pm
                                    </p>
                                    <a
                                      href="https://wa.me/+918800217402"
                                      target="_blank"
                                      className="rounded-lg bg-white border-2 hover:border-teal-700 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                    >
                                      <MessageCircle
                                        size={30}
                                        className="text-teal-700"
                                      />
                                      <div className="flex flex-col justify-start items-start">
                                        <p className="text-teal-700 font-noraml text-left text-sm">
                                          Chat on Whatsapp
                                        </p>
                                      </div>
                                    </a>

                                    <a
                                      href="tel:+918800217402"
                                      className="rounded-lg bg-white border-2 hover:border-teal-700 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                    >
                                      <Phone
                                        size={30}
                                        className="text-teal-700"
                                      />
                                      <div className="flex flex-col justify-start items-start">
                                        <p className="text-teal-700 font-noraml text-left text-sm">
                                          +91 8800217402
                                        </p>
                                      </div>
                                    </a>

                                    <a
                                      href="mailto:rakesh@internationalgift.in"
                                      className="rounded-lg bg-white border-2 hover:border-teal-700 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                    >
                                      <Mail
                                        size={30}
                                        className="text-teal-700"
                                      />
                                      <div className="flex flex-col justify-start items-start">
                                        <p className="text-teal-700 font-noraml text-left text-sm">
                                          rakesh@internationalgift.in
                                        </p>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* shipping end */}

                {/* coupon start */}
                <div className="mt-4 border p-4 rounded">
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="bg_green rounded-full text-white p-1 px-2 text-sm">
                      %
                    </span>
                    <span className="text-black font-semibold">
                      Get this under ₹
                      {maxCouponDiscount(
                        couponDiscounts?.coupons?.[0]?.discountPercent || 0,
                        couponDiscounts?.coupons?.[1]?.discountPercent || 0
                      )}
                    </span>
                    <span className="bg-teal-100 text-sm green_font px-2 py-1 rounded">
                      Save up to ₹
                      {parseFloat(productData?.discountedPrice || 0) -
                        maxCouponDiscount(
                          couponDiscounts?.coupons?.[0]?.discountPercent || 0,
                          couponDiscounts?.coupons?.[1]?.discountPercent || 0
                        )}
                    </span>
                  </div>
                  <div className="mt-4 grid lg:grid-cols-2 grid-cols-1 gap-4">
                    {couponDiscounts?.coupons?.length > 0 ? (
                      couponDiscounts.coupons.map((coupon, index) => (
                        <div className="ps-coupon-card" key={index}>
                          <div className="border-b border-dashed pb-2 mb-2">
                            <h3 className="text-lg font-semibold green_font">{coupon.title || 'No Title'}</h3>
                            <p className="text-xs text-gray-500 font-normal">
                              {coupon.desc || 'No description available.'}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-gray-500 text-sm">
                              <span className="font-medium text-gray-600">Code: </span>
                              {coupon.code || 'N/A'}
                            </p>
                            <button
                              onClick={() => handleCopy(coupon.code, index)}
                              className="text-sm"
                            >
                              {copiedCouponIndex === index ? (
                                <div className="bg_green text-white rounded px-2 py-1 flex gap-1 items-center">
                                  <Copy size={16} /> Copied!
                                </div>
                              ) : (
                                <div className="text-sm transition duration-300 flex gap-1 items-center py-1">
                                  <Copy size={16} /> Copy
                                </div>
                              )}
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500">
                        <p>No coupons available at the moment.</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* coupon end */}

                {/* need help start */}
                <button
                  onClick={() => handleOpenModal("needHelp")}
                  className="mt-4 border-2 p-4 flex justify-between items-center rounded hover:border-teal-700 transition duration-500 w-full hover:bg-teal-50"
                >
                  <div className="flex gap-2">
                    <span className="text-teal-700">
                      <Headset size={30} />
                    </span>
                    <div className="flex flex-col items-start justify-start">
                      <h3 className="text-lg text-gray-600 font-semibold">
                        Need Help?
                      </h3>
                      <p className="text-sm text-gray-500">
                        Get Assistance or Bulk Order Discount
                      </p>
                    </div>
                  </div>

                  <div className="text-teal-700">
                    <ChevronRight size={30} />
                  </div>
                </button>
                {/* need help end */}

                {/* Variations */}
              </div>
            </div>
          </div>

          <div className="hidden max-sm:block pt-4">
            <div className="product_about_wrapper">
              <h3 className="productTiteNewBaskervilleFont">
                {productData?.title}
              </h3>

              <div className="rating_div flex align-middle mt-2">
                <div className="stars flex items-center mr-3">
                  {reviewData ? (
                    <StarRating rating={reviewData?.averageRating || 5} />
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className="review cursor-pointer hover:underline"
                  onClick={handleReviewsClick}
                >
                  <a href="#forReviewClicked">
                    {reviewData?.reviews?.length ? (
                      `${reviewData?.reviews?.length} ${reviewData?.reviews?.length === 1 ? "Review" : "Reviews"
                      } `
                    ) : (
                      <></>
                    )}{" "}
                  </a>
                </div>
              </div>

              <div className="flex gap-2 items-center mt-2">
                <h3 className="font-bold green_font text-3xl">
                  {currency === "INR" ? "₹" : "$"}
                  {convertedPrice.toFixed(2)}{" "}
                </h3>
                <h3 className="text-gray-400 pt-1 line-through">
                  {currency === "INR" ? "₹" : "$"}{" "}
                  {convertedActualPrice.toFixed(2)}
                </h3>
                <span className="mt-1 bg_green text-white discountPercentage rounded-full font-semibold py-1 px-3 mb-1">
                  {`SAVE ${Math.round(
                    ((convertedActualPrice - convertedPrice) /
                      convertedActualPrice) *
                    100
                  )}%`}
                </span>
              </div>
              <div className="my-2">
                <img
                  loading="lazy"
                  src="/assets/images/icons/payment.png"
                  alt=""
                />
              </div>

              <p className="text-base light_black_font mt-3">
                <span className="text-black font-semibold">
                  Short Description:{" "}
                </span>
                {productData?.shortDescriptionPoints?.map((point, index) => (
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

              {/* <div className="flex"> */}

              {productData?.stockQuantity > 0 ? (
                <>
                  <div className="flex gap-2 mt-4">
                    <div className="w-1/3">
                      <div className="flex items-center justify-center border border-gray-300 rounded-full w-full">
                        <button
                          onClick={decreaseQuantity}
                          className="bg-gray-100 rounded-l-full w-2/5  py-1 border-r border-gray-300"
                        >
                          -
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className=" w-1/5 text-center py-1">
                          {quantity}
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                          onClick={increaseQuantity}
                          disabled={isDisabled}
                          className="bg-gray-100 rounded-r-full w-2/5  py-1 border-l border-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* <div className="w-2/3">
                      <button
                        onClick={(e) => addToCart1(e, productData)}
                        className="bg_darkgray flex gap-1 items-center justify-center text-white px-4 py-2 rounded-full capitalize text-center w-full"
                      >
                        <span>
                          <HiOutlineShoppingBag />
                        </span>{" "}
                        &nbsp; add to cart{" "}
                      </button>
                    </div> */}
                    <div className="w-2/3">
                      {productData?.custom ? (
                        <div className="bg_darkgray text-white px-4 py-2 rounded-full capitalize text-center w-full  2xl:text-base xl:text-base lg:text-sm max-sm:text-sm">
                          <button onClick={() => setShowModal(true)}>
                            Customize
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* <div className="mt-2">
                    <button
                      onClick={(e) => addToCart2(e, productData)}
                      className="bg_green hover:sha text-white px-4 py-2 rounded-full capitalize text-center w-full"
                    >
                      buy now{" "}
                    </button>
                  </div> */}

                  {/* </div> */}
                </>
              ) : (
                <div className="text-red-500 mt-4">
                  Currently Unavailable (Out of Stock)
                </div>
              )}

              <div>
                {showModal ? (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="grid grid-cols-1 bg-white w-[90%] h-[80%] overflow-y-auto">
                      <div className="relative p-6 flex justify-center items-center">
                        <img
                          src="/assets/customize.jpeg"
                          alt="Customize Image Box Demo"
                          className="w-full rounded-lg"
                        />
                        {/* Overlay Text */}
                        <div
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                          style={{ color: textColor }} // Dynamically update text color
                        >
                          <p className="text-base font-bold bg-opacity-70 px-96 rounded break-words">
                            {displayName || "Your Name Here"}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-200 w-full">
                        <div className="p-3 bg-white">
                          <p className="text-red-500">
                            * Only one Customize product at a time{" "}
                          </p>
                          <h2 className="text-xl font-semibold mb-4">
                            Customize Your : {productData.title}{" "}
                          </h2>

                          <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter The Name Here:{" "}
                                <span className="text-red-600">*</span>
                              </label>
                              {/* <input
                                  type="text"
                                  value={username}
                                  onChange={(e) => setusername(e.target.value)}
                                  placeholder="Enter your Name (Under 30 Character)"
                                  className="w-full border border-gray-300 rounded p-2"
                                  required
                                  maxLength="30"
                                /> */}
                              <input
                                type="text"
                                value={username}
                                onChange={(e) => {
                                  const value = e.target.value.slice(0, 30); // Limit input to 30 characters
                                  setusername(value);
                                  setDisplayName(value); // Update display name dynamically
                                }}
                                placeholder="Enter your Name (Under 30 Characters)"
                                className="w-full border border-gray-300 rounded p-2"
                                required
                              />
                            </div>
                            {/* Color Picker */}
                            <div className="mb-4 flex gap-2 items-center">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Choose Text Color:
                              </label>
                              <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)} // Update text color
                                className="w-12 h-8 cursor-pointer"
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
                                maxLength="80"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter Your Whats app Number:
                                <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="text"
                                value={number}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Allow only numbers and limit to 10 digits
                                  if (/^\d{0,10}$/.test(value)) {
                                    setnumber(value);
                                  }
                                }}
                                placeholder="WhatsApp Number"
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
                    </div>
                  </div>
                ) : null}
              </div>

              {/* shipping start */}
              <div className="mt-4 border grid grid-cols-3  p-2 rounded py-4 items-start">
                {/* Free Shipping */}
                <button
                  onClick={() => handleOpenModal("shipping")}
                  className="flex items-center justify-center 2xl:flex-row xl:flex-row lg:flex-col flex-col gap-2 lg:text-base text-xs hover:scale-105 hover:-mt-2 transition-all duration-200 group"
                >
                  <span className="border-2 p-3 rounded-full green_font group-hover:border-teal-700">
                    <TbTruckDelivery size={24} />
                  </span>
                  <div className="text-left">
                    <p className="text-black">Free Shipping</p>
                    <p className="text-sm"> (2 Days Max.)</p>
                  </div>
                </button>
                {/* 7 Days Return */}
                <button
                  onClick={() => handleOpenModal("return")}
                  className="flex items-center justify-center 2xl:flex-row xl:flex-row lg:flex-col flex-col gap-2 lg:text-base text-xs hover:scale-105 hover:-mt-2 transition-all duration-200 group"
                >
                  <span className="border-2 p-3 rounded-full green_font group-hover:border-teal-700">
                    <GrReturn size={24} />
                  </span>
                  <div className="text-left">
                    <p className="text-black">7 Days Return</p>
                    <p className="text-sm"> (4 Days Max.)</p>
                  </div>
                </button>
                {/* Trusted By */}
                <button
                  onClick={() => handleOpenModal("trusted")}
                  className="flex items-center justify-center 2xl:flex-row xl:flex-row lg:flex-col flex-col gap-2 lg:text-base text-xs hover:scale-105 hover:-mt-2 transition-all duration-200 group"
                >
                  <span className="border-2 p-3 rounded-full green_font group-hover:border-teal-700">
                    <VscWorkspaceTrusted size={24} />
                  </span>
                  <p className="text-black">Trusted By 10000+</p>
                </button>

                {/* Modals */}
                {openNewModal && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={handleCloseModal}
                  >
                    <div
                      className="bg-white rounded shadow-lg max-w-md w-full relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Close Button */}
                      <button
                        className="absolute top-4 right-2 text-gray-500 hover:text-black"
                        onClick={handleCloseModal}
                      >
                        <X />
                      </button>

                      {/* Modal Content */}
                      {openNewModal === "shipping" && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 bg-teal-50 px-6 py-3 rounded-t-lg flex gap-2 items-center">
                            <TbTruckDelivery
                              size={24}
                              className="text-teal-700"
                            />
                            Free Shipping
                          </h2>
                          <p className="px-6 pb-4">
                            We offer free shipping on all orders across India, ensuring fast and reliable delivery within 3 to 5 days along with secure packaging and live order tracking.
                          </p>
                        </div>
                      )}
                      {openNewModal === "return" && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 bg-teal-50 px-6 py-3 rounded-t-lg flex gap-2 items-center">
                            <GrReturn size={24} className="text-teal-700" />7
                            Days Return
                          </h2>
                          <p className="px-6 pb-4">
                            Not satisfied? No worries! You can return the
                            product within 7 days for a full refund within 4
                            days maximum.
                          </p>
                        </div>
                      )}
                      {openNewModal === "trusted" && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 bg-teal-50 px-6 py-3 rounded-t-lg flex gap-2 items-center">
                            <VscWorkspaceTrusted
                              size={24}
                              className="text-teal-700"
                            />
                            Trusted By 10000+
                          </h2>
                          <p className="px-6 pb-4">
                            We are trusted by over 10,000 customers worldwide
                            for quality products and services.
                          </p>
                        </div>
                      )}
                      {openNewModal === "needHelp" && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 bg-teal-50 px-6 py-3 rounded-t-lg flex gap-2 items-center">
                            <Headset size={24} className="text-teal-700" />
                            How can we help You?
                          </h2>
                          <div className="px-6 pb-4">
                            {!selectedOption && (
                              <>
                                <button
                                  onClick={() => setSelectedOption("bulkOrder")}
                                  className="rounded-lg border-2 hover:border-teal-700 hover:bg-teal-50 transition duration-500 p-3 flex gap-2 items-start w-full"
                                >
                                  <Box size={30} className="text-teal-700" />
                                  <div className="flex flex-col justify-start items-start">
                                    <h3 className="text-md font-semibold text-gray-600">
                                      Bulk Order Inquiry
                                    </h3>
                                    <p className="text-gray-500 text-left text-sm">
                                      Get special discount for orders above 30
                                      pieces
                                    </p>
                                  </div>
                                </button>
                                <button
                                  onClick={() =>
                                    setSelectedOption("generalHelp")
                                  }
                                  className="rounded-lg border-2 hover:border-teal-700 hover:bg-teal-50 transition duration-500 p-3 flex gap-2 items-start w-full mt-3"
                                >
                                  <CircleHelp
                                    size={30}
                                    className="text-teal-700"
                                  />
                                  <div className="flex flex-col justify-start items-start">
                                    <h3 className="text-md font-semibold text-gray-600">
                                      General Help
                                    </h3>
                                    <p className="text-gray-500 text-left text-sm">
                                      Question about size, delivery, or other
                                      details
                                    </p>
                                  </div>
                                </button>
                              </>
                            )}

                            {/* Bulk Order Content */}
                            {selectedOption === "bulkOrder" && (
                              <div className="flex gap-2 items-start">
                                <button
                                  onClick={() => setSelectedOption(null)}
                                  className="mb-4 text-teal-700 underline"
                                >
                                  <ArrowLeft />
                                </button>
                                <div className="border rounded-lg p-3 w-full bg-teal-50">
                                  <p className="text-sm border-b pb-2 mb-2">
                                    Mon - Sun - 10:00 am to 7:00 pm
                                  </p>
                                  <a
                                    href="https://wa.me/+918800217402"
                                    target="_blank"
                                    className="rounded-lg bg-white border-2 hover:border-teal-700 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                  >
                                    <MessageCircle
                                      size={30}
                                      className="text-teal-700"
                                    />
                                    <div className="flex flex-col justify-start items-start">
                                      <p className="text-teal-700 font-noraml text-left text-sm">
                                        Chat on Whatsapp
                                      </p>
                                    </div>
                                  </a>

                                  <a
                                    href="tel:+918800217402"
                                    className="rounded-lg bg-white border-2 hover:border-teal-700 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                  >
                                    <Phone
                                      size={30}
                                      className="text-teal-700"
                                    />
                                    <div className="flex flex-col justify-start items-start">
                                      <p className="text-teal-700 font-noraml text-left text-sm">
                                        +91 8800217402
                                      </p>
                                    </div>
                                  </a>

                                  <a
                                    href="mailto:rakesh@internationalgift.in"
                                    className="rounded-lg bg-white border-2 hover:border-teal-700 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                  >
                                    <Mail size={30} className="text-teal-700" />
                                    <div className="flex flex-col justify-start items-start">
                                      <p className="text-teal-700 font-noraml text-left text-sm">
                                        rakesh@internationalgift.in
                                      </p>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* General Help Content */}
                            {selectedOption === "generalHelp" && (
                              <div className="flex gap-2 items-start">
                                <button
                                  onClick={() => setSelectedOption(null)}
                                  className="mb-4 text-teal-700 underline"
                                >
                                  <ArrowLeft />
                                </button>
                                <div className="border rounded-lg p-3 w-full bg-teal-50">
                                  <p className="text-sm border-b pb-2 mb-2">
                                    Mon - Sun - 10:00 am to 7:00 pm
                                  </p>
                                  <a
                                    href="https://wa.me/+918800217402"
                                    target="_blank"
                                    className="rounded-lg bg-white border-2 hover:border-teal-700 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                  >
                                    <MessageCircle
                                      size={30}
                                      className="text-teal-700"
                                    />
                                    <div className="flex flex-col justify-start items-start">
                                      <p className="text-teal-700 font-noraml text-left text-sm">
                                        Chat on Whatsapp
                                      </p>
                                    </div>
                                  </a>

                                  <a
                                    href="tel:+918800217402"
                                    className="rounded-lg bg-white border-2 hover:border-teal-700 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                  >
                                    <Phone
                                      size={30}
                                      className="text-teal-700"
                                    />
                                    <div className="flex flex-col justify-start items-start">
                                      <p className="text-teal-700 font-noraml text-left text-sm">
                                        +91 8800217402
                                      </p>
                                    </div>
                                  </a>

                                  <a
                                    href="mailto:rakesh@internationalgift.in"
                                    className="rounded-lg bg-white border-2 hover:border-teal-700 transition duration-500 p-3 flex gap-2 items-center w-full mt-3"
                                  >
                                    <Mail size={30} className="text-teal-700" />
                                    <div className="flex flex-col justify-start items-start">
                                      <p className="text-teal-700 font-noraml text-left text-sm">
                                        rakesh@internationalgift.in
                                      </p>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* shipping end */}

              {/* coupon start */}
              <div className="mt-4 border p-4 rounded">
                <div className="flex gap-2 items-center flex-wrap">
                  <span className="bg_green rounded-full text-white p-1 px-2 text-sm">
                    %
                  </span>
                  <span className="text-black font-semibold">
                    Get this under ₹
                    {maxCouponDiscount(
                      couponDiscounts?.coupons?.[0]?.discountPercent || 0,
                      couponDiscounts?.coupons?.[1]?.discountPercent || 0
                    )}
                  </span>
                  <span className="bg-teal-100 text-sm green_font px-2 py-1 rounded">
                    Save up to ₹
                    {parseFloat(productData?.discountedPrice || 0) -
                      maxCouponDiscount(
                        couponDiscounts?.coupons?.[0]?.discountPercent || 0,
                        couponDiscounts?.coupons?.[1]?.discountPercent || 0
                      )}
                  </span>
                </div>
                <div className="mt-4 grid lg:grid-cols-2 grid-cols-1 gap-4">
                  {couponDiscounts?.coupons?.length > 0 ? (
                    couponDiscounts.coupons.map((coupon, index) => (
                      <div className="ps-coupon-card" key={index}>
                        <div className="border-b border-dashed pb-2 mb-2">
                          <h3 className="text-lg font-semibold green_font">
                            {coupon.title || 'No Title'}
                          </h3>
                          <p className="text-xs text-gray-500 font-normal">
                            {coupon.desc || 'No description available.'}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-500 text-sm">
                            <span className="font-medium text-gray-600">Code: </span>
                            {coupon.code || 'N/A'}
                          </p>
                          <button
                            onClick={() => handleCopy(coupon.code || '', index)}
                            className="text-sm"
                          >
                            {copiedCouponIndex === index ? (
                              <div className="bg_green text-white rounded px-2 py-1 flex gap-1 items-center">
                                <Copy size={16} /> Copied!
                              </div>
                            ) : (
                              <div className="text-sm transition duration-300 flex gap-1 items-center py-1">
                                <Copy size={16} /> Copy
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">
                      <p>No coupons available at the moment.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* coupon end */}

              {/* need help start */}
              <button
                onClick={() => handleOpenModal("needHelp")}
                className="mt-4 border-2 p-2 py-4 flex justify-between items-center rounded hover:border-teal-700 transition duration-500 w-full hover:bg-teal-50"
              >
                <div className="flex gap-2">
                  <span className="text-teal-700">
                    <Headset size={24} />
                  </span>
                  <div className="flex flex-col items-start justify-start">
                    <h3 className="text-md text-gray-600 font-semibold">
                      Need Help?
                    </h3>
                    <p className="text-xs text-gray-500 text-left">
                      Get Assistance or Bulk Order Discount
                    </p>
                  </div>
                </div>

                <div className="text-teal-700">
                  <ChevronRight size={30} />
                </div>
              </button>
              {/* need help end */}

              {/* Variations */}
              <div className="product_variations">
                <h2 className="text-xl font-semibold light_black_font mt-4">
                  Variations
                </h2>
                <div className="">
                  {skuData?.length > 0 ? (
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
                      navigation={true}
                      scrollbar={{ draggable: true }}
                      breakpoints={{
                        // Mobile small (smaller than 500px)
                        320: {
                          slidesPerView: 2.2,
                          // spaceBetween: 20,
                        },
                        400: {
                          slidesPerView: 2.8,
                          // spaceBetween: 20,
                        },
                        640: {
                          slidesPerView: 3,
                          // spaceBetween: 20,
                        },
                        // Tablets (around 768px)
                        768: {
                          slidesPerView: 3, // Can show partial next slide
                          // spaceBetween: 15,
                        },
                        // Tablets large (around 1024px)
                        1024: {
                          slidesPerView: 3.5, // Showing 2 slides
                          // spaceBetween: 20,
                        },
                        // Laptops (around 1300px)
                        1300: {
                          slidesPerView: 4.5, // Show 2.5 slides
                          // spaceBetween: 25,
                        },
                        // Desktop (larger than 1500px)
                        1500: {
                          slidesPerView: 5, // Show 3 full slides
                          // spaceBetween: 15,
                        },
                        1920: {
                          slidesPerView: 6,
                          spaceBetween: 15,
                        },
                      }}
                      modules={[Autoplay, Navigation, A11y]}
                      className="swiper-wrapper mx-auto mb-4"
                    >
                      {skuData?.map((data) => (
                        //  <Variations key={data._id} images={data.images} />
                        <SwiperSlide key={data._id}>
                          <a href={`/product/${data._id}`}>
                            {/* <div className="border rounded-lg"> */}
                            <div
                              className={`border rounded-lg ${urldata === data._id
                                ? "border-4 border-black-500 shadow-xl"
                                : ""
                                }`}
                            >
                              <img
                                loading="lazy"
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
                  ) : (
                    // Fallback message if no products are available
                    <p className="text-center green_font mt-4">
                      No products available at the moment.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row product_details mt-4" id="forReviewClicked">
            <div className="mb-4 mt-2 flex justify-center items-center">
              <ul
                className="flex justify-center items-center tabs_ul  -mb-px text-sm font-medium text-center max-sm:flex-col w-full"
                role="tablist"
              >
                <li className="me-2 max-sm:w-full" role="presentation">
                  <button
                    className={`inline-block mt-2 px-4 py-2 max-sm:w-full ${activeTab === "general_info"
                      ? "green_bg_white_font"
                      : "hover:text-gray-600 hover:border-gray-300"
                      }`}
                    onClick={() => handleTabClick("general_info")}
                  >
                    General Information
                  </button>
                </li>
                <li className="me-2 max-sm:w-full" role="presentation">
                  <button
                    className={`inline-block mt-2 px-4 py-2 max-sm:w-full ${activeTab === "additional_info"
                      ? "green_bg_white_font"
                      : "hover:text-gray-600 hover:border-gray-300"
                      }`}
                    onClick={() => handleTabClick("additional_info")}
                  >
                    Additional Information
                  </button>
                </li>
                <li className="me-2 max-sm:w-full" role="presentation">
                  <button
                    className={`inline-block mt-2 px-4 py-2 max-sm:w-full ${activeTab === "reviews"
                      ? "green_bg_white_font"
                      : "hover:text-gray-600 hover:border-gray-300"
                      }`}
                    onClick={() => handleTabClick("reviews")}
                  >
                    Product Reviews
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
                            <tr className="flex flex-wrap lg:table-row">
                              {/* First Column: Show up to 5 entries */}
                              <td className="w-full lg:w-1/2 align-top p-2">
                                <table className="min-w-full table-auto">
                                  <tbody>
                                    {Object.entries(productData?.property)
                                      .slice(0, 10)
                                      ?.map(([key, value], index) => (
                                        <tr
                                          key={index}
                                          className="border-b border-t"
                                        >
                                          <td className="px-4 py-2 font-medium text-gray-700 bg-gray-100 max-sm:text-sm">
                                            {key}
                                          </td>
                                          <td className="px-4 py-2 text-gray-500 bg-white max-sm:text-sm">
                                            {value}
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </td>

                              {/* Second Column: Remaining entries after the first 5 */}
                              <td className="w-full lg:w-1/2 align-top p-2">
                                <table className="min-w-full table-auto">
                                  <tbody>
                                    {Object.entries(productData?.property)
                                      .slice(10)
                                      ?.map(([key, value], index) => (
                                        <tr
                                          key={index}
                                          className="border-b border-t"
                                        >
                                          <td className="px-4 py-2 font-medium text-gray-700 bg-gray-100 max-sm:text-sm">
                                            {key}
                                          </td>
                                          <td className="px-4 py-2 text-gray-500 bg-white max-sm:text-sm">
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
                <div
                  className="p-4 rounded-xl bg-gray-50"
                  ref={reviewsSectionRef}
                >
                  <div className="row">
                    <div className="col-md-12 right_review_section px-5">
                      <div className="average_review mb-4">
                        <p className="text-lg font-medium text-gray-900">
                          Average Review: &nbsp;
                          <span className="green_font">
                            {reviewData?.averageRating.toFixed(2) || "N/A"}
                          </span>
                        </p>
                        <div className="flex align-middle">
                          <div className="review mt-3">
                            Total Reviews: {reviewData?.reviews?.length}
                          </div>
                        </div>
                      </div>
                      <div className="review_items">
                        {/* {Array.isArray(productData.reviews) &&
                        reviewData?.length > 0 ? (
                          reviewData.reviews?.map((review, index) => {
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
                                        {[...Array(rating)]?.map((_, i) => (
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
                            reviewData?.reviews?.length > 0 ? (
                            reviewData?.reviews?.map((reviewer, index) => (
                              <div key={index} className="flex gap-4 mb-5">
                                <div>
                                  <FaUserCircle size={25} />
                                </div>
                                <div>
                                  <h5 className="text-sm text-textClr font-semibold mb-2">
                                    {reviewer.name}
                                  </h5>
                                  <div className="flex items-center text-yellowclr mb-3 stars">
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

                                <div className="mb-4 stars">
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
                                    >
                                      Buy Now
                                    </Link>
                                    OR
                                    <Link
                                      href="/login"
                                      className="bg_green text-sm text-white py-2 px-4 rounded mt-3 ml-4"
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

        {/* <NewArrival related={productData.properties} title="Related Products" /> */}
        <RelatedProduct
          related={productData?.properties}
          title="Related Products"
        />
      </div>
      <Footer />
      <div className="lg:hidden block">
        <div className="bg-white fixed bottom-0 left-0 border w-full p-2 py-3 shaodw-lg grid gap-2 grid-cols-2 text-sm z-10">
          <div>
            <button
              onClick={(e) => addToCart1(e, productData)}
              className="bg_darkgray flex gap-1 items-center justify-center text-white px-4 py-2 rounded-full capitalize text-center w-full"
            >
              {/* <span>
                <HiOutlineShoppingBag />
              </span>{" "}
              &nbsp; add to cart{" "} */}
              add to cart
            </button>
          </div>
          <div>
            <button
              onClick={(e) => addToCart2(e, productData)}
              className="bg_green hover:sha text-white px-4 py-2 rounded-full capitalize text-center w-full"
            >
              buy now{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
