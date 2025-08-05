import React from 'react';
// import './styles.css';
import Lottie from 'react-lottie';
import animationData from '../../assets/Loading animation blue (1).json';


export default function Loader() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Lottie 
          options={defaultOptions}
          height={50}
          width={50}
        />
      </div>
    );
  }
  