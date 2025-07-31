import { useState, useCallback, useRef, useEffect } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface UseOptimizedAPIOptions {
  cacheTime?: number; // Cache duration in milliseconds
  staleTime?: number; // Time before data is considered stale
  retryCount?: number;
  retryDelay?: number;
  deduplicate?: boolean; // Prevent duplicate requests
  optimistic?: boolean; // Enable optimistic updates
}

interface APIState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isStale: boolean;
}

export function useOptimizedAPI<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = [],
  options: UseOptimizedAPIOptions = {}
) {
  const {
    cacheTime = 5 * 60 * 1000, // 5 minutes
    retryCount = 3,
    retryDelay = 1000,
    deduplicate = true,
    optimistic = false,
  } = options;

  const [state, setState] = useState<APIState<T>>({
    data: null,
    loading: false,
    error: null,
    isStale: false,
  });

  const cache = useRef<Map<string, CacheEntry<T>>>(new Map());
  const pendingRequests = useRef<Map<string, Promise<T>>>(new Map());
  const abortController = useRef<AbortController | null>(null);

  // Generate cache key from dependencies
  const getCacheKey = useCallback(() => {
    return JSON.stringify(dependencies);
  }, [dependencies]);

  // Check if data is stale
  const isDataStale = useCallback((entry: CacheEntry<T>) => {
    return Date.now() > entry.expiresAt;
  }, []);

  // Get cached data
  const getCachedData = useCallback((key: string): T | null => {
    const entry = cache.current.get(key);
    if (!entry) return null;

    if (isDataStale(entry)) {
      cache.current.delete(key);
      return null;
    }

    return entry.data;
  }, [isDataStale]);

  // Set cached data
  const setCachedData = useCallback((key: string, data: T) => {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + cacheTime,
    };
    cache.current.set(key, entry);
  }, [cacheTime]);

  // Execute API call with retry logic
  const executeAPICall = useCallback(async (): Promise<T> => {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        // Create new abort controller for this request
        abortController.current = new AbortController();

        const result = await apiCall();
        return result;
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < retryCount) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        }
      }
    }

    throw lastError;
  }, [apiCall, retryCount, retryDelay]);

  // Main fetch function
  const fetchData = useCallback(async (force = false) => {
    const cacheKey = getCacheKey();

    // Check cache first (unless forced)
    if (!force) {
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        setState(prev => ({
          ...prev,
          data: cachedData,
          loading: false,
          error: null,
          isStale: false,
        }));
        return;
      }
    }

    // Check for pending request (deduplication)
    if (deduplicate && pendingRequests.current.has(cacheKey)) {
      try {
        const result = await pendingRequests.current.get(cacheKey)!;
        setState(prev => ({
          ...prev,
          data: result,
          loading: false,
          error: null,
          isStale: false,
        }));
        return;
      } catch (error) {
        // Continue to make new request if pending one failed
      }
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Create new request promise
      const requestPromise = executeAPICall();
      if (deduplicate) {
        pendingRequests.current.set(cacheKey, requestPromise);
      }

      const result = await requestPromise;
      
      // Cache the result
      setCachedData(cacheKey, result);
      
      setState(prev => ({
        ...prev,
        data: result,
        loading: false,
        error: null,
        isStale: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: (error as Error).message,
      }));
    } finally {
      if (deduplicate) {
        pendingRequests.current.delete(cacheKey);
      }
    }
  }, [getCacheKey, getCachedData, setCachedData, executeAPICall, deduplicate]);

  // Optimistic update
  const optimisticUpdate = useCallback((updater: (data: T | null) => T) => {
    if (!optimistic) return;

    setState(prev => {
      const newData = updater(prev.data);
      return {
        ...prev,
        data: newData,
        isStale: true, // Mark as stale since it's optimistic
      };
    });
  }, [optimistic]);

  // Refresh data
  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  // Clear cache
  const clearCache = useCallback(() => {
    cache.current.clear();
    pendingRequests.current.clear();
  }, []);

  // Effect to fetch data when dependencies change
  useEffect(() => {
    fetchData();
    
    return () => {
      // Abort pending request on unmount
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [fetchData]);

  return {
    ...state,
    refresh,
    optimisticUpdate,
    clearCache,
  };
} 