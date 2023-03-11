import React from 'react';
import { useSelector } from 'react-redux';

function DashboardCard02() {
  const users = useSelector(state => state.users.pendingUsers);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 shadow-lg rounded border border-slate-200 bg-secondary">
      <div className="px-5 pt-3 pb-2">
        <h2 className="text-lg font-bold text-white text-slate-800 mb-2">Pending Users</h2>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-white text-slate-800 mr-2">{users.length}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard02;
