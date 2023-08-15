import { createBrowserRouter } from 'react-router-dom';
import { DesktopLayout } from '../layout/desktopLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <DesktopLayout>
        <h1>This is home page</h1>
      </DesktopLayout>
    ),
  },
]);
