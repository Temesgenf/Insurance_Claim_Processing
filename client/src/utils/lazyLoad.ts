import { lazy, type LazyExoticComponent } from 'react';
import type { ComponentType } from "react";

// Enhanced lazy loading with retry mechanism
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  retries = 3,
  retryDelay = 1000
): LazyExoticComponent<T> {
  return lazy(() => {
    return new Promise((resolve, reject) => {
      let attempts = 0;

      const attemptImport = () => {
        importFunc()
          .then(resolve)
          .catch((error) => {
            attempts++;
            console.warn(`Lazy import attempt ${attempts} failed:`, error);
            
            if (attempts < retries) {
              setTimeout(attemptImport, retryDelay * attempts);
            } else {
              reject(error);
            }
          });
      };

      attemptImport();
    });
  });
}

// Preload function for critical components
export function preloadComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): () => Promise<{ default: T }> {
  let promise: Promise<{ default: T }> | null = null;
  
  return () => {
    if (!promise) {
      promise = importFunc();
    }
    return promise;
  };
}

// Route-based preloading
export const preloadRoutes = {
  // User routes
  userDashboard: () => import('../pages/UserDashboard'),
  userClaims: () => import('../pages/ClaimsPage'),
  userPolicies: () => import('../pages/PoliciesPage'),
  userProducts: () => import('../pages/ProductsPage'),
  
  // Admin routes
  adminDashboard: () => import('../pages/AdminPage'),
  adminUsers: () => import('../pages/AdminUsersPage'),
  adminClaims: () => import('../pages/AdminClaimsPage'),
  adminPolicies: () => import('../pages/AdminPoliciesPage'),
  adminAnalytics: () => import('../pages/AdminAnalyticsPage'),
  
  // Auth routes
  login: () => import('../pages/Login'),
  register: () => import('../pages/OnboardingRegister'),
  
  // Other routes
  home: () => import('../pages/HomePage'),
  productDetail: () => import('../pages/ProductDetail'),
};

// Preload critical routes on user interaction
export function setupRoutePreloading() {
  // Preload user routes when user logs in
  const preloadUserRoutes = () => {
    preloadRoutes.userDashboard();
    preloadRoutes.userClaims();
    preloadRoutes.userPolicies();
  };

  // Preload admin routes when admin logs in
  const preloadAdminRoutes = () => {
    preloadRoutes.adminDashboard();
    preloadRoutes.adminUsers();
    preloadRoutes.adminClaims();
    preloadRoutes.adminPolicies();
    preloadRoutes.adminAnalytics();
  };

  // Listen for route changes and preload related routes
  const handleRouteChange = (pathname: string) => {
    if (pathname.startsWith('/user/')) {
      preloadUserRoutes();
    } else if (pathname.startsWith('/admin/')) {
      preloadAdminRoutes();
    }
  };

  return { preloadUserRoutes, preloadAdminRoutes, handleRouteChange };
}

// Lazy component with loading state tracking
export function createTrackedLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  componentName: string
): LazyExoticComponent<T> {
  return lazy(() => {
    const startTime = performance.now();
    
    return importFunc()
      .then((module) => {
        const loadTime = performance.now() - startTime;
        console.log(`${componentName} loaded in ${loadTime.toFixed(2)}ms`);
        return module;
      })
      .catch((error) => {
        console.error(`Failed to load ${componentName}:`, error);
        throw error;
      });
  });
} 