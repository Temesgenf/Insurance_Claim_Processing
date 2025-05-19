import React from 'react';
import { useTheme } from '../../Context/ThemeContext';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', text }) => {
  const { theme } = useTheme();
  
  const getSpinnerSize = () => {
    switch (size) {
      case 'small': return 'h-4 w-4';
      case 'large': return 'h-12 w-12';
      default: return 'h-8 w-8';
    }
  };
  
  const getTextColor = () => theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const getBorderColor = () => theme === 'dark' ? 'border-brand-400' : 'border-brand-500';
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${getSpinnerSize()} animate-spin rounded-full border-b-2 ${getBorderColor()}`}></div>
      {text && <p className={`mt-4 ${getTextColor()}`}>{text}</p>}
    </div>
  );
};

export default Spinner;