"use client";

import { useEffect, useState } from 'react';

const CursorTracker = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='bg-blue-500 fixed top-7 z-50 w-160 ml-[500px]'>
      <p>Текущие координаты курсора: ({cursorPosition.x}, {cursorPosition.y})</p>
    </div>
  );
};

export {CursorTracker};