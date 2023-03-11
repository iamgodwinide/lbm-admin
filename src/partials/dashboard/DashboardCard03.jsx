import React from 'react';
import { useSelector } from 'react-redux';

function DashboardCard03() {
  const messages = useSelector(state => state.messages.messages);
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-success shadow-lg rounded border border-slate-200">
      <div className="px-5 pt-3">
        <h2 className="text-lg font-bold text-white text-slate-800 mb-2">Total Messages</h2>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-white text-slate-800 mr-2">{messages.length}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard03;
