import React from 'react'
import { CircleUserRound, History,Heart, ShoppingBasket,ShoppingCart, PackageOpen,LogOut } from 'lucide-react'
import Image from 'next/image'
import { signOut } from "next-auth/react";
import { useCartStore } from '../../stores/useCartStore';
import useFromStore from '../../hooks/useFromStore';


const Sidebar = () => {
    const cart = useFromStore(useCartStore, (state) => state.cart);
    
    async function logout() {
        
        await signOut();
        window.location.href = '/';
      }
    return (
        <aside className="flex  w-64 flex-col overflow-y-auto bg-newblue px-5 ">
            <div className="flex flex-1 flex-col justify-between">

                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-3 ">
                        <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                            href="/profile"
                        >
                            <CircleUserRound  className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">User Profile</span>
                        </a>
                        <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/user-history"
                        >
                            <History />
                            <span className="mx-2 text-sm font-medium">History</span>
                        </a>
                        {/* <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/wishlist"
                        >
                            <Heart />
                            <span className="mx-2 text-sm font-medium">Wishlist</span>
                        </a> */}
                        <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/cart"
                        >
                            <ShoppingBasket />
                            <span className="mx-2 text-sm font-medium">Cart <span className='text-white bg-blue-950 rounded-full p-1 text-xs'>{cart?.length}</span> </span>
                        </a>
                        {/* <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/checkout"
                        >
                            <ShoppingCart />
                            <span className="mx-2 text-sm font-medium">Checkout</span>
                        </a> */}
                        <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/track-order"
                        >
                            <PackageOpen />
                            <span className="mx-2 text-sm font-medium">Track Order</span>
                        </a>

                        <button
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            onClick={logout}
                            
                        >
                            <LogOut />
                            <span className="mx-2 text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </nav>
            </div>
        </aside>
    )
}
export default Sidebar
