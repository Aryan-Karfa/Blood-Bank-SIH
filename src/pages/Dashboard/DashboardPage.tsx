import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import {
  selectTotalNetworkUnits,
  selectAvailableUnits,
  selectReservedUnits,
  selectCriticalRiskCount,
  selectActiveRequestsCount,
  selectPendingRecommendationsCount,
  selectActiveTransfersCount,
  selectHospitalInventory,
  selectHospitalRequests,
  selectHospitalRisks,
} from '../../data/selectors';
import {
  Metric,
  SectionHeader,
  Button,
  Badge,
  Table,
  Column,
} from '../../components/ui';
import {
  RiskIndicator,
  RecommendationPreview,
  InventoryIndicator,
} from '../../components/operational';
import { BloodRequest } from '../../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    inventory,
    requests,
    risks,
    recommendations,
    transfers,
    auditEvents,
    hospitals,
    activeHospitalId,
    openDrawer,
    approveRecommendation,
  } = useAppStore();

  // Derived metrics from live shared state
  const totalUnits = selectTotalNetworkUnits(inventory);
  const availableUnits = selectAvailableUnits(inventory);
  const reservedUnits = selectReservedUnits(inventory);
  const criticalRisksCount = selectCriticalRiskCount(risks);
  const activeRequestsCount = selectActiveRequestsCount(requests);
  const pendingRecsCount = selectPendingRecommendationsCount(recommendations);
  const activeTransfersCount = selectActiveTransfersCount(transfers);

  // Hospital-filtered views
  const filteredInventory = selectHospitalInventory(inventory, activeHospitalId);
  const filteredRequests = selectHospitalRequests(requests, activeHospitalId);
  const filteredRisks = selectHospitalRisks(risks, activeHospitalId);

  const requestColumns: Column<BloodRequest>[] = [
    {
      header: 'Request Code',
      accessorKey: 'requestId',
      width: 'w-24',
      cell: (req) => <span className="font-mono font-bold text-xs text-[#171817]">{req.requestId}</span>,
    },
    {
      header: 'Hospital',
      accessorKey: 'hospitalId',
      width: 'w-24',
      cell: (req) => <span className="font-mono text-xs font-semibold text-[#171817]">{req.hospitalId}</span>,
    },
    {
      header: 'Department / Indication',
      cell: (req) => (
        <div>
          <div className="font-bold text-xs text-[#171817]">{req.requestingDepartment}</div>
          <div className="text-[11px] text-[#3D3E3A]">{req.clinicalIndication}</div>
        </div>
      ),
    },
    {
      header: 'Patient Ref',
      accessorKey: 'patientRef',
      width: 'w-28',
      cell: (req) => <span className="font-mono text-[11px] text-[#3D3E3A]">{req.patientRef}</span>,
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
      header: 'Allocation',
      align: 'right',
      cell: (req) => (
        <span className="font-mono text-xs">
          <strong className="text-[#171817]">{req.unitsAllocated}</strong>
          <span className="text-[#3D3E3A]"> / {req.unitsRequested} u</span>
        </span>
      ),
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
      header: 'Status',
      align: 'center',
      cell: (req) => (
        <Badge
          variant={
            req.status === 'FULFILLED'
              ? 'success'
              : req.status === 'ALLOCATED'
              ? 'info'
              : req.status === 'PARTIALLY_ALLOCATED'
              ? 'warning'
              : 'neutral'
          }
          size="sm"
        >
          {req.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* OPERATIONS HEADER */}
      <div className="bg-[#FFFFFF] p-4 sm:p-5 border border-[#C9C8C2] rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#3D3E3A]">
              OPERATIONS COMMAND
            </span>
            <Badge variant="outline" size="sm" isMono>
              ACTIVE NODE: {activeHospitalId}
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#171817] mt-1">
            Regional Blood Network Operations
          </h1>
          <p className="text-xs text-[#3D3E3A] mt-0.5">
            Single shared operational state synchronized across Central City General (HOSP-A) and Metropolitan Medical (HOSP-B).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="secondary" size="sm" onClick={() => navigate('/app/network')}>
            NETWORK MATRIX ({hospitals.length})
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/app/recommendations')}
          >
            ACTIVE RECOMMENDATIONS ({pendingRecsCount})
          </Button>
        </div>
      </div>

      {/* DERIVED NETWORK SNAPSHOT METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <Metric
          label="Total Inventory"
          value={totalUnits}
          unit="Total Units"
          subtext={`Available: ${availableUnits} • Reserved: ${reservedUnits}`}
          highlight="none"
        />
        <Metric
          label="Active Transfusion Orders"
          value={activeRequestsCount}
          unit="Active Requests"
          subtext="Emergency & Urgent ward demands"
          highlight={activeRequestsCount > 0 ? 'warning' : 'none'}
        />
        <Metric
          label="Critical Shortage Threats"
          value={criticalRisksCount}
          unit="Threats Active"
          subtext={criticalRisksCount > 0 ? 'Shortage predicted in <24h' : 'Zero critical deficits'}
          highlight={criticalRisksCount > 0 ? 'critical' : 'none'}
          statusBadge={
            criticalRisksCount > 0 ? (
              <Badge variant="critical">CRITICAL</Badge>
            ) : (
              <Badge variant="success">STABLE</Badge>
            )
          }
        />
        <Metric
          label="Active Logistics In-Transit"
          value={activeTransfersCount}
          unit="Transfers"
          subtext="Cold-chain verified transport"
          highlight="info"
          statusBadge={<Badge variant="info">DISPATCHED</Badge>}
        />
      </div>

      {/* PRIMARY OPERATIONAL GRID: 2 COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: ACTIVE RISKS & INVENTORY (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Risks Section */}
          <div className="space-y-3">
            <SectionHeader
              title="Active Operational Risk Conditions"
              subtitle="Derived from current unreserved stock vs 24h/48h projected clinical demand"
              badge={
                <Badge variant={filteredRisks.length > 0 ? 'critical' : 'success'} size="sm" isMono>
                  {filteredRisks.length} ACTIVE
                </Badge>
              }
              actions={
                <Button variant="subtle" size="sm" onClick={() => navigate('/app/risks')}>
                  VIEW RISK MATRIX →
                </Button>
              }
            />

            <div className="space-y-3">
              {filteredRisks.length === 0 ? (
                <div className="p-6 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] text-center text-xs text-[#3D3E3A]">
                  No active risk conditions detected for the selected node.
                </div>
              ) : (
                filteredRisks.map((risk) => (
                  <RiskIndicator
                    key={risk.id}
                    risk={risk}
                    onReview={() => navigate('/app/recommendations')}
                  />
                ))
              )}
            </div>
          </div>

          {/* Network Inventory Snapshot */}
          <div className="space-y-3">
            <SectionHeader
              title="Blood Availability &amp; Safety Thresholds"
              subtitle="Stock breakdown: Total Units = Available + Reserved + In-Transit"
              actions={
                <Button variant="subtle" size="sm" onClick={() => navigate('/app/inventory')}>
                  FULL INVENTORY LEDGER →
                </Button>
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredInventory.slice(0, 4).map((item) => (
                <InventoryIndicator
                  key={item.id}
                  item={item}
                  onClick={() => openDrawer(`Inventory: ${item.bloodGroup} ${item.component}`, 'INVENTORY', item)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RECOMMENDATIONS & AUDIT ACTIVITY (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Decision Support Recommendations */}
          <div className="space-y-3">
            <SectionHeader
              title="Decision Support Transfer Action"
              subtitle="Grounded in surplus-deficit mathematical matching"
              badge={<Badge variant="info">OPTIMIZED MATCH</Badge>}
            />

            {recommendations.filter((r) => r.status === 'PENDING_REVIEW').length === 0 ? (
              <div className="p-6 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] text-center text-xs text-[#3D3E3A]">
                All pending recommendations have been reviewed.
              </div>
            ) : (
              recommendations
                .filter((r) => r.status === 'PENDING_REVIEW')
                .map((rec) => (
                  <RecommendationPreview
                    key={rec.id}
                    recommendation={rec}
                    onApprove={(id) => {
                      approveRecommendation(id);
                      navigate('/app/transfers');
                    }}
                    onReject={() => {}}
                    onViewDetails={() =>
                      openDrawer(`Recommendation: ${rec.recommendationCode}`, 'RECOMMENDATION', rec)
                    }
                  />
                ))
            )}
          </div>

          {/* Chronological Audit Activity Snapshot */}
          <div className="p-4 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] space-y-3">
            <div className="flex items-center justify-between border-b border-[#C9C8C2] pb-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#171817]">
                  Operational Audit Trail
                </h3>
                <p className="text-[10px] text-[#3D3E3A]">Live immutable event log</p>
              </div>
              <Button variant="subtle" size="sm" onClick={() => navigate('/app/activity')}>
                ALL LOGS ({auditEvents.length}) →
              </Button>
            </div>

            <div className="space-y-2.5 text-xs divide-y divide-[#C9C8C2]/40">
              {auditEvents.slice(0, 4).map((log) => (
                <div key={log.id} className="pt-2 first:pt-0">
                  <div className="flex justify-between font-mono text-[10px] text-[#3D3E3A]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#171817]">{log.auditCode}</span>
                      <Badge variant="outline" size="sm" isMono>
                        {log.actorType}
                      </Badge>
                    </div>
                    <span className="text-[#171817] font-medium">{log.timestamp.slice(11, 19)}</span>
                  </div>
                  <p className="text-xs text-[#171817] mt-1 font-medium">{log.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: ACTIVE TRANSFUSION REQUESTS TABLE */}
      <div className="space-y-3">
        <SectionHeader
          title="Active Transfusion Orders"
          subtitle="Clinical orders from emergency trauma, surgical theaters, and inpatient wards"
          actions={
            <Button variant="subtle" size="sm" onClick={() => navigate('/app/requests')}>
              ALL ORDERS ({filteredRequests.length}) →
            </Button>
          }
        />

        <Table
          columns={requestColumns}
          data={filteredRequests}
          keyExtractor={(req) => req.id}
          onRowClick={(req) => openDrawer(`Request: ${req.requestId}`, 'REQUEST', req)}
        />
      </div>
    </div>
  );
};
