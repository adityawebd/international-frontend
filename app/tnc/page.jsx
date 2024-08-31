import React from 'react'
import Navbar from '../components/Navbar'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'
import BackToTopButton from '../components/BackToTopButton'

import { GoDotFill } from "react-icons/go";


const page = () => {
  return (
    <div>
      <Navbar />
      <Breadcrumbs page_title="Terms & Conditions" />

      <div className="about_page py-5">
        <div className="container-sm">
          <div className="row">
            <div className="">
              <h2 className='text-3xl font-semibold text-black mb-4'>Terms & Conditions</h2>

              <ul className='list-item'>
                <li>
                  <span className='font-bold'>1. Introduction</span>
                  <p className='my-2'>Welcome to International Gifts. By accessing and using this website (International Gifts), you
                    acknowledge that you have read, understood, and agree to be bound by the following Terms
                    and Conditions set forth by International Gifts.
                  </p>
                  <p className='mb-2'>These terms govern your use of our site and services. If you do not agree with any part of these
                    Terms and Conditions, we kindly ask that you exit the site immediately and discontinue any
                    further use. Your continued use of the website signifies your acceptance of these terms; please
                    read them carefully.
                  </p>
                </li>
                <li>
                  <span className='font-bold'>2. Orders and Payments</span>
                  <p className='my-2'>Placing Orders: When you place an order, you agree to provide accurate information.
                    We may refuse or cancel orders at our discretion.
                  </p>
                  <p className='mb-2'>Payment: Payment is required at checkout. We accept various payment methods. All
                    payments are processed securely.

                  </p>
                  <p className='mb-2'>
                    Pricing: Prices are subject to change. Taxes may apply based on your location.
                  </p>
                </li>
                <li>
                  <span className='font-bold'>3. Shipping
                  </span>
                  <p className='my-2'>Delivery: We will ship to the address you provide. Shipping costs and delivery times
                    vary.

                  </p>
                  <p className='mb-2'>Issues: We are not responsible for delivery delays once the package is with the carrier.
                    Contact the carrier for delivery problems.

                  </p>
                </li>
                <li>
                  <span className='font-bold'>4. Returns and Refunds</span>
                  <p className='my-2'>Returns: You can return unused, undamaged items within 5 days. Contact us for return
                    instructions
                  </p>
                  <p className='mb-2'>Refunds: Refunds are processed to your original payment method within a day of
                    receiving the returned item. Shipping costs are not refunded.
                  </p>
                </li>

                <li>
                  <span className='font-bold'>5. Intellectual Property</span>
                  <p className='my-2'>Ownership: All content on our website, including text, images, and logos, is owned by
                    International Gifts. You may not use or reproduce this content without permission.
                  </p>
                </li>
                <li>
                  <span className='font-bold'>6. Limitation of Liability</span>
                  <p className='my-2'>Limitation: We are not liable for any indirect or consequential damages. Our liability is
                    limited to the amount paid for the product.

                  </p>
                </li>
                <li>
                  <span className='font-bold'>7. Privacy</span>
                  <p className='my-2'>Privacy Policy: Our use of your personal information is governed by our Privacy Policy.
                    Please review it to understand how we handle your data.
                  </p>
                </li>
                <li>
                  <span className='font-bold'>8. Changes</span>
                  <p className='my-2'>Updates: We may update these Terms and Conditions. Changes will be posted on this
                    page with an updated effective date. Continued use of the site means you accept the
                    changes.
                  </p>
                </li>
                <li>
                  <span className='font-bold'>9. Contact Us</span>
                  <p className='my-2'>If you have any questions, please contact us at:
                  </p>

                  <p>Call: +91 8800217402</p>
                  <p>WhatsApp: +91 8800217402
                  </p>
                  <p>Email: Rakesh@InternationalGift.in
                  </p>
                  <p>
                    Address: Warehouse 5, Plot No. - 337, Om Vihar Phase - 1, Uttam Nagar, New Delhi - 59, Delhi,
                    West Delhi, 110059.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <Footer />
      <BackToTopButton />
    </div>
  )
}

export default page
