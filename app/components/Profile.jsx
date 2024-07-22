import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"



const Profile = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: session.user.fname,
    email: session.user.email,
    phoneNumber: session.user.number,
    address: session.user.address,
    shippingAddress: session.user.address,
    lastName: session.user.lname
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  
  const handleSave = async () => {
    try {
      const response = await fetch('/api/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });
  
      if (response.ok) {
        setIsEditing(false);
        console.log('Profile updated successfully');
        // Handle successful response if needed
      } else {
        const errorData = await response.json();
        console.error('Failed to update profile:', errorData);
        // Handle error response if needed
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div>
      <div className="user_profile px-5">
        <div className="banner">
          <img src="/assets/image/banner-profile.jpg" alt="Profile Banner" />
          <div className="user_img">
            <img src="/assets/avatar-2.jpg" alt="" />
          </div>
          <h2 className="name text-center text-xl font-semibold light_black_font mt-2">{profile.firstName}</h2>
        </div>
        <p>Hello <span className='text-lg font-medium '>{profile.firstName}&nbsp; {profile.lastName}</span></p>
        <p className='pr-5 pb-4 mb-4 light_black_font border-b'>From your account you can easily view and track orders. You can manage and change your account information like address, contact information and history of orders.</p>


        <h2 className='text-xl font-semibold light_black_font pb-3'>ACCOUNT INFORMATION</h2>
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
              <button className='save_btn' onClick={handleSave}>Save</button>
            ) : (
              <button className='edit_btn' onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
