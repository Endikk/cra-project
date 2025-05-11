import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

function App() {
  return (
    <RouterProvider router={router}>
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools router={router} />}
    </RouterProvider>
  );
}

export default App;