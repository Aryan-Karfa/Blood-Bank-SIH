import React from 'react';
import { Hospital } from '../../types';
import { Badge, StatusDot } from '../ui';
import { cn } from '../../lib/utils';

export interface HospitalStatusProps {
  hospital: Hospital;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export const HospitalStatus: React.FC<HospitalStatusProps> = ({
  hospital,
  isSelected = false,
  onSelect,
  className = '',
}) => {
  const occupancyPercent = Math.round((hospital.occupiedBeds / hospital.bedCapacity) * 100);

  return (
    <div
      onClick={onSelect}
      className={cn(
        'p-4 bg-[#FFFFFF] border rounded-[4px] flex flex-col justify-between transition-colors',
        isSelected ? 'border-2 border-[#171817] bg-[#F4F3EF]' : 'border-[#C9C8C2] hover:border-[#9C9A91]',
        onSelect && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#3D3E3A]">{hospital.id}</span>
            <Badge variant="outline" size="sm">
              {hospital.category}
            </Badge>
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#171817] mt-1">
            {hospital.name} ({hospital.shortName})
          </h3>
          <p className="text-xs text-[#3D3E3A] mt-0.5">{hospital.location.address}</p>
        </div>

        <StatusDot status={hospital.status} />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#C9C8C2]/60 text-xs">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#3D3E3A] block">Bed Capacity</span>
          <span className="font-mono font-semibold text-[#171817]">
            {hospital.bedCapacity} Total Beds
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#3D3E3A] block">Occupancy Rate</span>
          <span className="font-mono font-semibold text-[#171817]">
            {occupancyPercent}% ({hospital.occupiedBeds} Beds)
          </span>
        </div>
      </div>
    </div>
  );
};
