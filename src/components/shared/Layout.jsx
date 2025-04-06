// src/components/shared/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Outlet /> {/* This renders the nested routes */}
      </main>
    </div>
  );
};

export default Layout;