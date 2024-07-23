'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react"


const UserHistory = () => {

  const { data: session } = useSession();

  const [orders, setProducts] = useState([]);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/order?email=${session.user.email}`);
          setProducts(response.data); // Assuming response structure { message: '...', user: {...} }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [session]);

  return (
    <div>
      <div className="user_history px-5">
        <h2 className='text-xl font-bold light_black_font pb-4'>USER PRODUCT HISTORY</h2>

        <div className="table_wrapper">
          <table>
            <thead>
            <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-2">Date</th>
        <th className="border border-gray-300 px-4 py-2">Image</th>
        <th className="border border-gray-300 px-4 py-2">Paid</th>
        <th className="border border-gray-300 px-4 py-2">Status</th>
        <th className="border border-gray-300 px-4 py-2">Recipient</th>
        <th className="border border-gray-300 px-4 py-2">Products</th>
        <th className="border border-gray-300 px-4 py-2">Quantity</th>
        

      </tr>
            </thead>
            {orders.length > 0 ? (
              <tbody>
              {orders.length > 0 && orders.map(order => (
              <tr key={order._id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{(new Date(order.createdAt)).toLocaleString()}</td>
                <td>{order.images}</td>
                <td className={`border border-gray-300 px-4 py-2 ${order.paid ? 'text-green-600' : 'text-red-600'}`}>
                  {order.paid ? 'YES' : 'NO'}
                </td>
                <td ></td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="text-sm"><span className="font-bold">Name : </span>{order.name}</div>
                  <div className="text-xs"><span className="font-bold">Email : </span>{order.email}</div>
                  <div className="text-xs"><span className="font-bold">Sreet Address : </span>{order.streetAddress}</div>
                  <div className="text-xs"><span className="font-bold">City : </span>{order.city}</div>
                  <div className="text-xs"><span className="font-bold">postalcode : </span> {order.postalCode}</div> 
                  <div className="text-xs"><span className="font-bold">Country : </span>{order.country}</div>
                  
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.line_items.map((l, index) => (
                    <div key={index} className="text-sm">
                      {l.price_data?.product_data.name}
                    </div>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.line_items.map((l, index) => (
                    <div key={index} className="text-sm">
                      {l.quantity}
                    </div>
                  ))}
                </td>
        
                
              </tr>
              ))}
            </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center p-3">No products in wishlist</td>
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
