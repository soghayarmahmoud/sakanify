"use client";

import React from 'react';
import { notFound } from 'next/navigation';
// Import the slider components and its CSS
import 'react-slideshow-image/dist/styles.css';
import ImageSlider from '@/app/components/ImageSlider';
    const apartments = [
        // ... (your existing apartments array)
        {
            id: 1,
            title: "الحي الأول",
            description: "شقة 3 أوض وصالة ومطبخ وحمام",
            images:[
            "/images/1.jpg",
            "/images/1-1.jpg", // Add more images here
            "/images/1-2.jpg",
            "/images/1-3.jpg",
            "/images/1-4.jpg",
            "/images/1-5.jpg",
        
            ],

        
            deletedPrice: "15,000",
            price: "10,000",
            tags: ['best', 'all']
        },
        {
            id: 2,
            title: "الحي الأول",
            description: "شقة 3 أوض وصالة ومطبخ وحمام",
            images:[
            "/images/1.jpg",
            "/images/1-1.jpg", // Add more images here
            "/images/1-2.jpg",
            "/images/1-3.jpg",
            "/images/1-4.jpg",
            "/images/1-5.jpg",
        
            ],

            deletedPrice: "12,000",
            price: "9,000",
            tags: ['new', 'all']

        },
        {
            id: 3,
            title: "الحي الأول",
            description: "شقة 3 أوض وصالة ومطبخ وحمام",
            images:[
            "/images/1.jpg",
            "/images/1-1.jpg", // Add more images here
            "/images/1-2.jpg",
            "/images/1-3.jpg",
            "/images/1-4.jpg",
            "/images/1-5.jpg",
        
            ],

            deletedPrice: "18,000",
            price: "12,000",
            tags: ['best', 'all']


        },
        {
            id: 4,
            title: "الحي الأول",
            description: "شقة 3 أوض وصالة ومطبخ وحمام",
            images:[
            "/images/1.jpg",
            "/images/1-1.jpg", // Add more images here
            "/images/1-2.jpg",
            "/images/1-3.jpg",
            "/images/1-4.jpg",
            "/images/1-5.jpg",
        
            ],

            deletedPrice: "20,000",
            price: "15,000",
            tags: ['new', 'all']
        },
        {
            id: 5,
            title: "الحي الأول",
            description: "شقة 3 أوض وصالة ومطبخ وحمام",
            images:[
            "/images/1.jpg",
            "/images/1-1.jpg", // Add more images here
            "/images/1-2.jpg",
            "/images/1-3.jpg",
            "/images/1-4.jpg",
            "/images/1-5.jpg",
        
            ],
        
   
        
            deletedPrice: "15,000",
            price: "10,000",
            tags: ['best', 'all']
        },



        {
            id: 6,
            title: "الحي الأول",
            description: "شقة 3 أوض وصالة ومطبخ وحمام",
            images:[
            "/images/1.jpg",
            "/images/1-1.jpg", // Add more images here
            "/images/1-2.jpg",
            "/images/1-3.jpg",
            "/images/1-4.jpg",
            "/images/1-5.jpg",
        
            ],


            deletedPrice: "15,000",
            price: "10,000",
            tags: ['new', 'all']
        },
    ];



const ApartmentDetailPage = ({ params }) => {
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;
    
    // The rest of your code remains the same
    const apartmentId = parseInt(id, 10);
    const apartment = apartments.find(apt => apt.id === apartmentId);

    if (!apartment) {
        return <div>Apartment not found</div>;
    }
    const slidesData = apartment.images.map((imageUrl, index) => ({
        url: imageUrl,
        title: `صورة الشقة ${index + 1}`, // Add a title for accessibility
    }));
 

    return (
        <main className="p-8 h-full" dir="rtl">
            <div className="grid lg:grid-cols-12 gap-3 md:grid-cols-1 h-full sm:grid-cols-1 justify-between items-center bg-white rounded-lg shadow-xl ">
                <div className="relative h-96 col-span-6 sm:grid-span-1 md:grid-span-1 ">

                    <ImageSlider slides={slidesData} ></ImageSlider>



                </div>

                <div className="p-6 col-span-6 sm:grid-span-1 md:grid-span-1">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{apartment.title}</h1>
                    <p className="text-2xl text-gray-600 mb-6">{apartment.description}</p>
                    <div className="flex items-baseline mb-6">
                        <p className="text-4xl text-green-600 font-bold ml-4">{apartment.price} EGP</p>
                        <del className="text-2xl text-gray-400">{apartment.deletedPrice} EGP</del>
                    </div>
                    <div className="prose lg:prose-xl">
                        <h2 className="text-2xl font-bold text-gray-700 mt-8 mb-2">تفاصيل إضافية</h2>
                        <p className="text-xl text-gray-500">{apartment.details}</p>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default ApartmentDetailPage;