import React from 'react';
import { AuditEvent } from '../../types';
import { Badge } from '../ui';
import { cn, formatDateTime } from '../../lib/utils';

export interface AuditEventItemProps {
  event: AuditEvent;
  onClick?: () => void;
  className?: string;
}

export const AuditEventItem: React.FC<AuditEventItemProps> = ({
  event,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-3 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] flex flex-col gap-1.5 hover:border-[#9C9A91] transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[11px] text-[#171817]">{event.auditCode}</span>
          <Badge variant="outline" size="sm" isMono>
            {event.action}
          </Badge>
        </div>
        <span className="font-mono text-[10px] text-[#5D5E5A]">{formatDateTime(event.timestamp)}</span>
      </div>

      <p className="text-xs text-[#171817] font-medium leading-normal">{event.summary}</p>

      <div className="pt-1.5 border-t border-[#C9C8C2]/60 flex items-center justify-between text-[10px] text-[#5D5E5A]">
        <span>
          Actor: <strong className="text-[#171817] font-mono font-normal">{event.actorId}</strong>
        </span>
        <span>
          Entity: <strong className="text-[#171817] font-mono font-normal">{event.entityType}:{event.entityId}</strong>
        </span>
      </div>
    </div>
  );
};
