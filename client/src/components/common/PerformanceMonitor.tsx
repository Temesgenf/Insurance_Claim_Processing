import React, { useEffect, useState, useRef } from 'react';
import { usePerformanceMonitor } from '../../hooks/usePerformance';

interface PerformanceMetrics {
  renderCount: number;
  averageRenderTime: number;
  totalRenderTime: number;
  memoryUsage?: number;
  lastRenderTime: number;
}

interface PerformanceMonitorProps {
  componentName: string;
  enabled?: boolean;
  showMetrics?: boolean;
  logToConsole?: boolean;
  trackMemory?: boolean;
  warningThreshold?: number;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  componentName,
  enabled = import.meta.env.DEV,
  showMetrics = false,
  logToConsole = true,
  trackMemory = true,
  warningThreshold = 10,
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderCount: 0,
    averageRenderTime: 0,
    totalRenderTime: 0,
    lastRenderTime: 0,
  });
  const startTime = useRef<number>(performance.now());

  const { renderCount, resetRenderCount } = usePerformanceMonitor(componentName);

  useEffect(() => {
    if (!enabled) return;

    const endTime = performance.now();
    const currentRenderTime = endTime - startTime.current;
    startTime.current = performance.now();

    // Update metrics
    setMetrics(prev => {
      const newTotalTime = prev.totalRenderTime + currentRenderTime;
      const newAverageTime = newTotalTime / renderCount;
      
      return {
        ...prev,
        renderCount,
        lastRenderTime: currentRenderTime,
        totalRenderTime: newTotalTime,
        averageRenderTime: newAverageTime,
        memoryUsage: trackMemory ? (performance as any).memory?.usedJSHeapSize : undefined,
      };
    });

    // Log to console in development
    if (logToConsole && import.meta.env.DEV) {
      console.log(`🚀 ${componentName}:`, {
        renderCount,
        renderTime: `${currentRenderTime.toFixed(2)}ms`,
        averageTime: `${metrics.averageRenderTime.toFixed(2)}ms`,
        memoryUsage: metrics.memoryUsage ? `${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB` : 'N/A'
      });
    }

    // Log performance warnings
    if (renderCount > warningThreshold) {
      console.warn(`⚠️ ${componentName} has rendered ${renderCount} times. Consider optimizing with React.memo or useMemo.`);
    }

    if (currentRenderTime > 16) { // 60fps threshold
      console.warn(`⚠️ ${componentName} render time (${currentRenderTime.toFixed(2)}ms) exceeds 16ms. Consider optimization.`);
    }
  }, [renderCount, componentName, enabled, logToConsole, trackMemory, warningThreshold]);

  if (!enabled || !showMetrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-3 rounded-lg text-xs z-50 font-mono opacity-75 hover:opacity-100 transition-opacity">
      <div className="font-bold mb-1">{componentName}</div>
      <div>Renders: {metrics.renderCount}</div>
      <div>Last: {metrics.lastRenderTime.toFixed(1)}ms</div>
      <div>Avg: {metrics.averageRenderTime.toFixed(1)}ms</div>
      {metrics.memoryUsage && (
        <div>Memory: {(metrics.memoryUsage / 1024 / 1024).toFixed(1)}MB</div>
      )}
      <button 
        onClick={resetRenderCount}
        className="mt-2 px-2 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700 transition-colors"
      >
        Reset
      </button>
    </div>
  );
};

export default PerformanceMonitor;
