import { ReactNode } from 'react';
import { DesktopNavbar } from '../components/navbar/desktopNavbar';

type DesktopLayoutType = {
  children: ReactNode;
};

export function DesktopLayout({ children }: DesktopLayoutType) {
  return (
    <section className='bg-background-300'>
      <section className='container min-h-screen'>
        <DesktopNavbar />
        {children}
      </section>
    </section>
  );
}
