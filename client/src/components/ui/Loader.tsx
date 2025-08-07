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
      <div className='w-full h-screen flex items-center justify-center'>
        <Lottie 
          options={defaultOptions}
          height={(window.innerWidth > 500) ? 500 : 250}
          width={(window.innerWidth > 500) ? 500 : 250}
        />
      </div>
    );
  }
  