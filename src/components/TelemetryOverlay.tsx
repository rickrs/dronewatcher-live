
import React from 'react';
import { DroneData } from '@/utils/mockData';
import { cn } from '@/lib/utils';
import { Battery, Signal, Thermometer, Wind, AlertTriangle, Compass, MapPin } from 'lucide-react';

interface TelemetryOverlayProps {
  drone: DroneData;
  expanded?: boolean;
  className?: string;
}

const TelemetryOverlay: React.FC<TelemetryOverlayProps> = ({
  drone,
  expanded = false,
  className,
}) => {
  // Format numbers to always show given decimal places
  const formatNumber = (value: number, decimals: number = 0) => {
    return value.toFixed(decimals);
  };

  // Get battery level color
  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-drone-active';
    if (level > 20) return 'text-drone-warning';
    return 'text-drone-inactive';
  };

  // Format coordinates to be more readable
  const formatCoordinate = (coord: number) => {
    return coord.toFixed(6);
  };

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div className={cn(
      'glass-card overflow-hidden text-white',
      'transition-all duration-300 ease-in-out',
      expanded ? 'p-4' : 'p-2',
      className
    )}>
      {/* Basic info always shown */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-sm">{drone.name}</h3>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Battery className={cn('h-4 w-4', getBatteryColor(drone.battery))} />
            <span className="text-xs">{drone.battery.toFixed(0)}%</span>
          </span>
          <span className="flex items-center gap-1">
            <Signal className="h-4 w-4" />
            <span className="text-xs">{drone.signalStrength.toFixed(0)}%</span>
          </span>
        </div>
      </div>

      {/* Collision alert */}
      {drone.collisionAlert && (
        <div className="bg-drone-inactive bg-opacity-20 text-drone-inactive rounded px-2 py-1 mb-2 flex items-center gap-1 text-xs animate-pulse-opacity">
          <AlertTriangle className="h-3 w-3" />
          <span>Collision Alert</span>
        </div>
      )}

      {/* Expanded telemetry */}
      {expanded && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mt-3">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Position:</span>
          </div>
          <div className="text-right">
            {formatCoordinate(drone.coordinates.latitude)}, {formatCoordinate(drone.coordinates.longitude)}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Altitude:</span>
          </div>
          <div className="text-right">{formatNumber(drone.altitude)} m</div>

          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Speed:</span>
          </div>
          <div className="text-right">
            {formatNumber(drone.speed.horizontal)} km/h
          </div>

          <div className="flex items-center gap-1">
            <Compass className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Heading:</span>
          </div>
          <div className="text-right">{formatNumber(drone.heading)}°</div>

          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Orientation:</span>
          </div>
          <div className="text-right">
            P: {formatNumber(drone.orientation.pitch)}° R: {formatNumber(drone.orientation.roll)}°
          </div>

          <div className="flex items-center gap-1">
            <Thermometer className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Temp:</span>
          </div>
          <div className="text-right">
            {formatNumber(drone.temperature.motors)}°C / {formatNumber(drone.temperature.controller)}°C
          </div>

          <div className="flex items-center gap-1">
            <Wind className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Wind:</span>
          </div>
          <div className="text-right">{formatNumber(drone.windSpeed)} km/h</div>
        </div>
      )}

      {/* Last updated timestamp */}
      <div className="text-right text-xs text-muted-foreground mt-2">
        Updated: {formatTimestamp(drone.lastUpdated)}
      </div>
    </div>
  );
};

export default TelemetryOverlay;
