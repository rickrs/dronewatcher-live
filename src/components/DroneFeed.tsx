
import React, { useState } from 'react';
import { DroneData } from '@/utils/mockData';
import { cn } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import TelemetryOverlay from './TelemetryOverlay';
import { Maximize2, Minimize2 } from 'lucide-react';

interface DroneFeedProps {
  drone: DroneData;
  className?: string;
  onMaximize?: (droneId: string) => void;
  isMaximized?: boolean;
}

const DroneFeed: React.FC<DroneFeedProps> = ({
  drone,
  className,
  onMaximize,
  isMaximized = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Placeholder for RTSP stream - in a real app this would use a video player library
  // that supports RTSP streams over WebRTC or similar technology
  const renderVideoFeed = () => {
    if (drone.status === 'inactive') {
      return (
        <div className="flex-center flex-col h-full glass-panel text-muted-foreground animate-fade-in">
          <div className="mb-2 opacity-50 text-sm">Offline</div>
          <div className="opacity-30 text-xs">RTSP stream unavailable</div>
        </div>
      );
    }
    
    // For now, use a static image as a placeholder for the video feed
    return (
      <div className="h-full w-full relative overflow-hidden animate-blur-in">
        <img 
          src={drone.imageUrl} 
          alt={drone.name} 
          className="h-full w-full object-cover"
        />
        
        {/* Simulate video overlay elements for realism */}
        <div className="absolute top-2 left-2 bg-black/30 px-2 py-1 rounded text-xs text-white backdrop-blur-xs">
          LIVE
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 overlay-gradient h-20 pointer-events-none" />
      </div>
    );
  };

  return (
    <div 
      className={cn(
        'rounded-xl overflow-hidden transition-all duration-300 ease-in-out',
        'border border-border',
        'relative bg-card',
        drone.status === 'inactive' ? 'opacity-80' : 'opacity-100',
        isMaximized ? 'col-span-full row-span-2 z-10' : '',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video feed */}
      <div className="feed-aspect-ratio w-full relative overflow-hidden">
        {renderVideoFeed()}
      </div>
      
      {/* Top status bar */}
      <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-center z-10">
        <StatusBadge status={drone.status} className="glass-card" />
        
        {onMaximize && (
          <button
            onClick={() => onMaximize(drone.id)}
            className="glass-card p-1 rounded-full opacity-70 hover:opacity-100 transition-opacity"
          >
            {isMaximized ? 
              <Minimize2 className="h-4 w-4 text-white" /> : 
              <Maximize2 className="h-4 w-4 text-white" />
            }
          </button>
        )}
      </div>
      
      {/* Bottom telemetry overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
        <TelemetryOverlay 
          drone={drone} 
          expanded={isHovered || isMaximized} 
        />
      </div>
    </div>
  );
};

export default DroneFeed;
