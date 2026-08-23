import React from 'react';
import { cn } from '../../lib/utils';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  onRowClick?: (item: T) => void;
  selectedRowKey?: string;
  emptyMessage?: string;
  className?: string;
  dense?: boolean;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  selectedRowKey,
  emptyMessage = 'No records found in this view',
  className = '',
  dense = false,
}: TableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto border border-[#C9C8C2] bg-[#FFFFFF] rounded-[4px]', className)}>
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-[#EAE9E4] border-b border-[#C9C8C2]">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={cn(
                  'px-3 py-2.5 font-bold uppercase tracking-wider text-[#171817] text-[11px] whitespace-nowrap',
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                  col.width,
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#C9C8C2]">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-[#5D5E5A]">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => {
              const key = keyExtractor(item, index);
              const isSelected = selectedRowKey === key;

              return (
                <tr
                  key={key}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={cn(
                    'transition-colors',
                    isSelected
                      ? 'bg-[#EAE9E4] font-medium'
                      : 'hover:bg-[#F4F3EF]',
                    onRowClick && 'cursor-pointer'
                  )}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={cn(
                        'px-3 text-[#171817] whitespace-nowrap',
                        dense ? 'py-2' : 'py-2.5',
                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                        col.className
                      )}
                    >
                      {col.cell
                        ? col.cell(item, index)
                        : col.accessorKey
                        ? (item[col.accessorKey] as unknown as React.ReactNode)
                        : null}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
