import React from "react";
import { useRef, useLayoutEffect } from 'react';
import { gsap, Expo } from 'gsap';

import style from './IntroScreen.module.css';

const IntroScreen = () => {
  let introWrapperRef = useRef(null);
  let cup = useRef(null);
  let culator = useRef(null);

  useLayoutEffect(() => {
    gsap.to(introWrapperRef, 2.9, {
      delay: 1,
      opacity: 0,
      display: 'none',
      ease: Expo.easeInOut,
    });

    gsap.from(cup, 1.6, {
      y: '-200vh',
      opacity: 0.5,
      ease: Expo.easeInOut,
    });

    gsap.from(culator, 1.6, {
      y: '200vh',
      opacity: 0.5,
      ease: Expo.easeInOut,
    });

    gsap.to([cup, culator], .6, {
      delay: 1.6,
      opacity: 0,
      ease: Expo.easeInOut,
    });
  }, []);

  return (
    <div
      ref={el => introWrapperRef = el}
      className={style.introWrapper}
    >
      <span ref={el => cup = el} className='h1'>cup</span>
      <span ref={el => culator = el} className='h1'>culator</span>
    </div>
  )
};

export default IntroScreen;
