import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Users, Settings, Activity } from 'lucide-react';

function AdminPanel() {
  const { user } = useAuth();

  // Only show admin panel for admin users
  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-purple-600" />
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">User Management</span>
          </div>
          <p className="text-xs text-purple-600">
            Manage users, roles, and permissions
          </p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">System Analytics</span>
          </div>
          <p className="text-xs text-blue-600">
            View system-wide statistics and reports
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">System Settings</span>
          </div>
          <p className="text-xs text-green-600">
            Configure application settings
          </p>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">Security</span>
          </div>
          <p className="text-xs text-orange-600">
            Security settings and audit logs
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Admin Actions</h3>
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary text-xs">
            View All Users
          </button>
          <button className="btn-secondary text-xs">
            System Reports
          </button>
          <button className="btn-secondary text-xs">
            Backup Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel; 