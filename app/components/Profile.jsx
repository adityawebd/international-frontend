import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import BackToTopButton from "../components/BackToTopButton";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    if (session?.user) {
      setProfile({
        firstName: session.user.fname,
        email: session.user.email,
        phoneNumber: session.user.number,
        address: session.user.address,
        shippingAddress: session.user.address,
        lastName: session.user.lname,
      });
    }
  }, [session]);

  const notify = () =>
    toast.success("Profile Updated Successfully ", {
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

  console.log("user email", session?.user.email);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        setIsEditing(false);
        notify();

        //console.log('Profile updated successfully');
        // Handle successful response if needed
      } else {
        const errorData = await response.json();
        console.error("Failed to update profile:", errorData);
        // Handle error response if needed
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div>
      <ToastContainer />

      <div className="user_profile px-5">
        <div className="banner">
          <img
            loading="lazy"
            src="/assets/image/banner-profile.jpg"
            alt="Profile Banner"
            className="rounded"
          />
          {/* <div className="user_img">
            <img
              loading="lazy"
              src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
              alt=""
            />
          </div> */}
          <div className="user_img">
            {isEditing ? (
              <>
                <img
                  loading="lazy"
                  src={
                    profile.image ||
                    "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                  }
                  alt="Profile"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      image: URL.createObjectURL(e.target.files[0]),
                      imageFile: e.target.files[0], // Store the file for backend upload
                    })
                  }
                />
              </>
            ) : (
              <img
                loading="lazy"
                src={
                  profile.image ||
                  "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                }
                alt="Profile"
              />
            )}
          </div>
          {/* <h2 className="name text-center text-xl font-semibold light_black_font mt-2">
            {profile.firstName}&nbsp;{profile.lastName}
          </h2> */}
          <h2 className="name text-center text-xl font-semibold light_black_font mt-2">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="mr-2"
                />
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </>
            ) : (
              <>
                {profile.firstName}&nbsp;{profile.lastName}
              </>
            )}
          </h2>
        </div>
        <p>
          Hello{" "}
          <span className="text-lg font-medium ">
            {profile.firstName}&nbsp;{profile.lastName}
          </span>
        </p>
        <p className="pr-5 pb-4 mb-4 light_black_font border-b">
          From your account you can easily view and track orders. You can manage
          and change your account information like address, contact information
          and history of orders.
        </p>

        <h2 className="text-xl font-semibold light_black_font pb-3">
          ACCOUNT INFORMATION
        </h2>
        <div className="profile-info">
          <div className="profile-item">
            <label>Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            ) : (
              <span>{profile.email}</span>
            )}
          </div>
          <div className="profile-item">
            <label>Number:</label>
            {isEditing ? (
              <input
                type="text"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
              />
            ) : (
              <span>{profile.phoneNumber}</span>
            )}
          </div>
          <div className="profile-item">
            <label>Address:</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
              />
            ) : (
              <span>{profile.address}</span>
            )}
          </div>
          <div className="profile-item">
            <label>Shipping Address:</label>
            {isEditing ? (
              <input
                type="text"
                name="shippingAddress"
                value={profile.shippingAddress}
                onChange={handleChange}
              />
            ) : (
              <span>{profile.shippingAddress}</span>
            )}
          </div>
          <div className="profile-actions pl-2">
            {isEditing ? (
              <button className="save_btn" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button className="edit_btn" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
      <BackToTopButton />
    </div>
  );
};

export default Profile;
