import React from "react";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {

    return (
        <section className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12  bg-gradient-to-br from-[#fff] to-[#ddd] text-white lg:py-0 md:py-20 sm:py-20 shadow-xl"  >
        
        <div className="col-span-7 place-self-center text-center sm:text-left animate-fade-in-slide-up lg:py-68  pt-34">
            <div className="text-black">  
              <h1 className="md:text-4xl sm:text-2xl lg:text-4xl font-bold mb-4">Welcome to Sakanify</h1>
                <p className="text-[#444] md:text-lg lg:text-xl sm:text-base mb-8">
                    Your one-stop solution for all your needs.
                </p>
            </div>
            <div>
            <Link href="/explore" className="bg-[#eee] text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-black  px-6 py-3 rounded-full shadow-2xl  transition-all duration-500 ">
            WhatsApp
            </Link>
            </div>
        </div>
    <div className='col-span-5 mt-10 lg:mt-0 place-self-center pb-20 lg:pb-0 '>

        <Image
            src="/images/sakanify.png"
            alt="Hero Image"
            width={150}
            height={200}
            className="md:my-10 lg:mb-10"
        /> 
        </div>
        
        </section>
        
    );


}
export default HeroSection;