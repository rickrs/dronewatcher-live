
import React, { useState } from 'react';
import { DroneData } from '@/utils/mockData';
import DroneFeed from './DroneFeed';
import { cn } from '@/lib/utils';

interface DroneGridProps {
  drones: DroneData[];
  className?: string;
}

const DroneGrid: React.FC<DroneGridProps> = ({ drones, className }) => {
  const [maximizedDroneId, setMaximizedDroneId] = useState<string | null>(null);
  
  const handleMaximize = (droneId: string) => {
    setMaximizedDroneId(maximizedDroneId === droneId ? null : droneId);
  };
  
  // Determine grid columns based on drone count
  const getGridColsClass = () => {
    if (maximizedDroneId) return 'grid-cols-1';
    
    const count = drones.length;
    if (count <= 1) return 'grid-cols-1';
    if (count <= 2) return 'grid-cols-1 md:grid-cols-2';
    if (count <= 4) return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  // If there are no drones, show a placeholder
  if (drones.length === 0) {
    return (
      <div className="flex-center h-96 glass-panel rounded-xl">
        <div className="text-muted-foreground">No drones available</div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'grid gap-4 transition-all duration-300 ease-in-out',
        getGridColsClass(),
        className
      )}
    >
      {drones.map(drone => (
        <DroneFeed
          key={drone.id}
          drone={drone}
          onMaximize={handleMaximize}
          isMaximized={maximizedDroneId === drone.id}
          className={cn(
            'transition-all duration-300 ease-in-out',
            maximizedDroneId && maximizedDroneId !== drone.id ? 'hidden' : '',
            drone.status !== 'inactive' ? 'order-first' : ''
          )}
        />
      ))}
    </div>
  );
};

export default DroneGrid;
