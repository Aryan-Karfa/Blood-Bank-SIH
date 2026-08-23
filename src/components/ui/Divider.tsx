import React from 'react';
import { cn } from '../../lib/utils';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  emphasis?: boolean;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
  emphasis = false,
}) => {
  const borderColor = emphasis ? 'bg-[#9C9A91]' : 'bg-[#C9C8C2]';

  if (orientation === 'vertical') {
    return <div className={cn('w-[1px] self-stretch', borderColor, className)} role="separator" aria-orientation="vertical" />;
  }

  return <div className={cn('h-[1px] w-full', borderColor, className)} role="separator" aria-orientation="horizontal" />;
};
