import React from 'react';

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }) + ' IST';
  } catch {
    return isoString;
  }
}

export function formatTimeOnly(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch {
    return isoString;
  }
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('en-IN').format(val);
}

const BLOOD_GROUP_REGEX = /(AB\+|AB\-|A\+|A\-|B\+|B\-|O\+|O\-)/g;
const BLOOD_GROUP_SET = new Set(['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-']);

/**
 * Highlights all blood group identifiers (O-, O+, A-, A+, B-, B+, AB-, AB+) in #BB0A1E with bold weight.
 */
export function renderWithBloodGroup(text: string): React.ReactNode {
  if (!text) return text;
  const parts = text.split(BLOOD_GROUP_REGEX);
  return parts.map((part, index) =>
    BLOOD_GROUP_SET.has(part)
      ? React.createElement(
          'span',
          { key: index, className: 'text-[#BB0A1E] font-bold' },
          part
        )
      : part
  );
}
