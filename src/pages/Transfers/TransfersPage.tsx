import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SectionHeader, Badge, Button, Table, Column, StatusDot } from '../../components/ui';
import { TransferRecord } from '../../types';
import { formatDateTime } from '../../lib/utils';

export const TransfersPage: React.FC = () => {
  const { transfers, dispatchTransfer, receiveTransfer, openDrawer } = useAppStore();

  const columns: Column<TransferRecord>[] = [
    {
      header: 'Transfer ID',
      accessorKey: 'transferId',
      width: 'w-28',
      cell: (t) => <span className="font-mono font-bold text-xs text-[#171817]">{t.transferId}</span>,
    },
    {
      header: 'Route (Source → Destination)',
      cell: (t) => (
        <span className="font-mono font-bold text-xs text-[#171817]">
          {t.sourceHospitalId} → {t.destinationHospitalId}
        </span>
      ),
    },
    {
      header: 'Blood Units',
      cell: (t) => (
        <span className="font-mono font-bold text-xs">
          {t.units} × <span className="text-[#BB0A1E] font-bold">{t.bloodGroup}</span> {t.component}
        </span>
      ),
    },
    {
      header: 'Cold-Chain Telemetry (Simulated)',
      cell: (t) => (
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-xs text-[#216E4E]">
            {t.coldChain.monitoredTempCelsius}°C
          </span>
          <Badge
            variant={
              t.coldChain.status === 'COMPLIANT'
                ? 'success'
                : t.coldChain.status === 'WARNING'
                ? 'warning'
                : 'critical'
            }
            size="sm"
            isMono
          >
            {t.coldChain.status}
          </Badge>
        </div>
      ),
    },
    {
      header: 'Courier Logistics',
      accessorKey: 'chainOfCustody',
      cell: (t) => <span className="text-xs text-[#3D3E3A] font-medium">{t.chainOfCustody.transitCourier}</span>,
    },
    {
      header: 'Estimated Arrival',
      cell: (t) => (
        <span className="font-mono text-[11px] text-[#171817]">
          {formatDateTime(t.eta)}
        </span>
      ),
    },
    {
      header: 'Status',
      align: 'center',
      cell: (t) => <StatusDot status={t.status} size="sm" />,
    },
    {
      header: 'Actions',
      align: 'right',
      cell: (t) => {
        if (t.status === 'APPROVED' || t.status === 'PROPOSED') {
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                dispatchTransfer(t.id);
              }}
              className="text-[10px]"
            >
              DISPATCH
            </Button>
          );
        }
        if (t.status === 'IN_TRANSIT' || t.status === 'DISPATCHED') {
          return (
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                receiveTransfer(t.id);
              }}
              className="text-[10px]"
            >
              RECEIVE &amp; RECONCILE
            </Button>
          );
        }
        return (
          <span className="text-[10px] text-[#216E4E] font-mono font-semibold">
            ✓ RECEIVED
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Inter-Hospital Logistical Transfer Tracking"
        subtitle="Active cold-chain logistics, chain-of-custody verification, and real-time transit telemetry"
        badge={
          <Badge variant="info" isMono>
            {transfers.length} LOGGED TRANSFERS
          </Badge>
        }
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              openDrawer('Cold-Chain Sensor Protocol', 'INFO', {
                temperatureBand: '2.0°C to 6.0°C Strict Compliance',
                samplingInterval: 'Every 60 Seconds via IoT Logger (Simulated Mode)',
                courierFleet: 'MedExpress Cold Van #04 with Onboard Refrigerator & GPS',
                isSimulated: true,
              })
            }
          >
            SENSOR TELEMETRY
          </Button>
        }
      />

      {/* TRANSFERS TABLE */}
      <Table
        columns={columns}
        data={transfers}
        keyExtractor={(t) => t.id}
        onRowClick={(t) =>
          openDrawer(`Transfer: ${t.transferId}`, 'TRANSFER', {
            transferId: t.transferId,
            sourceHospitalId: t.sourceHospitalId,
            destinationHospitalId: t.destinationHospitalId,
            bloodGroup: t.bloodGroup,
            component: t.component,
            units: t.units,
            status: t.status,
            requestedAt: t.requestedAt,
            approvedAt: t.approvedAt,
            dispatchedAt: t.dispatchedAt,
            eta: t.eta,
            receivedAt: t.receivedAt,
            coldChainLog: t.coldChain,
            chainOfCustody: t.chainOfCustody,
            reason: t.reason,
            isSynthetic: t.isSynthetic,
          })
        }
      />
    </div>
  );
};
