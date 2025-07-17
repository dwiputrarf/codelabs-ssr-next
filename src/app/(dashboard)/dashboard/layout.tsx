import MainBase from '@/components/layout/MainBase';
import React, { ReactNode } from 'react';

export default function DashboardLayout({ children }: {children: ReactNode} ) {
  return (
    <MainBase layout="dashboard">
      {children}
    </MainBase>
  );
}