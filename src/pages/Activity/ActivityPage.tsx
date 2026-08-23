import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SectionHeader, Badge, Button, Table, Column, Select } from '../../components/ui';
import { AuditEvent } from '../../types';
import { formatDateTime } from '../../lib/utils';

export const ActivityPage: React.FC = () => {
  const { auditEvents, openDrawer } = useAppStore();
  const [actorFilter, setActorFilter] = useState<string>('ALL');

  const filteredEvents = auditEvents.filter((log) => {
    if (actorFilter === 'ALL') return true;
    if (actorFilter === 'AI') {
      return log.action.startsWith('AI_') || log.actorId?.includes('GEMINI') || log.actorId?.includes('AI_GATEWAY');
    }
    if (actorFilter === 'SIMULATION') {
      return log.action.startsWith('SIMULATION_') || log.action === 'RISK_RECALCULATED';
    }
    return log.actorType === actorFilter;
  });

  const columns: Column<AuditEvent>[] = [
    {
      header: 'Audit Code',
      accessorKey: 'auditCode',
      width: 'w-32',
      cell: (log) => <span className="font-mono font-bold text-xs text-[#171817]">{log.auditCode}</span>,
    },
    {
      header: 'Timestamp',
      cell: (log) => (
        <span className="font-mono text-[11px] text-[#3D3E3A] font-medium">
          {formatDateTime(log.timestamp)}
        </span>
      ),
    },
    {
      header: 'Actor & Principal',
      cell: (log) => (
        <div className="flex items-center gap-2">
          <Badge
            variant={
              log.actorType === 'SYSTEM'
                ? 'info'
                : log.actorType === 'OPERATOR'
                ? 'warning'
                : 'success'
            }
            size="sm"
            isMono
          >
            {log.actorType}
          </Badge>
          <span className="font-mono text-xs text-[#171817] font-semibold">{log.actorId}</span>
        </div>
      ),
    },
    {
      header: 'Action Type',
      align: 'center',
      cell: (log) => (
        <Badge variant="outline" size="sm" isMono>
          {log.action}
        </Badge>
      ),
    },
    {
      header: 'Event Summary',
      accessorKey: 'summary',
      cell: (log) => <span className="text-xs text-[#171817] font-medium">{log.summary}</span>,
    },
    {
      header: 'State Transition',
      cell: (log) => (
        <span className="font-mono text-[10px] text-[#3D3E3A]">
          {log.previousState || 'NONE'} →{' '}
          <strong className="text-[#171817]">{log.newState || 'COMMITTED'}</strong>
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Immutable Operational Audit Ledger"
        subtitle="Chronological, single-source-of-truth record of every demand surge, risk detection, operator authorization, and cold-chain transfer"
        badge={
          <Badge variant="outline" isMono>
            {auditEvents.length} TOTAL AUDIT EVENTS
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Select
              value={actorFilter}
              onChange={(e) => setActorFilter(e.target.value)}
              options={[
                { value: 'ALL', label: 'All Audit Events' },
                { value: 'AI', label: 'AI & Intelligence Events' },
                { value: 'SIMULATION', label: 'Simulation Clock Ticks' },
                { value: 'OPERATOR', label: 'Human Operator Actions' },
                { value: 'LOGISTICS', label: 'Logistics Courier' },
                { value: 'SYSTEM', label: 'System Automatic' },
              ]}
              className="h-8 text-xs"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                openDrawer('Audit Ledger Merkle Verification', 'INFO', {
                  totalEventsCount: auditEvents.length,
                  merkleRootHash:
                    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 (Demonstrative)',
                  complianceStandard:
                    'Healthcare Operations Recordkeeping & Traceability Specification 2026',
                  immutabilityStatus: 'APPEND_ONLY_ENFORCED',
                  isSynthetic: true,
                })
              }
            >
              VERIFY AUDIT ROOT
            </Button>
          </div>
        }
      />

      {/* AUDIT TABLE */}
      <Table
        columns={columns}
        data={filteredEvents}
        keyExtractor={(log) => log.id}
        onRowClick={(log) =>
          openDrawer(`Audit Record: ${log.auditCode}`, 'AUDIT', {
            auditCode: log.auditCode,
            timestamp: log.timestamp,
            actorType: log.actorType,
            actorId: log.actorId,
            action: log.action,
            entityType: log.entityType,
            entityId: log.entityId,
            previousState: log.previousState,
            newState: log.newState,
            summary: log.summary,
            reason: log.reason,
            isSynthetic: log.isSynthetic,
          })
        }
      />
    </div>
  );
};
