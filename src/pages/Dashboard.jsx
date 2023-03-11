import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import { useSelector } from 'react-redux';
import PendingUser from '../partials/dashboard/PendingUser';
import $ from 'jquery/dist/jquery'


function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pendingUsers = useSelector(state => state.users.pendingUsers);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable("#table")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#ptable").DataTable({
            pagingType: "full_numbers",
            pageLength: 20,
            processing: true,
            dom: "Bfrtip",
            select: {
              style: "single",
            }
          });
        }, 1000);
      });
    }
  }, [])


  const showTable = () => {
    try {
      return pendingUsers.map((user) => {
        return (
            <PendingUser key={user._id} user={user} />
          );
      });
    } catch (e) {
      alert(e.message);
    }
  };


  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <DashboardCard01 />
              <DashboardCard02 />
              <DashboardCard03 />
            </div>
            {/* pending users */}
            <h1 className='h4 text-dark mb-4 mt-5'>Pending Users</h1>

            <div className="overflow-x-auto bg-white p-5" style={{ maxWidth: "1000px" }}>
              <table id="ptable" className="table align-items-center justify-content-center mb-0 p-2">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-center">First Name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Last Name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Serial Number</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Phone</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Date</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Actions</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {/* Row */}
                  {
                    showTable()
                  }
                </tbody>
              </table>
              {
                pendingUsers.length === 0
                && <h4 className='text-bold text-center mt-5 pb-5'>No Data available</h4>
              }
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;