"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import CartItem from "./CartItem";
import { useCartStore } from "../../stores/useCartStore";
import useFromStore from "../../hooks/useFromStore";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Spinner } from "@nextui-org/react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [address, setAddress] = useState([]);

  const { data: session } = useSession();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  // const { clearCart } = useCartStore.getState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [price, setPrice] = useState();
  const [message, setMessage] = useState("");
  const [messageURL, setMessageURL] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0); // To track the final price after applying coupon

  // const validCoupons = {
  //   GIFT10: 10, // Example coupon: "GIFT10" gives a 10% discount
  //   SAVE15: 15, // Another example: "SAVE15" gives a 15% discount
  // };

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.discountedPrice * (product.quantity || 0),
      0
    );
  }

  useEffect(() => {
    // Set the final price whenever the cart changes
    setFinalPrice(total);
  }, [cart]); // Runs when the cart changes

  // const [formData, setFormData] = useState({
  //     amount: '',
  //     purpose: 'testing',
  //     buyer_name: '',
  //     email: '',
  //     phone: ''
  // });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const router = useRouter();

  const handleCouponCheckboxChange = () => {
    // to toggle coupon code based on checkbox click
    setShowCouponInput(!showCouponInput);
  };

  // Handle coupon code input change
  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  /// Handle applying the coupon code
  const [couponDiscounts, setDiscountCoupons] = useState([]);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get("/api/coupons");
        if (Array.isArray(response.data.coupons)) {
          setDiscountCoupons(response.data.coupons); // Set coupons to state if response contains an array of coupons
        } else {
          setError("Invalid coupons data");
        }
        setError(null); // Reset any previous errors
      } catch (err) {
        setError("Failed to fetch coupons"); // Handle error
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchCoupons();
  }, []);

  // console.log("profile", profile);

  useEffect(() => {
    if (session) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(
            `/api/user?condition=${session.user.email}`
          );
          setProfile(response.data);
        } catch (error) {
          // console.error(error);
        }
      };
      fetchProfile();
    }
  }, [session]);

  const handleApplyCoupon = () => {
    // console.log("Profile:", profile); // Debugging: Log user profile data

    // Check if the user has already used a coupon
    if (profile.hasUsedCuppon) {
      alert("You have already used a coupon. Cannot apply another one.");
      return;
    }

    // Find the coupon based on the code
    const coupon = couponDiscounts.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase()
    );

    if (coupon) {
      let discountAmount = 0;
      let discountPercentage = 0;

      // Check if the coupon has a discount percent or discount amount
      if (coupon.discountPercent) {
        discountPercentage = coupon.discountPercent;
        discountAmount = (total * discountPercentage) / 100;
      } else if (coupon.discountAmount) {
        discountAmount = coupon.discountAmount;
      }

      if (!discountApplied) {
        const newFinalPrice = total - discountAmount;
        setFinalPrice(newFinalPrice); // Update the final price with discount
        setDiscountApplied(true);

        alert(
          `Coupon applied! ${
            discountPercentage
              ? `${discountPercentage}% discount`
              : `₹${discountAmount} discount`
          } added.`
        );

        // Update the user's profile to indicate they have used a coupon
        // Ideally, this should be updated on the server side as well
        profile.hasUsedCoupon = true; // Temporary local update
      } else {
        alert("Coupon already applied.");
      }
    } else {
      alert("Invalid coupon code. Please try again.");
    }
  };
  // Handle removing the coupon
  const handleRemoveCoupon = () => {
    setFinalPrice(total); // Reset the final price back to total
    setDiscountApplied(false); // Mark the coupon as removed
    setCouponCode(""); // Optionally, clear the coupon code input
  };
  // //console.log("cart is",cart)

  // useEffect(() => {
  //     const totalAmount = cart ? cart.reduce((acc, product) => acc + product.price * (product.quantity || 0), 0) : 0;
  //     if (session) {
  //         setFormData({
  //             ...formData,
  //             amount: totalAmount.toString(),
  //             buyer_name: session.user?.name || '',
  //             email: session.user?.email || '',
  //             phone: session.user?.number || '',
  //             cart:cart || '',
  //             // quentity: cart[0]?.quantity || '',
  //             // title: cart[0]?.title || '',
  //             // sku: cart[0]?.sku || '',
  //             Weight: cart[0]?.property?.Weight || '',
  //             // images: cart[0]?.images[0] || '',
  //             address: session.user?.address || '',
  //             city: session.user.city || '',
  //             postalCode: session.user.postalCode || '',
  //             country: session.user.country || '',
  //             region: session.user.region || '',

  //         });
  //     }
  // }, [cart, session]);
  const [storedMessage, setStoredMessage] = useState(null);
  const [storedusername, setStoredusername] = useState(null);
  const [storednumber, setStorednumber] = useState(null);
  const [storedImageUrl, setStoredImageUrl] = useState([]);

  useEffect(() => {
    // Check if we're in the browser (client-side)
    if (typeof window !== "undefined") {
      const message = sessionStorage.getItem("message");
      const username = sessionStorage.getItem("username");
      const number = sessionStorage.getItem("number");
      const imageUrlString = sessionStorage.getItem("imageUrls");

      const imageUrl = imageUrlString ? JSON.parse(imageUrlString) : [];

      setStoredMessage(message);
      setStoredusername(username);
      setStorednumber(number);
      setStoredImageUrl(imageUrl);
    }
  }, []);

  const clearOrderData = () => {
    if (typeof window !== "undefined") {
      // Remove specific session storage items
      sessionStorage.removeItem("message");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("number");
      sessionStorage.removeItem("imageUrls");

      // Optionally reset the local state if needed
      setStoredMessage(null);
      setStoredusername(null);
      setStorednumber(null);
      setStoredImageUrl([]);
    }
  };

  //console.log('session data is ',storedMessage,storedImageUrl,storednumber,storedusername)

  const [formData, setFormData] = useState({
    buyer_name: "",
    email: "",
    phone: "",
    cart: [],
    Weight: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    region: "",
    storedMessage: "",
    storedImageUrl: "",
  });

  const [hasAddressChanged, setHasAddressChanged] = useState(false); // Track address changes

  useEffect(() => {
    const totalAmount = cart
      ? cart.reduce(
          (acc, product) =>
            acc + product.discountedPrice * (product.quantity || 0),
          0
        )
      : 0;
    if (session) {
      setPrice(finalPrice);
      setFormData((prevFormData) => ({
        ...prevFormData,
        amount: finalPrice,
        buyer_name: prevFormData.buyer_name || session.user?.name || "",
        email: prevFormData.email || session.user?.email || "",
        phone: prevFormData.phone || session.user?.number || "",
        cart: cart || prevFormData.cart,
        // Weight: prevFormData.Weight || cart[0]?.property?.Weight || "",
        Weight:
          prevFormData.Weight ||
          (cart && cart.length > 0 ? cart[0]?.property?.Weight : ""),
        // address: prevFormData.address || session.user?.address || "",
        // city: prevFormData.city || session.user?.city || "",
        // postalCode: prevFormData.postalCode || session.user?.postalCode || "",
        // country: prevFormData.country || session.user?.country || "",
        // region: prevFormData.region || session.user?.region || "",
        address: hasAddressChanged
          ? prevFormData.address
          : session.user?.address || "",
        city: hasAddressChanged ? prevFormData.city : session.user?.city || "",
        postalCode: hasAddressChanged
          ? prevFormData.postalCode
          : session.user?.postalCode || "",
        country: hasAddressChanged
          ? prevFormData.country
          : session.user?.country || "",
        region: hasAddressChanged
          ? prevFormData.region
          : session.user?.region || "",
        storedMessage: storedMessage || "",
        storedImageUrl: storedImageUrl || "",
        storedusername: storedusername || "",
        storednumber: storednumber || "",
      }));
    }
  }, [cart, session, hasAddressChanged, finalPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // If an address field is being changed, set hasAddressChanged to true
    if (["address", "city", "postalCode", "country", "region"].includes(name)) {
      setHasAddressChanged(true);
    }
  };

  const saveNewAddress = async () => {
    if (hasAddressChanged) {
      try {
        const response = await fetch("/api/save-address", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
            region: formData.region,
          }),
        });
        const data = await response.json();
        // console.log("Address saved:", data);
      } catch (error) {
        // console.error("Error saving address:", error);
      }
    }
  };

  //  razor pay

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    alert("online payment is Not avalble Right now");
    // if (!session) {
    //   window.location.href = "/login"; // Redirects to login page
    //   return;
    // }
    // const res = await loadRazorpayScript();

    // if (!res) {
    //   alert("Razorpay SDK failed to load. Are you online?");
    //   return;
    // }

    // setLoading(true);

    // // Create and populate FormData object

    // try {
    //   const response = await fetch("/api/razorpay", {
    //     method: "POST",
    //     body: finalPrice,
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const data = await response.json();
    //   // ////console.log('Order created:', data);

    //   // ////console.log(cart)
    //   // Proceed with Razorpay payment handling here
    //   const options = {
    //     key: process.env.RAZORPAY_KEY_ID, // Your Razorpay Key ID
    //     amount: data.amount, // Amount should match the one created in the backend
    //     currency: "INR",
    //     name: cart[0]?.title,
    //     description: "Purchase Description",
    //     order_id: data.id, // Order ID from the backend
    //     handler: (response) => {
    //       handlePaymentSuccess(response);
    //     },
    //     prefill: {
    //       name: session.user?.name,
    //       email: session.user?.email,
    //       contact: session.user?.number,
    //     },
    //     theme: {
    //       color: "#F37254",
    //     },
    //   };

    //   const rzp = new window.Razorpay(options);
    //   rzp.open();
    // } catch (error) {
    //   console.error("Error:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          formData, // User ID
          // Array of cart items
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Payment successful and Order created");
        setOrderData(data.order);

        clearOrderData();
        setIsModalOpen(true);
        clearCart();
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      // console.error("Error verifying payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // const handleCheckout = async (e) => {
  //     e.preventDefault();
  //     if (!session) {
  //         window.location.href = '/login'; // Redirects to login page
  //     } else {
  //         try {
  //             const response = await axios.post('/api/create-payment', formData);
  //             const paymentRequest = response.data;
  //             // //console.log(paymentRequest);

  //             const longurl = paymentRequest.payment_request.longurl;
  //             window.location.href = longurl; // Redirect to Instamojo payment page
  //         } catch (error) {
  //             setPaymentStatus('Payment request failed. Please try again.');
  //             console.error('Error creating payment request:', error);
  //         }
  //     }
  // };

  const notify2 = () =>
    toast.error("Something Went Wrong! Invalid Email or Password", {
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

  const handleCheckoutCOD = async (e) => {
    e.preventDefault();

    // window.location.href = '/create-order',formData;
    if (!session) {
      // window.location.href = "/login"; // Redirects to login page
      // Capture the referring page URL
      const referringPage = window.location.href;

      // Redirect to login with the referring page as a query parameter
      window.location.href = `/login?redirect=${encodeURIComponent(
        referringPage
      )}`;
      return;
    } else {
      setSpinner(true); // Show spinner

      // Use setTimeout to simulate an async operation

      try {
        // Save address or perform any pre-checkout operations
        // await saveAddress(formData); // Call your backend API or service to save the address

        const response = await axios.post("/api/create-oreder", formData);
        const paymentRequest = response.data.order;
        setOrderData(response.data.order);

        setTimeout(() => {
          setIsModalOpen(true); // Open the modal
          setSpinner(false); // Hide spinner after 3 seconds
        }, 3000);
        clearCart();
        clearOrderData();

        // Redirect to Instamojo payment page
      } catch (error) {
        setPaymentStatus("Payment request failed. Please try again.");
        // console.error("Error creating payment request:", error);
        setSpinner(false);
        notify2();
      }
      // Show the modal
    }
  };

  // const handleCheckoutCOD = async (e) => {
  //     setSpinner(true); // Show spinner

  //     // Use setTimeout to simulate an async operation
  //     setTimeout(() => {
  //         setIsModalOpen(true); // Open the modal
  //         setSpinner(false); // Hide spinner after 3 seconds
  //     }, 3000);
  // };

  // //console.log("delevry ressponce is ",orderData);

  // Modal Component
  const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

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

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[40%] max-sm:w-[90%] relative">
          {/* <h2 className="text-xl font-semibold mb-4">Confirm Order</h2> */}
          <img
            src="/assets/video/congrats2.gif"
            alt="congrats-gif"
            className="absolute top-0 left-0 rounded-lg"
          />
          <div className="container-sm ">
            <div className="flex flex-col justify-center items-center pt-20 lg:pt-32 md:pt-16 max-sm:pt-16">
              {/* <span className="text-white bg_green rounded-full p-2 mb-2">
                {" "}
                <Check size={24} />{" "}
              </span> */}
              <div className="uppercase text-2xl">Congratulations!</div>
              <div className="uppercase text-md mt-4">
                your order has been placed successfully
              </div>
              <div className="uppercase text-md">
                YOur Order ID:{" "}
                <span className="green_font">{orderData.order_id}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <a
              href="/user-history"
              className="mr-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              // onClick={onClose}
            >
              VIEW
            </a>
            <button
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              onClick={onClose} // Replace with COD logic if needed
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };
  //   console.log(total);
  //   console.log(finalPrice);

  // const [couponDiscounts,setDiscountCoupons]=useState([])
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchCoupons = async () => {
  //     try {
  //       setLoading(true); // Start loading
  //       const response = await axios.get('/api/coupons');
  //       setDiscountCoupons(response.data); // Set coupons to state
  //       setError(null); // Reset any previous errors
  //     } catch (err) {
  //       setError('Failed to fetch coupons'); // Handle error
  //     } finally {
  //       setLoading(false); // End loading
  //     }
  //   };

  //   fetchCoupons();

  //   // Cleanup function to avoid setting state after the component is unmounted

  // }, []);

  // console.log("Cart", cart);

  return (
    <div>
      <ToastContainer />
      <div className="cart_page">
        {/* <div className="container"> */}
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-12">
              <div className=" border-b mb-3 pb-1">
                <h2 className="text-2xl font-semibold text-black">
                  Shopping Cart
                </h2>
                <div className="lg:block hidden mt-3">
                  <div className="flex justify-between items-center text-gray-500">
                    <div>Items</div>
                    <div>Price</div>
                  </div>
                </div>
                <div className="lg:hidden block mt-3">
                  <div className="flex justify-between items-center text-gray-500">
                    Items & Price
                  </div>
                </div>
              </div>

              {/* {cart?.map((product) => (
                <CartItem key={product._id} product={product} />
              ))} */}

              {Array.isArray(cart) && cart.length > 0 ? (
                cart.map((product) => (
                  <CartItem key={product._id} product={product} />
                ))
              ) : (
                <div className="border-b pb-3 mb-3">
                  <p className="text-center text-red-500">Your cart is empty. Start adding products!</p>
                </div>
              )}

              {/* <form action="#">
                <div
                  className="table-content cart-table-content"
                  id="table-container"
                >
                  <li className="flex justify-between items-center gap-4 mb-2 shadow-md p-4 w-full overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-16 py-3">
                            Image
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Product
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Qty
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart?.map((product) => (
                          <CartItem key={product._id} product={product} />
                        ))}
                      </tbody>
                    </table>
                  </li>
                </div>
                
              </form> */}

              <div className="row">
                <div className="col-lg-12">
                  <div className="cart_btns flex justify-between max-sm:flex-col text-center">
                    <a className="mb-2" href="/all-products">
                      Continue Shopping
                    </a>
                    <button
                      type="button"
                      className="mb-2 disabled"
                      onClick={handleRazorpayPayment}
                    >
                      Pay Online
                    </button>
                    <button
                      type="button"
                      className="mb-2"
                      onClick={handleCheckoutCOD}
                    >
                      {spinner ? (
                        <>
                          <div className="flex justify-between items-center gap-2">
                            Cash on Delivery <div className="spinner"></div>
                          </div>
                        </>
                      ) : (
                        "Cash on Delivery"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="cart_page_right p-3">
                <h3 className="">Summary</h3>
                <h3 className="text-xl font-semibold text-black mt-2 mb-3">
                  Estimate Shipping
                </h3>

                <small className="light_black_font">
                  Enter your destination to get a shipping estimate
                </small>

                {/* <form>
                                    <div>
                                        <label htmlFor="country" className='text-sm font-semibold mt-4'>Country<span className='asterik'>*</span></label>
                                        <select name="ec_cart_country" id="ec-cart-select-country" className="ec-cart-select" defaultValue={session?.user.country}>
                                            <option value="">Select a country</option>
                                            <option value={session?.user.country}>
                                                INDIA
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="state" className='text-sm font-semibold mt-4'>State/Province</label>
                                        <select name="ec_cart_state" id="ec-cart-select-state" className="ec-cart-select" defaultValue={1}>
                                            <option value={session?.user.region}>{session?.user.region}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="postcode" className='text-sm font-semibold mt-4'>Zip/Postal Code</label>
                                        <input type="text" name="postalcode" placeholder="Zip/Postal Code" defaultValue={session?.user.postalCode} />
                                    </div>

                                    <div>
                                        <div className="flex justify-between align-middle">
                                            <label htmlFor="coupon" className='text-sm font-semibold mt-4'>Have a Coupon Code?</label>
                                            <input
                                                type="checkbox"
                                                id="coupon-checkbox"
                                                onChange={handleCouponCheckboxChange}
                                                checked={showCouponInput}
                                            />
                                        </div>
                                        {showCouponInput && (
                                            <>

                                                <input
                                                    type="text"
                                                    id="coupon"
                                                    placeholder="eg. GIFT100"
                                                />
                                                <button type="button" className='bg-green-700 text-white p-2 rounded-lg'>Apply</button>
                                            </>
                                        )}
                                    </div>

                                    <div className='total_amount py-3 mt-5'>
                                        <div className='text-sm font-semibold'>Total Amount</div>
                                        <div className="font-semibold">₹{total}</div>
                                    </div>
                                </form> */}

                <form>
                  <div>
                    <label
                      htmlFor="country"
                      className="text-sm font-semibold mt-4"
                    >
                      Country<span className="asterik">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="country"
                      placeholder="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                    {/* <select
                                            name="country"
                                            id="ec-cart-select-country"
                                            className="ec-cart-select"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select a country</option>
                                            <option value={session?.user.country}>INDIA</option>
                                        </select> */}
                  </div>
                  <div>
                    <label
                      htmlFor="region"
                      className="text-sm font-semibold mt-4"
                    >
                      State/Province<span className="asterik">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="region"
                      placeholder="region"
                      value={formData.region}
                      onChange={handleInputChange}
                    />
                    {/* <select
                                            name="region"
                                            id="ec-cart-select-state"
                                            className="ec-cart-select"
                                            value={formData.region}
                                            onChange={handleInputChange}
                                        >
                                            <option value={session?.user.region}>{session?.user.region}</option>
                                        </select> */}
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="text-sm font-semibold mt-4"
                    >
                      Address Line<span className="asterik">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="address"
                      placeholder="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="text-sm font-semibold mt-4"
                    >
                      Zip/Postal Code<span className="asterik">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="postalCode"
                      placeholder="Zip/Postal Code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between align-middle">
                      <label
                        htmlFor="coupon"
                        className="text-sm font-semibold mt-4"
                      >
                        Have a Coupon Code?
                      </label>
                      <input
                        type="checkbox"
                        id="coupon-checkbox"
                        onChange={handleCouponCheckboxChange}
                        checked={showCouponInput}
                      />
                    </div>
                    {showCouponInput && (
                      <>
                        <input
                          type="text"
                          id="coupon"
                          placeholder="eg. GIFT100"
                          value={couponCode}
                          onChange={handleCouponCodeChange}
                        />
                        <button
                          type="button"
                          className="bg_green text-white py-2 mt-2 text-xs px-6"
                          onClick={handleApplyCoupon}
                        >
                          Apply
                        </button>
                      </>
                    )}
                    {discountApplied && (
                      <button
                        type="button"
                        className="text-red-500 mt-2 text-xs ml-4"
                        onClick={handleRemoveCoupon}
                      >
                        Remove Coupon
                      </button>
                    )}
                  </div>

                  <div className="total_amount py-3 mt-5">
                    <div className="text-sm font-semibold">Total Amount</div>
                    <div className="font-semibold">₹{finalPrice}</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Cart;
