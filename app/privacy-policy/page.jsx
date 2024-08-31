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
      <Breadcrumbs page_title="Privacy Policy" />

      <div className="about_page py-5">
        <div className="container-sm">
          <div className="row">
            <div className="">
              <h2 className='text-3xl font-semibold text-black mb-4'>Privacy Policy</h2>

              <ul className='list-item'>
                <li>
                  <span className='font-bold'>1. Introduction</span>
                  <p className='my-2'>Welcome to International Gifts. We are committed to protecting your privacy and handling your
                    personal information responsibly. This Privacy Policy explains how we collect, use, and
                    safeguard your data when you visit our website [https://internationalgift.in] and use our services.
                  </p>
                </li>
                <li className='mt-2'>
                  <span className='font-bold'>2. Information We Collect</span>
                  <p className='my-2'>When you make a purchase, register for an account, or contact us, we may collect personal
                    information including:
                  </p>
                  <ul className='list-disc ml-5'>
                    <li>Name</li>
                    <li>Email Address
                    </li>
                    <li>Phone Number
                    </li>
                    <li>Shipping Address</li>
                    <li>Billing Address</li>
                    <li>Payment Information (such as credit/debit card details)
                    </li>
                  </ul>
                </li>
                <li className='mt-2'>
                  <span className='font-bold'>3. How We Use Your Information
                  </span>
                  <p className='my-2'>We use your information for various purposes, including:
                  </p>
                  <ul className='list-disc ml-5'>
                    <li>Processing Orders: To fulfill and manage your orders and provide customer support</li>
                    <li>Communication: To send you order confirmations, and updates, and respond to your
                      inquiries.
                    </li>
                    <li>Improvement: To analyze and enhance our Website and services based on your usage
                      and feedback
                    </li>
                    <li>Personalization: To tailor your experience and recommend products that match your
                      interests.
                    </li>
                    <li>Marketing: To send promotional emails and offers if you have opted in. You can
                      unsubscribe at any time.</li>
                  </ul>
                </li>

                <li className='mt-2'>
                  <span className='font-bold'>4. How We Share Your Information
                  </span>
                  <p className='my-2'>We may share your information in the following situations:
                  </p>
                  <ul className='list-disc ml-5'>
                    <li>Service Providers: We use third-party service providers to assist with payment
                      processing, shipping, and marketing. These parties are obligated to protect your
                      information and use it only for the purposes for which it was disclosed.
                    </li>
                    <li>Legal Requirements: We may disclose your information to comply with legal
                      obligations, enforce our policies, or protect our rights or the safety of others.

                    </li>
                    <li>Business Transfers: In the event of a merger, acquisition, or sale of assets, your
                      information may be transferred to the new entity.
                    </li>
                  </ul>
                </li>

                <li className='mt-2'>
                  <span className='font-bold'>5. Data Security
                  </span>
                  <p className='my-2'>We implement appropriate security measures to protect your personal information from
                    unauthorized access, use, or disclosure. However, no online transmission or storage method is
                    completely secure. While we strive to protect your data, we cannot guarantee absolute security.
                  </p>
                </li>
                <li className='mt-2'>
                  <span className='font-bold'>6. Cookies and Tracking Technologies
                  </span>
                  <p className='my-2'>Our Website uses cookies and similar technologies to enhance your experience, remember your
                    preferences, and analyze site usage. You can manage your cookie preferences through your
                    browser settings. Please note that disabling cookies may affect the functionality of certain
                    features on our Website
                  </p>
                </li>
                <li className='mt-2'>
                  <span className='font-bold'>7. Your Rights
                  </span>
                  <p className='my-2'>You have the following rights regarding your personal information:
                  </p>
                  <ul className='list-disc ml-5'>
                    <li>Access: Request access to the personal data we hold about you
                    </li>
                    <li>Correction: Request correction of any inaccurate or incomplete information

                    </li>
                    <li>Deletion: Request deletion of your personal data, subject to certain exceptions.                    </li>
                    <li>Opt-Out: Opt out of receiving marketing communications by following the unsubscribe
                      instructions in our emails.
                    </li>
                  </ul>
                </li>
                <li className='mt-2'>
                  <span className='font-bold'>8. Third-Party Links

                  </span>
                  <p className='my-2'>Our Website may contain links to other websites. We are not responsible for the privacy
                    practices or content of these third-party sites. We encourage you to review the privacy policies
                    of any sites you visit through links on our Website.

                  </p>
                </li>
                <li className='mt-2'>
                  <span className='font-bold'>9. Changes to This Privacy Policy

                  </span>
                  <p className='my-2'>We may update this Privacy Policy from time to time. Any changes will be posted on this page
                    with an updated effective date. We encourage you to review this policy periodically to stay
                    informed about how we protect your information.
                  </p>
                </li>
                <li className='mt-2'>
                  <span className='font-bold'>10. Contact Us

                  </span>
                  <p className='my-2'>If you have any questions or concerns about this Privacy Policy or our data practices, please
                    contact us:

                  </p>
                  <p>Call: +91 8800217402                  </p>
                  <p>WhatsApp: +91 8800217402                </p>
                  <p>Email: Rakesh@InternationalGift.in             </p>
                  <p>Address: Warehouse 5, Plot No. - 337, Om Vihar Phase - 1, Uttam Nagar, New Delhi - 59, Delhi,
                    West Delhi, 110059.           </p>
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
