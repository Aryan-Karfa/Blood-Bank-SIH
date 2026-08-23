import React from 'react';
import { Hospital } from '../../types';
import { Badge, StatusDot } from '../ui';
import { cn } from '../../lib/utils';

export interface NetworkNodeProps {
  hospital: Hospital;
  connectedHospital?: Hospital;
  onSelect?: () => void;
  className?: string;
}

export const NetworkNode: React.FC<NetworkNodeProps> = ({
  hospital,
  connectedHospital,
  onSelect,
  className = '',
}) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'p-4 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] space-y-3 hover:border-[#9C9A91] transition-colors',
        onSelect && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#171817]">{hospital.id}</span>
            <Badge variant="outline" size="sm">
              Node Active
            </Badge>
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#171817] mt-1">
            {hospital.name}
          </h3>
          <p className="text-xs text-[#3D3E3A]">{hospital.location.city}, {hospital.location.state}</p>
        </div>

        <StatusDot status={hospital.status} />
      </div>

      {connectedHospital && (
        <div className="p-2.5 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px] text-xs">
          <div className="text-[10px] uppercase font-bold text-[#3D3E3A] mb-1">
            Inter-Node Transit Channel
          </div>
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-[#171817]">{hospital.shortName} ↔ {connectedHospital.shortName}</span>
            <span className="text-[#171817] font-bold">
              {hospital.transitDistanceKmToB} km • ~{hospital.transitTimeMinToB} min
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
