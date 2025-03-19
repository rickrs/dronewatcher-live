
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface HeaderProps {
  className?: string;
  activeDrones: number;
  totalDrones: number;
  onAddDrone?: () => void;
  onRemoveDrone?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  className,
  activeDrones,
  totalDrones,
  onAddDrone,
  onRemoveDrone,
}) => {
  const isMobile = useIsMobile();
  
  return (
    <header 
      className={cn(
        'glass-panel rounded-xl mb-4 p-4',
        'flex items-center justify-between',
        className
      )}
    >
      <div className="flex items-center">
        <h1 className="text-xl font-semibold mr-4">Drone Surveillance</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {activeDrones} active / {totalDrones} total
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {!isMobile && (
          <div className="text-xs text-muted-foreground mr-2">
            {new Date().toLocaleString()}
          </div>
        )}
        
        <button
          onClick={onAddDrone}
          className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm transition-colors hover:bg-accent/80"
        >
          <PlusCircle className="h-4 w-4" />
          {!isMobile && <span>Add Drone</span>}
        </button>
        
        {totalDrones > 1 && (
          <button
            onClick={onRemoveDrone}
            className="flex items-center gap-1 rounded-lg bg-destructive px-3 py-1.5 text-sm transition-colors hover:bg-destructive/80"
          >
            <MinusCircle className="h-4 w-4" />
            {!isMobile && <span>Remove</span>}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
