import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  SectionHeader,
  Badge,
  Button,
  Table,
  Column,
  Select,
  StatusDot,
  Input,
} from '../../components/ui';
import { InventoryItem } from '../../types';
import { BLOOD_GROUPS, BLOOD_COMPONENTS } from '../../lib/constants';
import { selectLotsForInventoryItem } from '../../data/selectors';

export const InventoryPage: React.FC = () => {
  const { inventory, inventoryLots, activeHospitalId, openDrawer } = useAppStore();
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedComponent, setSelectedComponent] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = inventory.filter((item) => {
    if (activeHospitalId !== 'ALL' && item.hospitalId !== activeHospitalId) {
      return false;
    }
    if (selectedGroup !== 'ALL' && item.bloodGroup !== selectedGroup) {
      return false;
    }
    if (selectedComponent !== 'ALL' && item.component !== selectedComponent) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.id.toLowerCase().includes(q) ||
        item.bloodGroup.toLowerCase().includes(q) ||
        item.component.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const columns: Column<InventoryItem>[] = [
    {
      header: 'Inventory ID',
      accessorKey: 'id',
      width: 'w-32',
      cell: (item) => <span className="font-mono font-bold text-xs text-[#171817]">{item.id}</span>,
    },
    {
      header: 'Facility Node',
      accessorKey: 'hospitalId',
      width: 'w-24',
      cell: (item) => <span className="font-mono text-xs font-semibold text-[#171817]">{item.hospitalId}</span>,
    },
    {
      header: 'Blood Group',
      align: 'center',
      cell: (item) => (
        <span className="font-mono font-bold text-xs px-2 py-0.5 bg-[#EAE9E4] rounded-[2px] text-[#BB0A1E]">
          {item.bloodGroup}
        </span>
      ),
    },
    {
      header: 'Component',
      accessorKey: 'component',
      cell: (item) => <span className="font-medium text-xs text-[#171817]">{item.component}</span>,
    },
    {
      header: 'Total Stock',
      align: 'right',
      cell: (item) => (
        <span className="font-mono font-bold text-xs text-[#171817]">
          {item.totalUnits} u
        </span>
      ),
    },
    {
      header: 'Reserved',
      align: 'right',
      cell: (item) => (
        <span className="font-mono text-xs text-[#3D3E3A]">
          {item.reservedUnits} u
        </span>
      ),
    },
    {
      header: 'In-Transit',
      align: 'right',
      cell: (item) => (
        <span className="font-mono text-xs text-[#3D3E3A]">
          {item.inTransitUnits > 0 ? (
            <span className="text-[#245B73] font-bold">{item.inTransitUnits} u</span>
          ) : (
            '0 u'
          )}
        </span>
      ),
    },
    {
      header: 'Available Stock',
      align: 'right',
      cell: (item) => (
        <span className="font-mono font-bold text-sm text-[#171817]">
          {item.availableUnits} u
        </span>
      ),
    },
    {
      header: 'Min Safety Buffer',
      align: 'right',
      cell: (item) => (
        <span className="font-mono text-xs text-[#3D3E3A]">{item.minimumThreshold} u</span>
      ),
    },
    {
      header: 'Near-Expiry (<48h)',
      align: 'center',
      cell: (item) =>
        item.nearExpiryUnits > 0 ? (
          <Badge variant="warning" size="sm" isMono>
            {item.nearExpiryUnits} Units
          </Badge>
        ) : (
          <span className="text-[11px] text-[#3D3E3A]">0 Units</span>
        ),
    },
    {
      header: 'Derived Status',
      align: 'center',
      cell: (item) => <StatusDot status={item.status} size="sm" />,
    },
  ];

  const handleRowClick = (item: InventoryItem) => {
    const itemLots = selectLotsForInventoryItem(inventoryLots, item.id);
    openDrawer(
      `Inventory Item: ${item.bloodGroup} ${item.component} (${item.hospitalId})`,
      'INVENTORY',
      {
        inventoryRecord: {
          id: item.id,
          hospitalId: item.hospitalId,
          bloodGroup: item.bloodGroup,
          component: item.component,
          totalUnits: item.totalUnits,
          reservedUnits: item.reservedUnits,
          inTransitUnits: item.inTransitUnits,
          availableUnits: item.availableUnits,
          minimumSafetyThreshold: item.minimumThreshold,
          criticalThreshold: item.criticalThreshold,
          averageDailyDemand: item.averageDailyDemand,
          status: item.status,
          isSynthetic: item.isSynthetic,
          lastUpdated: item.lastUpdated,
        },
        shelfLifeBreakdown: item.expiryBreakdown,
        associatedLots: itemLots.map((lot) => ({
          lotNumber: lot.lotNumber,
          units: lot.units,
          collectionDate: lot.collectionDate,
          expiryDate: lot.expiryDate,
          storageStatus: lot.storageStatus,
          temperatureStatus: lot.temperatureStatus,
          storageLocation: lot.storageLocation,
        })),
      }
    );
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Blood Component Inventory Ledger"
        subtitle="Granular batch-level inventory tracking: Total Units = Available + Reserved + In-Transit"
        badge={
          <Badge variant="outline" isMono>
            {filteredItems.length} COMPONENT ROWS
          </Badge>
        }
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSelectedGroup('ALL');
              setSelectedComponent('ALL');
              setSearchQuery('');
            }}
          >
            RESET FILTERS
          </Button>
        }
      />

      {/* FILTER CONTROLS */}
      <div className="p-4 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          label="Search Units"
          placeholder="Filter by ID, blood group, component..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select
          label="Blood Group Filter"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          options={[
            { value: 'ALL', label: 'All Blood Groups' },
            ...BLOOD_GROUPS.map((g) => ({ value: g, label: `Group ${g}` })),
          ]}
        />

        <Select
          label="Component Type"
          value={selectedComponent}
          onChange={(e) => setSelectedComponent(e.target.value)}
          options={[
            { value: 'ALL', label: 'All Blood Components' },
            ...BLOOD_COMPONENTS.map((c) => ({ value: c, label: c })),
          ]}
        />
      </div>

      {/* INVENTORY TABLE */}
      <Table
        columns={columns}
        data={filteredItems}
        keyExtractor={(item) => item.id}
        onRowClick={handleRowClick}
      />
    </div>
  );
};
