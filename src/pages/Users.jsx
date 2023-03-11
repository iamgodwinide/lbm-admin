import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import $ from 'jquery/dist/jquery'

function Users() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const users = useSelector(state => state.users.users);


    useEffect(() => {
        if (!$.fn.DataTable.isDataTable("#usertable")) {
          $(document).ready(function () {
            setTimeout(function () {
              $("#usertable").DataTable({
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
          return users.map((user) => {
            return (
                <tr>
                <td className="p-2">
                    <div className="text-center">{user.firstname}</div>
                </td>
                <td className="p-2">
                    <div className="text-center">{user.lastname}</div>
                </td>
                <td className="p-2">
                    <div className="text-center">{user.serialnumber}</div>
                </td>
                <td className="p-2">
                    <div className="text-center">{user.phone}</div>
                </td>
                <td className="p-2 ustify-content-center">
                    <p className='text-bold text-center'>{user.created}</p>
                </td>
                <td className="p-2 text-center">
                    <Link to={"/edit-user"} className="btn btn-secondary" >
                        Edit
                    </Link>
                </td>
            </tr>
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
                        <h1 className='h3 text-dark'>Approved Users</h1>

                        <div className="overflow-x-auto bg-white mt-4 p-5" style={{
                            maxWidth: "900px"
                        }}>
                            <table id='usertable' className="table align-items-center justify-content-center mb-0 p-2">
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
                                <tbody>
                                    {
                                        showTable()
                                    }
                                </tbody>
                            </table>
                            {
                                users.length === 0
                                && <h4 className='text-bold text-center  mt-5 pb-5'>No Data available</h4>
                            }

                        </div>


                    </div>

                </main>

            </div>
        </div>
    );
}

export default Users;