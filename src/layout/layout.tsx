import { ReactNode } from 'react';
import { DesktopNavbar } from '../components/navbar/desktopNavbar';
import { MobileNavbar } from '../components/navbar/mobileNavbar';

type LayoutType = {
  children: ReactNode;
};

export function Layout({ children }: LayoutType) {
  return (
    <section className='grid h-[100dvh] grid-rows-[1fr_auto] bg-gray-200 sm:grid-rows-[auto_1fr]'>
      <DesktopNavbar />
      <section className='hide-scrollbar container overflow-y-auto'>
        {children}
      </section>
      <MobileNavbar />
    </section>
  );
}
