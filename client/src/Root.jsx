import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/layout/Header';
import { AuthProvider } from './contexts/AuthContext';

export function Root() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Outlet />
        </main>
        <ToastContainer 
          position="top-right" 
          autoClose={3000}
          className="sm:max-w-md"
        />
      </div>
    </AuthProvider>
  );
} 