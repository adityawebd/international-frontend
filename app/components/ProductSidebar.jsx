import React from 'react'
import { Flower, BrickWall, Scan, Lightbulb } from 'lucide-react'
import Image from 'next/image'

const ProductSidebar = () => {
    return (
        <aside className="flex h-screen w-64 flex-col overflow-y-auto bg-newblue px-5 ">
            <div className="flex flex-1 flex-col justify-between">

                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-3 ">
                        <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                            href="/religious-idol"
                        >
                            <Scan className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Religious Idol</span>
                        </a>
                        <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/decorative-item"
                        >
                            <Scan className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Decorative Item</span>
                        </a>
                        <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/dry-fruits"
                        >
                            <Scan className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Dry Fruit Bowl</span>
                        </a>
                        <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/car-idol"
                        >
                            <Scan className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Car Idol</span>
                        </a>
                        <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/diya-items"
                        >
                            <Lightbulb className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Diya Item</span>
                        </a>
                        <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/photo-frame"
                        >
                            <Scan className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Photo Frame</span>
                        </a>
                        <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/wall-decor"
                        >
                            <BrickWall className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Wall Decor</span>
                        </a>
                        <a
                            className="flex transform items-center rounded-lg pl-4 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/german-silver-item"
                        >
                            <Scan className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">German Silver Item</span>
                        </a>
                        <a
                            className="flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            href="/flowers"
                        >
                            <Flower className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Flower</span>
                        </a>
                    </div>
                </nav>
            </div>
        </aside>
    )
}
export default ProductSidebar
