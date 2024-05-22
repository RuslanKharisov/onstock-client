"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface TailwindAnimationProps {
  children: ReactNode;
  className?: string;
}

const TailwindAnimation = (props: TailwindAnimationProps) => {
  const { children, className } = props;

  const [animationState, setAnimationState] = useState({
    opacity: 0,
    translateX: 0,
    translateY: 0,
    scale: 0,
    rotate: 0,
    transform: 0,
  });

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationState((prevState) => ({
            ...prevState,
            opacity: 0,
            translateX: 0,
            translateY: 0,
            scale: 0,
            rotate: 0,
            transform: 0,
          }));
        } else {
          setAnimationState((prevState) => ({
            ...prevState,
            opacity: 0,
            translateX: 0,
            translateY: 0,
            scale: 0,
            rotate: 0,
          }));
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} `}
      style={{ width: `${animationState.rotate}` }}
    >
      {children}
    </div>
  );
};

export { TailwindAnimation };
