import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { FaChevronRight } from 'react-icons/fa';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { theme } = useTheme();
  
  const getTextColor = () => theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const getActiveTextColor = () => theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  
  return (
    <nav className="flex mb-5" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <FaChevronRight className={`${getTextColor()} mx-2 text-xs`} />
            )}
            
            {index === items.length - 1 ? (
              <span className={`${getActiveTextColor()} font-medium`}>
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.href} 
                className={`${getTextColor()} hover:${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;