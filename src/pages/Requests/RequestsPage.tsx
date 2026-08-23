import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  SectionHeader,
  Badge,
  Button,
  Table,
  Column,
  Select,
  Input,
  StatusDot,
  Modal,
} from '../../components/ui';
import { BloodRequest } from '../../types';
import { formatDateTime } from '../../lib/utils';

export const RequestsPage: React.FC = () => {
  const { requests, activeHospitalId, openDrawer, allocateRequest, fulfillRequest } = useAppStore();
  const [urgencyFilter, setUrgencyFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Allocation modal state
  const [allocatingReq, setAllocatingReq] = useState<BloodRequest | null>(null);
  const [allocateUnitsCount, setAllocateUnitsCount] = useState<number>(1);
  const [actionFeedback, setActionFeedback] = useState<{ isError: boolean; message: string } | null>(null);

  const filteredRequests = requests.filter((req) => {
    if (activeHospitalId !== 'ALL' && req.hospitalId !== activeHospitalId) {
      return false;
    }
    if (urgencyFilter !== 'ALL' && req.urgency !== urgencyFilter) {
      return false;
    }
    if (statusFilter !== 'ALL' && req.status !== statusFilter) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        req.requestId.toLowerCase().includes(q) ||
        req.patientRef.toLowerCase().includes(q) ||
        req.requestingDepartment.toLowerCase().includes(q) ||
        req.clinicalIndication.toLowerCase().includes(q) ||
        req.bloodGroup.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenAllocate = (req: BloodRequest, e: React.MouseEvent) => {
    e.stopPropagation();
    setAllocatingReq(req);
    const unallocated = req.unitsRequested - req.unitsAllocated;
    setAllocateUnitsCount(Math.max(1, unallocated));
    setActionFeedback(null);
  };

  const handleConfirmAllocate = () => {
    if (!allocatingReq) return;
    const res = allocateRequest(allocatingReq.id, allocateUnitsCount);
    if (!res.success) {
      setActionFeedback({ isError: true, message: res.message });
    } else {
      setAllocatingReq(null);
    }
  };

  const handleFulfill = (req: BloodRequest, e: React.MouseEvent) => {
    e.stopPropagation();
    fulfillRequest(req.id);
  };

  const columns: Column<BloodRequest>[] = [
    {
      header: 'Request Code',
      accessorKey: 'requestId',
      width: 'w-24',
      cell: (req) => <span className="font-mono font-bold text-xs text-[#171817]">{req.requestId}</span>,
    },
    {
      header: 'Patient Ref',
      accessorKey: 'patientRef',
      width: 'w-28',
      cell: (req) => <span className="font-mono text-xs text-[#3D3E3A]">{req.patientRef}</span>,
    },
    {
      header: 'Facility Node',
      accessorKey: 'hospitalId',
      width: 'w-24',
      cell: (req) => <span className="font-mono text-xs font-semibold text-[#171817]">{req.hospitalId}</span>,
    },
    {
      header: 'Department & Clinical Indication',
      cell: (req) => (
        <div>
          <div className="font-bold text-xs text-[#171817]">{req.requestingDepartment}</div>
          <div className="text-[11px] text-[#3D3E3A]">{req.clinicalIndication}</div>
        </div>
      ),
    },
    {
      header: 'Component',
      cell: (req) => (
        <span className="font-mono font-bold text-xs">
          <span className="text-[#BB0A1E] font-bold">{req.bloodGroup}</span> {req.component}
        </span>
      ),
    },
    {
      header: 'Allocation Progress',
      align: 'right',
      cell: (req) => {
        const remaining = req.unitsRequested - req.unitsAllocated;
        return (
          <div className="text-right">
            <span className="font-mono text-xs font-bold text-[#171817]">
              {req.unitsAllocated} / {req.unitsRequested} u
            </span>
            {remaining > 0 && req.status !== 'FULFILLED' && (
              <span className="text-[10px] text-[#BB0A1E] block font-mono font-bold">
                ({remaining} u needed)
              </span>
            )}
          </div>
        );
      },
    },
    {
      header: 'Urgency',
      align: 'center',
      cell: (req) => (
        <Badge
          variant={
            req.urgency === 'EMERGENCY'
              ? 'critical'
              : req.urgency === 'URGENT'
              ? 'warning'
              : 'outline'
          }
          size="sm"
        >
          {req.urgency}
        </Badge>
      ),
    },
    {
      header: 'Required By',
      cell: (req) => (
        <span className="font-mono text-[11px] text-[#3D3E3A]">
          {formatDateTime(req.requiredBy)}
        </span>
      ),
    },
    {
      header: 'Status',
      align: 'center',
      cell: (req) => <StatusDot status={req.status} size="sm" />,
    },
    {
      header: 'Actions',
      align: 'right',
      cell: (req) => {
        if (req.status === 'FULFILLED') {
          return <span className="text-[10px] text-[#216E4E] font-mono font-semibold">COMPLETED</span>;
        }
        if (req.unitsAllocated < req.unitsRequested) {
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => handleOpenAllocate(req, e)}
              className="text-[10px]"
            >
              ALLOCATE
            </Button>
          );
        }
        return (
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => handleFulfill(req, e)}
            className="text-[10px]"
          >
            FULFILL
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Transfusion Demand &amp; Clinical Orders"
        subtitle="Operational request management linked directly to active inventory reservations and patient references"
        badge={
          <Badge variant="outline" isMono>
            {filteredRequests.length} ACTIVE ORDERS
          </Badge>
        }
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setUrgencyFilter('ALL');
              setStatusFilter('ALL');
              setSearchQuery('');
            }}
          >
            RESET FILTERS
          </Button>
        }
      />

      {/* FILTER BAR */}
      <div className="p-4 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          label="Search Requests"
          placeholder="Filter by ID, patient ref, department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select
          label="Urgency Filter"
          value={urgencyFilter}
          onChange={(e) => setUrgencyFilter(e.target.value)}
          options={[
            { value: 'ALL', label: 'All Urgencies' },
            { value: 'EMERGENCY', label: 'Emergency Only' },
            { value: 'URGENT', label: 'Urgent Only' },
            { value: 'ROUTINE', label: 'Routine Only' },
          ]}
        />

        <Select
          label="Status Filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: 'ALL', label: 'All Statuses' },
            { value: 'PENDING', label: 'Pending' },
            { value: 'PARTIALLY_ALLOCATED', label: 'Partially Allocated' },
            { value: 'ALLOCATED', label: 'Allocated' },
            { value: 'FULFILLED', label: 'Fulfilled' },
          ]}
        />
      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        data={filteredRequests}
        keyExtractor={(req) => req.id}
        onRowClick={(req) =>
          openDrawer(`Transfusion Request: ${req.requestId}`, 'REQUEST', req)
        }
      />

      {/* ALLOCATE MODAL */}
      <Modal
        isOpen={!!allocatingReq}
        onClose={() => setAllocatingReq(null)}
        title={`Allocate Stock for ${allocatingReq?.requestId}`}
        subtitle={`${allocatingReq?.bloodGroup} ${allocatingReq?.component} • ${allocatingReq?.patientRef}`}
        footerActions={
          <>
            <Button variant="outline" size="sm" onClick={() => setAllocatingReq(null)}>
              CANCEL
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmAllocate}>
              COMMIT RESERVATION
            </Button>
          </>
        }
      >
        {allocatingReq && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px] space-y-1">
              <div>• Requesting Ward: <strong>{allocatingReq.requestingDepartment}</strong></div>
              <div>• Clinical Indication: {allocatingReq.clinicalIndication}</div>
              <div>• Units Requested: <strong>{allocatingReq.unitsRequested}</strong> | Already Allocated: <strong>{allocatingReq.unitsAllocated}</strong></div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold uppercase text-[11px] text-[#3D3E3A] block">
                Units to Allocate Now
              </label>
              <input
                type="number"
                min={1}
                max={allocatingReq.unitsRequested - allocatingReq.unitsAllocated}
                value={allocateUnitsCount}
                onChange={(e) => setAllocateUnitsCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full h-9 px-3 border border-[#C9C8C2] rounded-[4px] font-mono text-sm text-[#171817] bg-[#FFFFFF]"
              />
            </div>

            {actionFeedback && (
              <p className="text-[#BB0A1E] text-[11px] font-medium bg-[#FEF3F2] p-2 border border-[#FECDCA] rounded-[2px]">
                {actionFeedback.message}
              </p>
            )}

            <p className="text-[11px] text-[#3D3E3A]">
              Committing reservation immediately reduces available stock in the facility inventory ledger and creates an immutable audit record.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};
