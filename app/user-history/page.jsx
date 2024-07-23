'use client'
import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import NewArrival from '../components/NewArrival';
import { useSession, signIn, signOut } from "next-auth/react"
import Sidebar from '../components/Sidebar'
import UserHistory from '../components/UserHistory'

const page = () => {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="bg-bgGray w-screen h-screen flex items-center">
                <div className="text-center w-full">
                    <a href="/login">
                        <button className="bg-white p-2 px-4 rounded-lg">Login First</button>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Breadcrumbs page_title="User Profile" />

            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-12">
                            <Sidebar />
                        </div>
                        <div className="col-lg-10 col-md-10 col-sm-12 border-l">
                            <UserHistory />
                        </div>
                    </div>
                </div>
            </div>



            <NewArrival />
            <Footer />

        </div>
    )
}

export default page
