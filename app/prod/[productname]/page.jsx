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
import {
  ShoppingBasket,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  X,
  ZoomIn,
} from "lucide-react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  console.log(productData);

  // Initial quantity
  const [isDisabled, setIsDisabled] = useState(false); // State to control button disabled status

  const imageContainerRef = useRef(null);
  const contentRefs = useRef([null, null, null]);

  // const handleThumbnailClick = (index) => {
  //   setCurrentIndex(index);
  //   if (imageContainerRef.current) {
  //     const thumbnail = imageContainerRef.current.children[index];
  //     thumbnail.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center", // Centers the thumbnail vertically
  //       inline: "center", // Centers the thumbnail horizontally
  //     });
  //   }
  // };

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

  // const [activeProductTab, setActiveProductTab] = useState(0);

  const handleProductTabClick = (index) => {
    setActiveProductTab(index);
  };

  const handleNextImage = () => {
    setActiveProductTab(
      (prevIndex) => (prevIndex + 1) % productData.images.length
    );
  };

  const handlePrevImage = () => {
    setActiveProductTab((prevIndex) =>
      prevIndex === 0 ? productData.images.length - 1 : prevIndex - 1
    );
  };

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

  // const maxQuantity = productData?.stockQuantity - 7;
  // const increaseQuantity = () => {
  //   setQuantity((prev) => {
  //     const newQuantity = prev + 1;

  //     // Check if newQuantity exceeds or hits the limit
  //     if (newQuantity >= maxQuantity) {
  //       setIsDisabled(true); // Disable button if limit is reached
  //     }

  //     // Call addToCartHandler with the updated quantity
  //     addToCartHandler(new Event("click"), {
  //       ...productData,
  //       quantity: newQuantity,
  //     });

  //     return newQuantity <= maxQuantity ? newQuantity : prev; // Prevent going above the limit
  //   });
  // };

  // const decreaseQuantity = () => {
  //   // if (quantity > 1) setQuantity((prev) => prev - 1);
  //   setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent decrementing below 1
  // };

  const maxQuantity = productData?.stockQuantity - 7;

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // if (!files || files.length === 0) {
  //   //   alert("Please select files to upload");
  //   //   return;
  //   // }

  //   if (files.length > 5) {
  //     alert("You can only upload a maximum of 5 files");
  //     return;
  //   }

  //   const formData = new FormData();

  //   // Append each file to the FormData object
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append("files", files[i]);
  //   }

  //   try {
  //     // Make the POST request to upload the files
  //     const { data } = await axios.post("/api/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     // Log the uploaded file URLs
  //     //console.log("Uploaded File URLs:", data.links);

  //     if (typeof window !== "undefined") {
  //       sessionStorage.setItem("message", message);
  //       sessionStorage.setItem("username", username);
  //       sessionStorage.setItem("number", number);

  //       // Store all image URLs in sessionStorage as a JSON string
  //       sessionStorage.setItem("imageUrls", JSON.stringify(data.links));

  //       alert("Data Uploaded");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading files:", error);
  //   } finally {
  //     // Close the modal
  //     setShowModal(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      let uploadedLinks = [];

      if (files && files.length > 0) {
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

  // useEffect(() => {
  //   if (urldata == skuData._id) {

  //   }
  // }, []);

  const handleReviewsClick = () => {
    // Set the active tab to 'reviews'
    handleTabClick("reviews");
    // Scroll to the reviews section
    reviewsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % productData.images.length;
      handleThumbnailClick(newIndex); // Center the new active thumbnail
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex =
        (prevIndex - 1 + productData.images.length) % productData.images.length;
      handleThumbnailClick(newIndex); // Center the new active thumbnail
      return newIndex;
    });
  };

  console.log("A [roduct", productData);

  return (
    <div>
      <div className="product mt-3">
        <div className="container">
          <div className="container mx-auto p-4 pt-10 mt-20 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {/* Left: Image Section */}
            <div className="hidden lg:block md:block">
              <div className="flex gap-4">
                {/* Smaller image */}
                <div
                  ref={imageContainerRef}
                  className="flex flex-col gap-4 h-[auto] lg:max-h-[600px] md:max-h-[300px] max-sm:max-h-[200px] overflow-y-auto scrollbar-hidden relative"
                >
                  {productData.images?.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt="Product Thumbnail"
                        className={`border rounded-lg h-[auto] lg:max-h-[100px] md:max-h-[80px] max-sm:max-h-[60px] mx-auto cursor-pointer ${
                          currentIndex === index
                            ? "border-primary bg-secondary-light"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                      />
                      {currentIndex === index && (
                        <div className="absolute inset-0 border-2 border-primary rounded-lg"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bigger image */}
                <div className="relative bg-secondary-light henlyproductslider overflow-hidden rounded-lg">
                  <img
                    src={
                      productData?.images?.[currentIndex] ||
                      "/default-image.jpg"
                    }
                    alt={productData?.title || "Product Image"}
                    className="h-[auto] lg:max-h-[600px] md:max-h-[300px] max-sm:max-h-[200px] mx-auto rounded-lg cursor-zoom-in"
                    onClick={() => openModal(currentIndex)}
                     loading="lazy"
                  />
                  
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
                  <div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-50">
                    <div className="w-full">
                      <button
                        onClick={closeModal}
                        className="absolute top-0 right-0 p-2 text-white bg-transparent rounded-full hover:bg-gray-500 transition duration-300"
                      >
                        <X />
                      </button>

                      {/* Image Container with Draggable */}
                      <img
                        src={
                          productData?.images?.[currentIndex] ||
                          "/default-image.jpg"
                        }
                        alt={productData?.title || "Product Image"}
                        className={`w-full max-w-screen-sm mx-auto rounded-lg transition-transform cursor-zoom-in ${
                          isZoomed ? "scale-150" : "scale-100"
                        }`}
                        onClick={toggleZoom}
                      />

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
            {/* for mobile view */}
            <div className="lg:hidden md:hidden">
              <div className="flex flex-col gap-4">
                {/* Smaller image */}
                <div
                  ref={imageContainerRef}
                  className="flex flex-row gap-4 overflow-x-auto w-full scrollbar-hidden relative order-2"
                >
                  {productData.images?.map((image, index) => (
                    <div key={index} className="relative flex-none">
                      <img
                        src={image}
                        alt="Product Thumbnail"
                        className={`border rounded-lg h-[60px] w-[60px] mx-auto cursor-pointer ${
                          currentIndex === index
                            ? "border-primary bg-secondary-light"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                      />
                      {currentIndex === index && (
                        <div className="absolute inset-0 border-2 border-primary rounded-lg"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bigger image */}
                <div className="relative bg-secondary-light henlyproductslider overflow-hidden rounded-lg order-1">
                  <img
                    src={
                      productData?.images?.[currentIndex] ||
                      "/default-image.jpg"
                    }
                    alt={productData?.title || "Product Image"}
                    className="h-[300px] mx-auto rounded-lg cursor-zoom-in"
                    onClick={() => openModal(currentIndex)}
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-full hover:p-3 product-button-prev"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-full hover:p-3 product-button-next"
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
                        className="absolute top-2 right-0 p-2 text-white bg-transparent rounded-full hover:bg-gray-500 transition duration-300"
                      >
                        <X />
                      </button>

                      {/* Image Container with Draggable */}
                      <img
                        src={productData.images[currentIndex]}
                        alt="Product Image"
                        className={`w-full max-w-screen-sm mx-auto rounded-lg transition-transform cursor-zoom-in ${
                          isZoomed ? "scale-150" : "scale-100"
                        }`}
                        onClick={toggleZoom}
                      />

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
        </div>
      </div>
    </div>
  );
};

export default Page;
