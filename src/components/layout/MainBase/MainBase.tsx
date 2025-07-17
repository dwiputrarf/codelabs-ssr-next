import React, { ReactNode } from 'react';
import PageBase from '../PageBase';

type LayoutType = 'default' | 'auth' | 'dashboard';

interface MainBaseProps {
  children: ReactNode;
  layout: LayoutType;
}

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <main className="min-h-screen w-full bg-gray-50">
    {children}
  </main>
);

const DefaultLayout = ({ children }: { children: ReactNode }) => children;

const LAYOUT_COMPONENTS = {
  dashboard: PageBase,
  auth: AuthLayout,
  default: DefaultLayout,
} as const;

export default function MainBase({ children, layout }: MainBaseProps) {
  const LayoutComponent = LAYOUT_COMPONENTS[layout];
  
  if (!LayoutComponent) {
    console.warn(`Unknown layout type: ${layout}`);
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return <LayoutComponent>{children}</LayoutComponent>;
}
