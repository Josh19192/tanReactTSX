// src/components/AdminLayout.tsx

import React from 'react';
import Sidebar from './Sidebar';  // Import Sidebar
import Header from './Header';    // Import Header

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
