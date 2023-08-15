import { ReactNode } from 'react';
import { DesktopNavbar } from '../components/navbar/desktopNavbar';

type LayoutType = {
  children: ReactNode;
};

export function Layout({ children }: LayoutType) {
  return (
    <section className='bg-gray-200'>
      <section className='container min-h-screen'>
        <DesktopNavbar />
        {children}
      </section>
    </section>
  );
}
