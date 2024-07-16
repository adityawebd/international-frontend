'use client'
import React, { useState, useEffect } from 'react';

const UserHistory = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch or set your product data here
    const fetchProducts = async () => {
      // Simulate fetching data from the backend
      // Replace this with your actual API call
      const productData = [
        {
          id: 1,
          name: 'Diamond Statue',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, doloribus?',
          price: '₹660',
          image: 'assets/image/gift15.jpg',
          date: "16 July 2024",
          stockStatus: 'In Stock',
          view_btn_link: "",
        },
        {
          id: 2,
          name: 'Gold Buddha',
          description: 'Elegant and beautiful gold necklace. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, doloribus?',
          price: '₹1,250',
          image: 'assets/image/gift16.jpg',
          date: "13 August 2024",
          stockStatus: 'Out of Stock',
          view_btn_link: ""
        },
      ];

      setProducts(productData);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="user_history px-5">
        <h2 className='text-xl font-bold light_black_font pb-4'>USER PRODUCT HISTORY</h2>

        <div className="table_wrapper">
          <table>
            <thead>
              <tr>
                <th className='id'>ID</th>
                <th className='img'>Image</th>
                <th className='name'>Name</th>
                <th className='date'>Date</th>
                <th className='price'>Price</th>
                <th className='status'>Status</th>
                <th className='action'>Actions</th>
              </tr>
            </thead>
              {products.length > 0 ? (
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className='pl-2'>{product.id}</td>
                      <td className='product_img'>
                        <img src={product.image} alt={product.name} />
                      </td>
                      <td className='pl-2'><p className='text-lg green_font'>{product.name}</p>{product.description}</td>
                      <td className='pl-2'>{product.date}</td>
                      <td className='pl-2'>{product.price}</td>
                      <td className='pl-2'>{product.stockStatus}</td>
                      <td className='pl-2'>
                        <a href="" className='view_btn text-sm'>VIEW</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center p-3">No products in wishlist</td>
                  </tr>
                </tbody>
              )}
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserHistory
