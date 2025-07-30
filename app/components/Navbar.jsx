"use client";

import React, {useState} from 'react';
import Link  from 'next/link';
import Image from 'next/image';

const Navbar = ()=>{
   

    
// const [isDarkMode, setIsDarkMode] = useState(false); // Initial state is light mode

//   const toggleTheme = () => {
//     setIsDarkMode(prevMode => !prevMode); // Toggles the state
//   }
 
    return(
        <nav  className= 'fixed top-0 left-0 right-0 z-10 bg-[#ffffff95] select-none'>

        <div className='flex flex-wrap items-center justify-between mx-auto p-4 lg:p-8 ' > 
            
            <div className=' md:block md:w-auto ' id='navbar'>
                <Image src='/theme.svg' alt='change theme icon' width={30} height={30}></Image>
            </div>
        
            <Link href={'/'} className='text-blue-600 font-bold text-2xl lg:text-4xl sm:text-xl'>
                <Image  src='/images/sakanify.png' alt='Logo Icon' width={50} height={50} />
            </Link>
        

        
        
        </div>
    </nav>
    )
}

export default Navbar;