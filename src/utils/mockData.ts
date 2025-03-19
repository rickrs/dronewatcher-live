
// Types for drone data
export interface DroneData {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'warning';
  battery: number;
  signalStrength: number;
  altitude: number;
  speed: {
    horizontal: number;
    vertical: number;
  };
  coordinates: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
  heading: number;
  orientation: {
    pitch: number;
    roll: number;
    yaw: number;
  };
  distanceFromTakeoff: number;
  temperature: {
    motors: number;
    controller: number;
  };
  windSpeed: number;
  collisionAlert: boolean;
  lastUpdated: Date;
  rtspUrl: string;
  imageUrl: string;
}

// Generate random number within range
const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Generate random coordinates near a base position
const generateCoordinates = (baseLat: number, baseLng: number, radius: number) => {
  const lat = baseLat + (Math.random() - 0.5) * radius;
  const lng = baseLng + (Math.random() - 0.5) * radius;
  return { latitude: lat, longitude: lng, altitude: Math.floor(randomInRange(50, 300)) };
};

// Create mock drones
export const createMockDrones = (count: number): DroneData[] => {
  const drones: DroneData[] = [];
  const baseImages = ['/drone1.jpg', '/drone2.jpg', '/drone3.jpg'];
  
  // Base coordinates (San Francisco)
  const baseLat = 37.7749;
  const baseLng = -122.4194;
  
  for (let i = 0; i < count; i++) {
    const isActive = Math.random() > 0.3; // 70% chance of being active
    const hasWarning = isActive && Math.random() > 0.8; // 20% chance of active drones having a warning
    
    let status: 'active' | 'inactive' | 'warning' = 'inactive';
    if (isActive) {
      status = hasWarning ? 'warning' : 'active';
    }
    
    drones.push({
      id: `drone-${i + 1}`,
      name: `Drone ${i + 1}`,
      status,
      battery: Math.floor(randomInRange(30, 100)),
      signalStrength: Math.floor(randomInRange(50, 100)),
      altitude: Math.floor(randomInRange(50, 300)),
      speed: {
        horizontal: Math.floor(randomInRange(0, 40)),
        vertical: Math.floor(randomInRange(-5, 10)),
      },
      coordinates: generateCoordinates(baseLat, baseLng, 0.1),
      heading: Math.floor(randomInRange(0, 360)),
      orientation: {
        pitch: Math.floor(randomInRange(-20, 20)),
        roll: Math.floor(randomInRange(-20, 20)),
        yaw: Math.floor(randomInRange(0, 360)),
      },
      distanceFromTakeoff: Math.floor(randomInRange(0, 1000)),
      temperature: {
        motors: Math.floor(randomInRange(30, 60)),
        controller: Math.floor(randomInRange(25, 50)),
      },
      windSpeed: Math.floor(randomInRange(0, 25)),
      collisionAlert: Math.random() > 0.9, // 10% chance of collision alert
      lastUpdated: new Date(),
      rtspUrl: `rtsp://example.com/live/drone${i + 1}`,
      imageUrl: baseImages[i % baseImages.length],
    });
  }
  
  // Sort by status: active and warning first, then inactive
  return drones.sort((a, b) => {
    if (a.status !== 'inactive' && b.status === 'inactive') return -1;
    if (a.status === 'inactive' && b.status !== 'inactive') return 1;
    return 0;
  });
};

// Simulate data updates over time for a single drone
export const updateDroneData = (drone: DroneData): DroneData => {
  // Clone the drone to avoid mutating the original
  const updatedDrone = { ...drone };
  
  // Random chance to change status
  const statusChange = Math.random();
  if (statusChange > 0.95) { // 5% chance to change status
    if (updatedDrone.status === 'active') {
      updatedDrone.status = Math.random() > 0.5 ? 'warning' : 'inactive';
    } else if (updatedDrone.status === 'warning') {
      updatedDrone.status = Math.random() > 0.5 ? 'active' : 'inactive';
    } else {
      updatedDrone.status = 'active';
    }
  }
  
  // Update other values
  updatedDrone.battery = Math.max(0, updatedDrone.battery - (Math.random() * 0.5));
  updatedDrone.signalStrength = Math.max(0, Math.min(100, updatedDrone.signalStrength + (Math.random() - 0.5) * 5));
  updatedDrone.altitude += (Math.random() - 0.5) * 10;
  updatedDrone.speed.horizontal += (Math.random() - 0.5) * 5;
  updatedDrone.speed.vertical += (Math.random() - 0.5) * 2;
  
  // Update heading and coordinates
  updatedDrone.heading = (updatedDrone.heading + (Math.random() - 0.5) * 5) % 360;
  const moveDistance = 0.0001 * updatedDrone.speed.horizontal / 10;
  const radians = (updatedDrone.heading * Math.PI) / 180;
  updatedDrone.coordinates.latitude += Math.cos(radians) * moveDistance;
  updatedDrone.coordinates.longitude += Math.sin(radians) * moveDistance;
  
  // Update orientation
  updatedDrone.orientation.pitch += (Math.random() - 0.5) * 2;
  updatedDrone.orientation.roll += (Math.random() - 0.5) * 2;
  updatedDrone.orientation.yaw = updatedDrone.heading;
  
  // Update distance from takeoff
  updatedDrone.distanceFromTakeoff += updatedDrone.speed.horizontal * 0.1;
  
  // Update temperature
  updatedDrone.temperature.motors += (Math.random() - 0.5) * 2;
  updatedDrone.temperature.controller += (Math.random() - 0.5) * 1;
  
  // Update wind speed
  updatedDrone.windSpeed += (Math.random() - 0.5) * 3;
  if (updatedDrone.windSpeed < 0) updatedDrone.windSpeed = 0;
  
  // Update collision alert
  updatedDrone.collisionAlert = Math.random() > 0.95 ? !updatedDrone.collisionAlert : updatedDrone.collisionAlert;
  
  // Update timestamp
  updatedDrone.lastUpdated = new Date();
  
  return updatedDrone;
};
