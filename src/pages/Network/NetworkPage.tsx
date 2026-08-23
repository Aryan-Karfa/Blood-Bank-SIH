import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SectionHeader, Badge, Button, DataRow } from '../../components/ui';
import { HospitalStatus } from '../../components/operational';
import { selectHospitalBedOccupancy } from '../../data/selectors';

export const NetworkPage: React.FC = () => {
  const { hospitals, network, inventory, requests, transfers, openDrawer } = useAppStore();

  const hospitalA = hospitals.find((h) => h.id === 'HOSP-A') || hospitals[0];
  const hospitalB = hospitals.find((h) => h.id === 'HOSP-B') || hospitals[1];
  const primaryCorridor = network.activeCorridors[0];

  const occupancyA = selectHospitalBedOccupancy(hospitalA);
  const occupancyB = selectHospitalBedOccupancy(hospitalB);

  const unitsA = inventory
    .filter((item) => item.hospitalId === 'HOSP-A')
    .reduce((sum, item) => sum + item.totalUnits, 0);

  const unitsB = inventory
    .filter((item) => item.hospitalId === 'HOSP-B')
    .reduce((sum, item) => sum + item.totalUnits, 0);

  const reqCountA = requests.filter((r) => r.hospitalId === 'HOSP-A' && r.status !== 'FULFILLED').length;
  const reqCountB = requests.filter((r) => r.hospitalId === 'HOSP-B' && r.status !== 'FULFILLED').length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Regional Hospital Network Matrix"
        subtitle="Live multi-node operational telemetry, bed capacity utilization, and inter-facility cold-chain corridors"
        badge={<Badge variant="outline">{hospitals.length} NODES SYNCHRONIZED</Badge>}
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              openDrawer('Network Coordination Model', 'INFO', {
                networkId: network.id,
                networkName: network.name,
                region: network.region,
                networkStatus: network.networkStatus,
                activeCorridorsCount: network.activeCorridors.length,
                totalTransfersLogged: transfers.length,
                lastSync: network.lastUpdated,
                isSynthetic: true,
              })
            }
          >
            INSPECT TOPOLOGY
          </Button>
        }
      />

      {/* Primary Logistics Transit Corridor */}
      {primaryCorridor && (
        <div className="p-4 bg-[#FFFFFF] border-2 border-[#171817] rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#3D3E3A]">
                ACTIVE TRANSIT CORRIDOR: {primaryCorridor.id}
              </span>
              <Badge variant="success" size="sm" isMono>
                {primaryCorridor.operationalStatus}
              </Badge>
            </div>
            <h2 className="text-base font-bold text-[#171817] uppercase tracking-wider mt-0.5">
              {hospitalB.shortName} (Metropolitan) ⟷ {hospitalA.shortName} (Central City)
            </h2>
            <p className="text-xs text-[#3D3E3A] mt-0.5 font-normal">
              {primaryCorridor.transitRouteDescription}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#F4F3EF] px-4 py-2 border border-[#C9C8C2] rounded-[2px] text-xs font-mono">
            <div>
              <span className="text-[10px] text-[#3D3E3A] block uppercase">Distance</span>
              <span className="font-bold text-[#171817]">{primaryCorridor.distanceKm} km</span>
            </div>
            <div className="w-[1px] h-6 bg-[#C9C8C2]" />
            <div>
              <span className="text-[10px] text-[#3D3E3A] block uppercase">Est. Transit</span>
              <span className="font-bold text-[#171817]">~{primaryCorridor.estimatedTransitMinutes} min</span>
            </div>
            <div className="w-[1px] h-6 bg-[#C9C8C2]" />
            <div>
              <span className="text-[10px] text-[#3D3E3A] block uppercase">Cold Chain</span>
              <span className="font-bold text-[#216E4E]">MONITORED</span>
            </div>
          </div>
        </div>
      )}

      {/* Hospital Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <HospitalStatus
            hospital={hospitalA}
            onSelect={() => openDrawer(`Hospital: ${hospitalA.name}`, 'INFO', hospitalA)}
          />
          {/* Dynamic Operational Summary */}
          <div className="p-3.5 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#3D3E3A] block">Bed Occupancy</span>
              <span className="font-mono font-bold text-sm text-[#171817]">
                {occupancyA.ratePercent}% ({occupancyA.occupied}/{occupancyA.total})
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#3D3E3A] block">Current Stock</span>
              <span className="font-mono font-bold text-sm text-[#171817]">{unitsA} Units</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#3D3E3A] block">Active Demands</span>
              <span className="font-mono font-bold text-sm text-[#BB0A1E]">{reqCountA} Orders</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <HospitalStatus
            hospital={hospitalB}
            onSelect={() => openDrawer(`Hospital: ${hospitalB.name}`, 'INFO', hospitalB)}
          />
          {/* Dynamic Operational Summary */}
          <div className="p-3.5 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#3D3E3A] block">Bed Occupancy</span>
              <span className="font-mono font-bold text-sm text-[#171817]">
                {occupancyB.ratePercent}% ({occupancyB.occupied}/{occupancyB.total})
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#3D3E3A] block">Current Stock</span>
              <span className="font-mono font-bold text-sm text-[#216E4E]">{unitsB} Units</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#3D3E3A] block">Active Demands</span>
              <span className="font-mono font-bold text-sm text-[#171817]">{reqCountB} Orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Contact & Blood Bank Administration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] space-y-3">
          <div className="flex items-center justify-between border-b border-[#C9C8C2] pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171817]">
              {hospitalA.shortName} Transfusion Center Administration
            </h3>
            <span className="font-mono text-[10px] text-[#3D3E3A]">{hospitalA.id}</span>
          </div>

          <div className="space-y-1 text-xs">
            <DataRow label="Officer-in-Charge" value={hospitalA.contact.bloodBankInCharge} />
            <DataRow label="Direct Phone" value={hospitalA.contact.phone} isMono />
            <DataRow label="Emergency Desk" value={hospitalA.contact.emergencyDesk} />
            <DataRow label="Official Email" value={hospitalA.contact.email} isMono />
          </div>
        </div>

        <div className="p-4 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] space-y-3">
          <div className="flex items-center justify-between border-b border-[#C9C8C2] pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171817]">
              {hospitalB.shortName} Transfusion Center Administration
            </h3>
            <span className="font-mono text-[10px] text-[#3D3E3A]">{hospitalB.id}</span>
          </div>

          <div className="space-y-1 text-xs">
            <DataRow label="Officer-in-Charge" value={hospitalB.contact.bloodBankInCharge} />
            <DataRow label="Direct Phone" value={hospitalB.contact.phone} isMono />
            <DataRow label="Emergency Desk" value={hospitalB.contact.emergencyDesk} />
            <DataRow label="Official Email" value={hospitalB.contact.email} isMono />
          </div>
        </div>
      </div>
    </div>
  );
};
