"use client";
import React from 'react'
import Card from './Card'
const MainSection = () => {
    return(
    <section className='py-8 flex flex-col ' dir='rtl'>

    
    <div className='flex flex-row justify-center items-center p-2'>
        <button className='mx-1 border outline-0 bg-white border-[#F43F5E] text-[#F43F5E] hover:bg-[#F43F5E] hover:text-white  p-2 font-bold  text-2xl transition-all duration-500 rounded-2xl ' >الكل</button>
        <button className='mx-1 border outline-0 bg-[#fff] border-[#F43F5E] text-[#F43F5E] hover:bg-[#F43F5E] hover:text-white p-2 font-bold text-2xl transition-all duration-500 rounded-2xl' >أفضل العروض</button>
        <button className='mx-1 border outline-0 bg-[#fff] border-[#F43F5E] text-[#F43F5E] hover:bg-[#F43F5E] hover:text-white  p-2 font-bold text-2xl transition-all duration-500 rounded-2xl' >الأحدث</button>
    </div>
    

    <div className='grid md:grid-cols-2 gap-4 md:gap-4 p-2 lg:grid-cols-4 place-items-center w-full'>

    <Card  imageUrl={'/images/1.jpg'} title={"الحي الأول "} description={"شقة 3 أوض وصالة ومطبخ وحمام"} deletedPrice={"15,000"} price={"10,000"}></Card>
    <Card  imageUrl={'/images/2.jpg'} title={"الحي الثاني "} description={"شقة 3 أوض وصالة ومطبخ وحمام"} deletedPrice={"15,000"} price={"10,000"}></Card>
    <Card  imageUrl={'/images/1.jpg'} title={"التجمع الخامس "} description={"شقة 3 أوض وصالة ومطبخ وحمام"} deletedPrice={"15,000"} price={"10,000"}></Card>
    <Card  imageUrl={'/images/2.jpg'} title={" المهندسين "} description={"شقة 3 أوض وصالة ومطبخ وحمام"} deletedPrice={"15,000"} price={"10,000"}></Card>
    <Card  imageUrl={'/images/1.jpg'} title={" وسط البلد "} description={"شقة 3 أوض وصالة ومطبخ وحمام"} deletedPrice={"15,000"} price={"10,000"}></Card>
    <Card  imageUrl={'/images/2.jpg'} title={"الحي الأول "} description={"شقة 3 أوض وصالة ومطبخ وحمام"} deletedPrice={"15,000"} price={"10,000"}></Card>
    <Card  imageUrl={'/images/1.jpg'} title={"الحي الأول "} description={"شقة 3 أوض وصالة ومطبخ وحمام"} deletedPrice={"15,000"} price={"10,000"}></Card>
    <Card  imageUrl={'/images/2.jpg'} title={"الحي الأول "} description={"شقة 3 أوض وصالة ومطبخ وحمام"} deletedPrice={"15,000"} price={"10,000"}></Card>
    <Card  imageUrl={'/images/1.jpg'} title={"الحي الأول "} description={"شقة 3 أوض وصالة ومطبخ وحمام"} deletedPrice={"15,000"} price={"10,000"}></Card>
    </div>

    
    </section>
    )
}

export default MainSection