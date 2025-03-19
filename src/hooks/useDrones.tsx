
import { useState, useEffect, useCallback } from 'react';
import { DroneData, createMockDrones, updateDroneData } from '@/utils/mockData';

export function useDrones(initialCount: number = 5) {
  const [drones, setDrones] = useState<DroneData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize drones
  useEffect(() => {
    try {
      const initialDrones = createMockDrones(initialCount);
      setDrones(initialDrones);
      setLoading(false);
    } catch (err) {
      setError('Failed to initialize drone data');
      setLoading(false);
      console.error(err);
    }
  }, [initialCount]);

  // Update drone data periodically
  useEffect(() => {
    if (loading || error) return;

    const updateInterval = setInterval(() => {
      setDrones(prevDrones => {
        return prevDrones.map(drone => updateDroneData(drone))
          .sort((a, b) => {
            // Sort by status: active and warning first, then inactive
            if (a.status !== 'inactive' && b.status === 'inactive') return -1;
            if (a.status === 'inactive' && b.status !== 'inactive') return 1;
            return 0;
          });
      });
    }, 2000);

    return () => clearInterval(updateInterval);
  }, [loading, error]);

  // Add a new drone
  const addDrone = useCallback(() => {
    const newDrone = createMockDrones(1)[0];
    newDrone.id = `drone-${drones.length + 1}`;
    newDrone.name = `Drone ${drones.length + 1}`;
    
    setDrones(prevDrones => [...prevDrones, newDrone].sort((a, b) => {
      if (a.status !== 'inactive' && b.status === 'inactive') return -1;
      if (a.status === 'inactive' && b.status !== 'inactive') return 1;
      return 0;
    }));
  }, [drones.length]);

  // Remove a drone
  const removeDrone = useCallback((droneId: string) => {
    setDrones(prevDrones => prevDrones.filter(drone => drone.id !== droneId));
  }, []);

  return { drones, loading, error, addDrone, removeDrone };
}
