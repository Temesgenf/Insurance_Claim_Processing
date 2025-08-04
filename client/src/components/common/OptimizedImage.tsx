import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/usePerformance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean; // For above-the-fold images
  sizes?: string; // For responsive images
  // Removed unused props
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OWE5YiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  fallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVlNGUyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2Q5MjEyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVycm9yPC90ZXh0Pjwvc3ZnPg==',
  loading = 'lazy',
  onLoad,
  onError,
  priority = false,
  sizes,
  // Removed unused parameters
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');

  // Intersection Observer for lazy loading
  const observerRef = useIntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) { 
          setIsInView(true);
        }
      });
    },
    { 
      threshold: 0.1, 
      rootMargin: priority ? '0px' : '50px' // No margin for priority images
    }
  );

  useEffect(() => {
    if (loading === 'eager' || priority) {
      setIsInView(true);
      return;
    }
    // The intersection observer is handled by the useIntersectionObserver hook
  }, [loading, priority]);

  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => {
        setImageSrc(fallback);
        setHasError(true);
        onError?.();
      };
      img.src = src;
    }
  }, [isInView, src, isLoaded, hasError, fallback, onLoad, onError]);

  return (
    <img
      ref={observerRef as React.RefObject<HTMLImageElement>}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-50'} ${className}`}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      sizes={sizes}
      style={{
        objectFit: 'cover',
        backgroundColor: '#f3f4f6',
      }}
    />
  );
};

export default OptimizedImage;
