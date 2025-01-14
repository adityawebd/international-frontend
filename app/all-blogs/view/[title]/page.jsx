'use client';
import React, { useState, useEffect, Suspense, lazy, memo } from "react";
import { CircleUserRound, User, Clock, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import Image from "next/image";
import axios from 'axios';
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css"
import "react-quill/dist/quill.bubble.css"

// Importing components normally
import Navbar from '../../../components/Navbar';

// Lazy load the Footer component
const Footer = lazy(() => import('../../../components/Footer'));

// Memoizing the non-lazy components
const MemoizedNavbar = memo(Navbar);

export default function Page({ params }) {
    const [blogInfo, setBlogInfo] = useState([]);

    const url = decodeURIComponent(params.title);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/blogdata?url=' + url);
            setBlogInfo(response.data);
        };

        fetchData();
    }, [url]);

    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    function generateShareUrl(platform) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Check out this blog: ${blogInfo?.title}`);

        switch (platform) {
            case 'facebook':
                return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            case 'twitter':
                return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            case 'linkedin':
                return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
            case 'whatsapp':
                return `https://api.whatsapp.com/send?text=${text} ${url}`;
            default:
                return '#';
        }
    }

    function copyLinkToClipboard() {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    }

    return (
        <>
            <head>
                <title>{blogInfo?.metatitle}</title>
                <meta name="description" content={blogInfo?.metadesc} />
                <meta property="og:title" content={blogInfo?.metatitle} key="title" />
                <meta property="og:description" content={blogInfo?.metadesc} />
                <meta property="og:image" content={blogInfo?.cardImage} />
                <meta property="og:image:secure_url" content={blogInfo?.cardImage}  />
                <meta name="author" content={blogInfo?.author ? blogInfo?.author : "innovationschool"} />
                <meta name="keywords" content={blogInfo?.keywords} />
                <meta property="og:url" content={`http://innovationschool.io/all-blogs/view/${blogInfo?.url}`} />
                <link rel="canonical" href={`http://innovationschool.io/all-blogs/view/${blogInfo?.url}`} />
            </head>
            <MemoizedNavbar />

            <div className="container lg:px-32 py-5">
                <div className="flex-row justify-center">
                    <div className="container mx-auto">
                        <h1 className="text-3xl font-bold mb-3 text-center">{blogInfo?.title}</h1>
                        <div className="flex justify-center items-center">
                            <p className="text-sm text-textClr flex items-center"><User size={16} /> &nbsp; Published by  {blogInfo?.author ? blogInfo?.author : "Admin"}</p>
                            <span className="px-2 text-textClr">|</span>
                            <p className="text-sm text-textClr flex items-center"><Clock size={16} /> &nbsp;{formatDate(blogInfo?.date)}</p>
                        </div>

                        <div className="flex justify-center w-full p-3">
                            <img src={blogInfo?.cardImage} loading="lazy" alt="Card image" className="mt-5 rounded w-[100%] border" />
                        </div>

                        <div
                            className="text-lg blog_content"
                            style={{ all: "initial" }}
                            dangerouslySetInnerHTML={{ __html: blogInfo?.content }}
                        />

                        {/* Social Media Sharing Section */}
                        <div className="mt-6">
                            <h2 className="text-xl font-bold text-center">Share this blog:</h2>
                            <div className="flex justify-center gap-4 mt-4">
                                <a href={generateShareUrl('facebook')} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800"><Facebook size={24} /></a>
                                <a href={generateShareUrl('twitter')} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600"><Twitter size={24} /></a>
                                <a href={generateShareUrl('linkedin')} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900"><Linkedin size={24} /></a>
                                <button onClick={copyLinkToClipboard} className="text-gray-600 hover:text-gray-800"><Copy size={24} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <Footer />
            </Suspense>
        </>
    );
}
