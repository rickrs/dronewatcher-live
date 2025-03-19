
import React from 'react';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: 'active' | 'inactive' | 'warning';
  className?: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-drone-active';
      case 'inactive':
        return 'bg-drone-inactive';
      case 'warning':
        return 'bg-drone-warning';
      default:
        return 'bg-muted';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active':
        return 'Online';
      case 'inactive':
        return 'Offline';
      case 'warning':
        return 'Warning';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={cn(
      'flex items-center gap-2 text-xs font-medium rounded-full px-2 py-1',
      'transition-all duration-300',
      status === 'active' ? 'text-white' : 'text-white',
      status === 'active' && 'animate-pulse-opacity',
      className
    )}>
      <span className={cn(
        'h-2 w-2 rounded-full',
        getStatusColor()
      )} />
      <span>{getStatusText()}</span>
    </div>
  );
};

export default StatusBadge;
