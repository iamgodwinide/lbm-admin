import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import $ from 'jquery/dist/jquery'


function Devotionals() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const devotionals = useSelector(state => state.devotionals.devotionals);


    useEffect(() => {
        if (!$.fn.DataTable.isDataTable("#devtable")) {
          $(document).ready(function () {
            setTimeout(function () {
              $("#devtable").DataTable({
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
          return devotionals.map(devotional => (
            <tr key={devotional._id}>
                <td className="p-2">
                    <img className='rounded' src={devotional.artwork} style={{
                        height: "60px",
                        aspectRatio: 1
                    }} />
                </td>
                <td className="p-2">
                    <div>{devotional.title}</div>
                </td>
                <td className="p-2">
                    <div>{devotional.date}</div>
                </td>
                <td className="p-2">
                    <div>{devotional.published ? "yes" : "no"}</div>
                </td>
                <td className="p-2 d-flex justify-content-center">
                    <Link to="/" className='btn btn-secondary' >More</Link>
                </td>
            </tr>
        ))
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
                        <h1 className='h3 text-dark'>Devotionals</h1>
                        <div className='mt-5'>
                            <Link to={"/devotionals/new-devotional"} className="btn btn-success">Add New</Link>
                        </div>

                        <div className="overflow-x-auto bg-white mt-4 p-5" style={{
                            maxWidth: "900px"
                        }}>
                            <table id='devtable' className="table align-items-center justify-content-center mb-0 p-2">
                                {/* Table header */}
                                <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                                    <tr>
                                        <th className="p-2">
                                            <div className="font-semibold text-dark text-left">Artwork</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-dark">Title</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-dark">Date</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-dark">Published</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-dark">Action</div>
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
                                devotionals.length === 0
                                && <h4 className='text-bold text-center mt-5 pb-5'>No Data available</h4>
                            }
                        </div>


                    </div>

                </main>

            </div>
        </div>
    );
}

export default Devotionals;