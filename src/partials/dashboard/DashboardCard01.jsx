import React from 'react';
import { useSelector } from 'react-redux';

function DashboardCard01() {
  const users = useSelector(state => state.users.users);
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-primary shadow-lg rounded border border-slate-200">
      <div className="px-5 pt-3">
        <h2 className="text-lg font-semibold text-white text-slate-800 mb-2">Users</h2>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-white text-slate-800 mr-2">{users.length}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;
