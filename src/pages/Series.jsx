import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import $ from 'jquery/dist/jquery'

function Series() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const series = useSelector(state => state.series.series);


    useEffect(() => {
        if (!$.fn.DataTable.isDataTable("#sertable")) {
          $(document).ready(function () {
            setTimeout(function () {
              $("#sertable").DataTable({
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
          return series.map((ser) => {
            return (
                    <tr key={ser._id}>
                        <td>
                            <div className="ml-2">{ser.title}</div>
                        </td>
                        <td>
                            <div className="ml-2">{ser.published ? "yes" : "no"}</div>
                        </td>
                        <td className="d-flex">
                            <Link to={`/series/edit/${ser._id}`} className='my-2 btn btn-secondary' >Edit</Link>
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
                        <h1 className='h3 text-dark'>Series</h1>
                        <div className='mt-5'>
                            <Link to={"/series/new-series"} className="btn btn-success">Add New</Link>
                        </div>

                        <div className="overflow-x-auto bg-white mt-4 p-5" style={{
                            maxWidth: "900px"
                        }}>
                            <table id='sertable' className="table align-items-center justify-content-center mb-0 p-2">
                                <thead className="text-bold uppercase text-slate-400 bg-slate-50 px-5 rounded-sm">
                                    <tr>
                                        <th className="p-2">
                                            <div className="font-semibold text-dark ">Title</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-dark ">Published</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-dark ">Action</div>
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
                                series.length === 0
                                && <h4 className='text-bold text-center  mt-5 pb-5'>No Data available</h4>
                            }

                        </div>


                    </div>

                </main>

            </div>
        </div>
    );
}

export default Series;