"use client";
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";


const BackToTopButton = () => {
  return (
    <>
      <Link
        href="https://wa.me/+918076361433"
        target='_blank'
        prefetch={true}
        className="whatsapp_button z-100 fixed bottom-8 right-8 p-2 rounded-full shadow-lg bg-green-500 text-white flex justify-center items-center"
        style={{
          width: "50px",
          height: "50px",
        }}
      >
        <FaWhatsapp size={30} />
      </Link>
    </>
  );
};

export default BackToTopButton;
