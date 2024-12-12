"use client"

import {useEffect, useState} from 'react';

const ScrollTracker = () => {
    const [scrollTop, setScrollTop] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        setScrollTop(window.scrollY);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <div>
        <div className='bg-red-500 fixed top-0 z-50 w-160 ml-[500px]' >
          <h2>Scroll Top: {scrollTop}</h2>
        </div>
  
        <div className=''>
          {[...Array(100)].map((_, index) => (
            <p key={index}>Content {index}</p>
          ))}
        </div>
      </div>
    );
  };
  
  export {ScrollTracker};