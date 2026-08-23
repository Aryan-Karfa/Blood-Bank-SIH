import React from 'react';
import { TransferRecord } from '../../types';
import { Badge, StatusDot } from '../ui';
import { cn, formatDateTime } from '../../lib/utils';

export interface TransferStatusProps {
  transfer: TransferRecord;
  onClick?: () => void;
  className?: string;
}

export const TransferStatus: React.FC<TransferStatusProps> = ({
  transfer,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-4 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] flex flex-col justify-between hover:border-[#9C9A91] transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#171817]">{transfer.transferId}</span>
            <Badge variant="info" size="sm">
              {transfer.units} Units {transfer.bloodGroup} {transfer.component}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#171817] mt-1.5 font-mono">
            <span>{transfer.sourceHospitalId}</span>
            <span className="text-[#5D5E5A] font-sans">→</span>
            <span>{transfer.destinationHospitalId}</span>
          </div>
        </div>

        <StatusDot status={transfer.status} size="sm" />
      </div>

      <div className="mt-3 py-2 px-2.5 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px] space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-[#5D5E5A] text-[10px] uppercase font-semibold">Courier</span>
          <span className="text-[#171817] font-medium">{transfer.chainOfCustody.transitCourier}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#5D5E5A] text-[10px] uppercase font-semibold">Cold Chain</span>
          <span className="text-[#216E4E] font-mono font-semibold text-[11px]">
            {transfer.coldChain.monitoredTempCelsius}°C ({transfer.coldChain.status})
          </span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-[#C9C8C2]/60 flex items-center justify-between text-[10px] font-mono text-[#5D5E5A]">
        <span>ETA: {formatDateTime(transfer.eta)}</span>
        <span>Logger: {transfer.coldChain.dataLoggerId}</span>
      </div>
    </div>
  );
};
