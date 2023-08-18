import { ReactNode } from 'react';
import { DesktopNavbar } from '../components/navbar/desktopNavbar';
import { MobileNavbar } from '../components/navbar/mobileNavbar';
import { MobileTopBar } from '../components/navbar/mobileTopBar';
import ProtectedRoute from '../components/protected_route/protectedRoute';

type LayoutType = {
  children: ReactNode;
};

export function Layout({ children }: LayoutType) {
  return (
    <ProtectedRoute>
      <section className='grid h-[100dvh] grid-rows-[auto_1fr_auto] bg-white sm:grid-rows-[auto_1fr] sm:bg-gray-200'>
        <DesktopNavbar />
        <MobileTopBar />
        <section className='hide-scrollbar container overflow-y-auto rounded-xl bg-gray-200 py-5'>
          {children}
        </section>
        <MobileNavbar />
      </section>
    </ProtectedRoute>
  );
}
