import React from "react";
import { useRef, useLayoutEffect } from 'react';
import { gsap, Expo } from 'gsap';

import style from './IntroScreen.module.css';

const IntroScreen = () => {
  let introWrapperRef = useRef<HTMLDivElement>(null);
  let cup = useRef<HTMLSpanElement>(null);
  let culator = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    gsap.to(introWrapperRef.current, 2.9, {
      delay: 1,
      opacity: 0,
      display: 'none',
      ease: Expo.easeInOut,
    });

    gsap.from(cup.current, 1.6, {
      y: '-200vh',
      opacity: 0.5,
      ease: Expo.easeInOut,
    });

    gsap.from(culator.current, 1.6, {
      y: '200vh',
      opacity: 0.5,
      ease: Expo.easeInOut,
    });

    gsap.to([cup.current, culator.current], .6, {
      delay: 1.6,
      opacity: 0,
      ease: Expo.easeInOut,
    });
  }, []);

  return (
    <div
      ref={introWrapperRef}
      className={style.introWrapper}
    >
      <span ref={cup} className='h1'>cup</span>
      <span ref={culator} className='h1'>culator</span>
    </div>
  )
};

export default IntroScreen;
