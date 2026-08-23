import React from 'react';
import { BloodRequest } from '../../types';
import { Badge, StatusDot } from '../ui';
import { cn, formatDateTime } from '../../lib/utils';

export interface RequestStatusProps {
  request: BloodRequest;
  onClick?: () => void;
  className?: string;
}

export const RequestStatus: React.FC<RequestStatusProps> = ({
  request,
  onClick,
  className = '',
}) => {
  const isEmergency = request.urgency === 'EMERGENCY';
  const isUrgent = request.urgency === 'URGENT';

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-3.5 bg-[#FFFFFF] border rounded-[4px] flex flex-col justify-between transition-colors hover:border-[#9C9A91]',
        isEmergency
          ? 'border-l-4 border-l-[#B42318] border-[#C9C8C2]'
          : isUrgent
          ? 'border-l-4 border-l-[#A15C00] border-[#C9C8C2]'
          : 'border-[#C9C8C2]',
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-bold text-[#171817]">{request.requestId}</span>
            <Badge variant={isEmergency ? 'critical' : isUrgent ? 'warning' : 'outline'} size="sm">
              {request.urgency}
            </Badge>
            <span className="text-[10px] font-mono text-[#5D5E5A]">[{request.hospitalId}]</span>
          </div>
          <h4 className="text-xs font-bold text-[#171817] mt-1 truncate max-w-sm">
            {request.requestingDepartment}
          </h4>
          <p className="text-[11px] text-[#5D5E5A] mt-0.5">{request.clinicalIndication}</p>
        </div>

        <StatusDot status={request.status} size="sm" />
      </div>

      <div className="mt-3 pt-2 border-t border-[#C9C8C2]/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[#171817] px-1.5 py-0.5 bg-[#EAE9E4] rounded-[2px]">
            {request.bloodGroup}
          </span>
          <span className="text-xs text-[#5D5E5A] font-medium">{request.component}</span>
        </div>

        <div className="font-mono text-[11px] text-[#171817]">
          <span>{request.unitsAllocated}</span>
          <span className="text-[#5D5E5A]"> / </span>
          <span className="font-bold">{request.unitsRequested} Units</span>
        </div>
      </div>

      <div className="mt-2 text-[10px] font-mono text-[#5D5E5A] flex justify-between">
        <span>Req: {formatDateTime(request.requestedAt)}</span>
        <span>Required: {formatDateTime(request.requiredBy)}</span>
      </div>
    </div>
  );
};
