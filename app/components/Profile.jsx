import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Aditya Raj',
    email: 'aditya@example.com',
    number: '1234567890',
    address: '123 Main St',
    shippingAddress: '456 Secondary St'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div>
      <div className="user_profile pl-5">
        <div className="banner">
          <img src="/assets/image/banner-profile.jpg" alt="Profile Banner" />
          <div className="user_img">
            <img src="/assets/avatar-2.jpg" alt="" />
          </div>
          <h2 className="name text-center text-xl font-semibold light_black_font mt-2">{profile.name}</h2>
        </div>
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
                name="number"
                value={profile.number}
                onChange={handleChange}
              />
            ) : (
              <span>{profile.number}</span>
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
          <div className="profile-actions">
            {isEditing ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
