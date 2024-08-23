import React from 'react';
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';
import Footer from '../components/Footer';

const Page = () => {
    const orderData = [
        {
            channel_order_id: "2408221754591270",
            courier_company_id: "",
            courier_name: "",
            new_channel: false,
            onboarding_completed_now: 0,
            order_id: 620121674,
            packaging_box_error: "",
            shipment_id: 617875782,
            status: "NEW",
            status_code: 1,
        }
    ];

    return (
        <div>
            <Navbar />
            <Breadcrumbs page_title="About Us" />

            <div className="container-sm py-5">
                <div className="flex flex-col justify-center items-center py-5 lg:px-32">
                    <div className="text-lg md:text-xl lg:text-2xl font-bold">Thank You for Ordering:</div>
                    
                    {/* Table to display order details */}
                    <div className="w-full overflow-x-auto mt-4">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-2 md:px-6 py-2 md:py-3 border-b text-left text-xs md:text-sm font-medium text-gray-700">Order ID</th>
                                    <th className="px-2 md:px-6 py-2 md:py-3 border-b text-left text-xs md:text-sm font-medium text-gray-700">Channel Order ID</th>
                                    <th className="px-2 md:px-6 py-2 md:py-3 border-b text-left text-xs md:text-sm font-medium text-gray-700">Shipment ID</th>
                                    <th className="px-2 md:px-6 py-2 md:py-3 border-b text-left text-xs md:text-sm font-medium text-gray-700">Courier Name</th>
                                    <th className="px-2 md:px-6 py-2 md:py-3 border-b text-left text-xs md:text-sm font-medium text-gray-700">Status</th>
                                    <th className="px-2 md:px-6 py-2 md:py-3 border-b text-left text-xs md:text-sm font-medium text-gray-700">Status Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.map((order, index) => (
                                    <tr key={index}>
                                        <td className="px-2 md:px-6 py-2 md:py-4 border-b text-xs md:text-sm text-gray-700">{order.order_id}</td>
                                        <td className="px-2 md:px-6 py-2 md:py-4 border-b text-xs md:text-sm text-gray-700">{order.channel_order_id}</td>
                                        <td className="px-2 md:px-6 py-2 md:py-4 border-b text-xs md:text-sm text-gray-700">{order.shipment_id}</td>
                                        <td className="px-2 md:px-6 py-2 md:py-4 border-b text-xs md:text-sm text-gray-700">{order.courier_name || 'N/A'}</td>
                                        <td className="px-2 md:px-6 py-2 md:py-4 border-b text-xs md:text-sm text-gray-700">{order.status}</td>
                                        <td className="px-2 md:px-6 py-2 md:py-4 border-b text-xs md:text-sm text-gray-700">{order.status_code || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Page;
