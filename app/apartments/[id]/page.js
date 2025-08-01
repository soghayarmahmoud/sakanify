import React from 'react';
import Link from 'next/link';
    const apartments = [
        // ... (your existing apartments array)
        {
            id: 1,
            title: "الحي الأول",
            description: "شقة 3 أوض وصالة ومطبخ وحمام",
            imageUrl: "/images/1.jpg",
            deletedPrice: "15,000",
            price: "10,000",
            tags: ['best', 'all']
        },
        {
            id: 2,
            title: "الحي الأول",
            description: "شقة 3 أوض وصالة ومطبخ وحمام",
            imageUrl: "/images/2.jpg",
            deletedPrice: "12,000",
            price: "9,000",
            tags: ['new', 'all']

        },
        {
            id: 3,
            title: "الحي الأول",
            description: "شقة 3 أوض وصالة ومطبخ وحمام",
            imageUrl: "/images/1.jpg",
            deletedPrice: "18,000",
            price: "12,000",
            tags: ['best', 'all']


        },
        {
            id: 4,
            title: "الحي الأول",
            description: "شقة 3 أوض وصالة ومطبخ وحمام",
            imageUrl: "/images/1.jpg",
            deletedPrice: "20,000",
            price: "15,000",
            tags: ['new', 'all']
        },
        {
            id: 5,
            title: "الحي الأول",
            description: "شقة 3 أوض وصالة ومطبخ وحمام",
            imageUrl: "/images/1.jpg",
            deletedPrice: "15,000",
            price: "10,000",
            tags: ['best', 'all']
        },
        {
            id: 6,
            title: "الحي الأول",
            description: "شقة 3 أوض وصالة ومطبخ وحمام",
            imageUrl: "/images/1.jpg",
            deletedPrice: "15,000",
            price: "10,000",
            tags: ['new', 'all']
        },
    ];



const ApartmentDetailPage = ({ params }) => {
    // 1. Get the ID from the URL parameters
    const { id } = params;
    const apartmentId = parseInt(id, 10);

    // 2. Find the apartment in your data
    const apartment = apartments.find(apt => apt.id === apartmentId);

    // 3. Handle case where the apartment is not found
    if (!apartment) {
        // next/navigation's notFound() will display a 404 page
        notFound(); 
    }

    // 4. Render the details of the found apartment
    return (
        <main className="p-8" dir="rtl">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="relative h-96">
                    <img
                        src={apartment.imageUrl}
                        alt={apartment.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-6">
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