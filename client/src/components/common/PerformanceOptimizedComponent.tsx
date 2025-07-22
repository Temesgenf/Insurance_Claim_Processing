import React, { useMemo, useCallback, memo } from 'react';

// Example of a performance-optimized component
interface PerformanceOptimizedComponentProps {
  data: any[];
  onItemClick: (id: string) => void;
  filter: string;
  sortBy: string;
}

// Memoized child component
const ListItem = memo<{ item: any; onClick: (id: string) => void }>(({ item, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(item.id);
  }, [item.id, onClick]);

  return (
    <div 
      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <h3 className="font-semibold">{item.title}</h3>
      <p className="text-gray-600">{item.description}</p>
    </div>
  );
});

ListItem.displayName = 'ListItem';

// Main component with performance optimizations
const PerformanceOptimizedComponent: React.FC<PerformanceOptimizedComponentProps> = ({
  data,
  onItemClick,
  filter,
  sortBy
}) => {
  // Memoized filtered and sorted data
  const processedData = useMemo(() => {
    let result = [...data];
    
    // Apply filter
    if (filter) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(filter.toLowerCase()) ||
        item.description.toLowerCase().includes(filter.toLowerCase())
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return a.id.localeCompare(b.id);
    });
    
    return result;
  }, [data, filter, sortBy]);

  // Memoized click handler
  const handleItemClick = useCallback((id: string) => {
    onItemClick(id);
  }, [onItemClick]);

  // Memoized expensive calculation
  const statistics = useMemo(() => {
    return {
      total: processedData.length,
      averageLength: processedData.reduce((acc, item) => acc + item.title.length, 0) / processedData.length,
      categories: [...new Set(processedData.map(item => item.category))].length
    };
  }, [processedData]);

  return (
    <div className="space-y-4">
      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm text-gray-600">Total Items</p>
          <p className="text-2xl font-bold">{statistics.total}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Avg Title Length</p>
          <p className="text-2xl font-bold">{statistics.averageLength.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Categories</p>
          <p className="text-2xl font-bold">{statistics.categories}</p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {processedData.map(item => (
          <ListItem 
            key={item.id} 
            item={item} 
            onClick={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(PerformanceOptimizedComponent); 