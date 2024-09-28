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


  const cancleOrder = async (id) => {
    await axios.post(`/api/cancleorder/`, { id });
    window.location.reload()
  };

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
        <th className="border border-gray-300 px-4 py-2">Products & Quantity</th>
        <th className="border border-gray-300 px-4 py-2">Other Details</th>
        <th className="border border-gray-300 px-4 py-2">Action</th>
        

      </tr>
            </thead>
            {orders.length > 0 ? (
              <tbody>
              {orders.length > 0 && orders.map(order => (
              <tr key={order._id} className="border border-gray-300 ">
                <td className="border border-gray-300 px-4 py-2">{(new Date(order.updatedAt)).toLocaleString()}</td>
                <td>
                {order.cart?.map((item,index)=>(
                   <img height="100px" width="100px" className='rounded-full' src={item.images[0] || item.images} alt='images'/>
                ))}
                </td>
                
                <td className={`border border-gray-300 px-4 py-2 ${order.paid ? 'text-green-600' : 'text-red-600'}`}>
                  {order.paid ? 'YES' : 'NO'}
                </td>
                <td  className="border border-gray-300 px-4 py-2"> {order.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="text-sm"><span className="font-bold">Name : </span>{order.name}</div>
                  <div className="text-xs"><span className="font-bold">Email : </span>{order.email}</div>
                  <div className="text-xs"><span className="font-bold">Sreet Address : </span>{order.streetAddress}</div>
                  <div className="text-xs"><span className="font-bold">City : </span>{order.city}</div>
                  <div className="text-xs"><span className="font-bold">postalcode : </span> {order.postalCode}</div> 
                  <div className="text-xs"><span className="font-bold">Country : </span>{order.country}</div>
                  
                </td>
                <td className="border border-gray-300 px-4 py-2 ">

                <div className='order_desc'>
                {order.cart?.map((item,index)=>(
                  <span className=''>
                  <div>Product is :{item.title} </div>
                  <div>Quantity is :{item.quantity} </div>
                  </span>
                  
                ))}
                </div>
                  

                </td>
                <td className="border border-gray-300 px-4 py-2">
                <div className="text-sm"><span className="font-bold">Channel Order Id : </span>{order.channel_order_id}</div>
                  <div className="text-xs"><span className="font-bold">Order ID : </span>
                  <a className="text-blue-600" href={`https://shiprocket.co/tracking/order/${order.channel_order_id}?company_id=52252`}>{order.order_id}</a></div>

                  <div className="text-xs"><span className="font-bold">Shipment Id : </span>{order.shipment_id}</div>
                  
                </td>
                <td>
                    
                {order.status === "NEW" && (
                        <>
                          <button
                            // onClick={() => generatePDF(order)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                          >
                            Invoice
                          </button>
                          
                          <button
                            onClick={() => cancleOrder(order._id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {/* If the order is "canceled", show disabled buttons */}
                      {order.status === "canceled" && (
                        <>

                          <button
                            disabled
                            className="bg-gray-500 text-white font-bold py-1 px-2 rounded cursor-not-allowed"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {/* If the order is "Delivered", show only the Invoice button */}
                      {order.status === "Delivered" && (
                        <>
                          <button
                            // onClick={() => generatePDF(order)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                          >
                            Invoice
                          </button>
                          
                          
                        </>
                      )}
                 
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
