"use client";
import React, { useState } from 'react';
import Card from './Card';

const MainSection = () => {
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

    // 1. Use state to manage which apartments to display
    const [filteredApartments, setFilteredApartments] = useState(apartments);
    const [activeTag, setActiveTag] = useState('all');

    // 2. Define the filter function to update the state
    const handleFilter = (tag) => {
        setActiveTag(tag);
        if (tag === 'all') {
            setFilteredApartments(apartments);
        } else {
            const filtered = apartments.filter(apartment => apartment.tags.includes(tag));
            setFilteredApartments(filtered);
        }
    };

    return (
        <section className='py-8 flex flex-col' dir='rtl'>
            <div className='flex flex-row justify-center items-center p-2'>
                {/* 3. Use an arrow function in the onClick handler */}
                <button
                    onClick={() => handleFilter('all')}
                    className={`mx-1 border outline-0 border-[#F43F5E] p-2 font-bold text-2xl transition-all duration-500 rounded-2xl ${activeTag === 'all' ? 'bg-[#F43F5E] text-white' : 'bg-white text-[#F43F5E] '}`}
                >
                    الكل
                </button>
                <button
                    onClick={() => handleFilter('best')}
                    className={`mx-1 border outline-0 border-[#F43F5E] p-2 font-bold text-2xl transition-all duration-500 rounded-2xl ${activeTag === 'best' ? 'bg-[#F43F5E] text-white' : 'bg-white text-[#F43F5E] '}`}
                >
                    أفضل العروض
                </button>
                <button
                    onClick={() => handleFilter('new')}
                    className={`mx-1 border outline-0 border-[#F43F5E] p-2 font-bold text-2xl transition-all duration-500 rounded-2xl ${activeTag === 'new' ? 'bg-[#F43F5E] text-white' : 'bg-white text-[#F43F5E] '}`}
                >
                    الأحدث
                </button>
            </div>

            <div className='grid md:grid-cols-2 gap-4 md:gap-4 p-2 lg:grid-cols-4 place-items-center w-full'>
                {/* 4. Map over the state variable, not the original array */}
                {filteredApartments.map((apartment) => (
                    <Card
                        key={apartment.id}
                        id={apartment.id}
                        title={apartment.title}
                        description={apartment.description}
                        imageUrl={apartment.imageUrl}
                        deletedPrice={apartment.deletedPrice}
                        price={apartment.price}
                    />
                ))}
            </div>
        </section>
    );
};

export default MainSection;