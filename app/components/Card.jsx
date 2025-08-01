"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';



const Card = ({ title,id,  description, imageUrl, deletedPrice, price  }) => {
    return (
         <Link href={`/apartments/${id}`}>
        <div className="bg-[#eee] rounded-lg shadow-lg p-4  w-[300px] m-2 " dir='rtl'>
            <div className='h-80 md:h-80 rounded-xl relative group' style={{backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover'}}>


            </div>

            <div>
            <h1 className='font-bold text-2xl text-black my-4'>{title}</h1>
            <p className='text-[#444] text-base'>{description}</p>

            <div className='flex flex-row justify-between items-center mt-4 pb-2'>
                <span className='text-lg text-gray-500 line-through'>{deletedPrice}</span>
                <span className='text-2xl font-bold text-green-600'>{price}</span>
            </div>
            </div>
        </div>
        </Link>
    );
}

export default Card;