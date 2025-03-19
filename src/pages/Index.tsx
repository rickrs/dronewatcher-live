
import React, { useEffect, useState } from 'react';
import { useDrones } from '@/hooks/useDrones';
import DroneGrid from '@/components/DroneGrid';
import Header from '@/components/Header';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const { drones, loading, error, addDrone, removeDrone } = useDrones(4);
  const [activeDrones, setActiveDrones] = useState(0);
  
  // Update active drone count when drones change
  useEffect(() => {
    const activeCount = drones.filter(drone => drone.status !== 'inactive').length;
    setActiveDrones(activeCount);
    
    // Show toast for drone status changes
    if (drones.length > 0) {
      const lastStatusChange = localStorage.getItem('lastDroneStatuses');
      const currentStatuses = JSON.stringify(drones.map(d => ({ id: d.id, status: d.status })));
      
      if (lastStatusChange && lastStatusChange !== currentStatuses) {
        const lastStatuses = JSON.parse(lastStatusChange);
        
        drones.forEach(drone => {
          const previous = lastStatuses.find((d: any) => d.id === drone.id);
          if (previous && previous.status !== drone.status) {
            if (drone.status === 'active') {
              toast.success(`${drone.name} has connected`, {
                description: 'RTSP feed available',
              });
            } else if (drone.status === 'inactive') {
              toast.error(`${drone.name} has disconnected`, {
                description: 'RTSP feed lost',
              });
            } else if (drone.status === 'warning') {
              toast.warning(`${drone.name} has an issue`, {
                description: 'Check telemetry data',
              });
            }
          }
        });
      }
      
      localStorage.setItem('lastDroneStatuses', currentStatuses);
    }
  }, [drones]);
  
  // Handle adding a new drone
  const handleAddDrone = () => {
    addDrone();
    toast.success('New drone added', {
      description: 'The drone has been added to the surveillance system',
    });
  };
  
  // Handle removing the last drone
  const handleRemoveDrone = () => {
    if (drones.length > 0) {
      const droneToRemove = drones[drones.length - 1];
      removeDrone(droneToRemove.id);
      toast.info(`${droneToRemove.name} removed`, {
        description: 'The drone has been removed from the surveillance system',
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex-center min-h-screen">
        <div className="glass-panel rounded-xl p-8 animate-pulse-opacity">
          <div className="text-lg">Connecting to drone network...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex-center min-h-screen">
        <div className="glass-panel rounded-xl p-8 border-drone-inactive">
          <div className="text-lg text-drone-inactive mb-2">Connection Error</div>
          <div className="text-muted-foreground">{error}</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-b from-background to-black">
      <div className="max-w-7xl mx-auto">
        <Header 
          activeDrones={activeDrones}
          totalDrones={drones.length}
          onAddDrone={handleAddDrone}
          onRemoveDrone={handleRemoveDrone}
        />
        
        <div className="animate-slide-up">
          <DroneGrid drones={drones} />
        </div>
      </div>
    </div>
  );
};

export default Index;
