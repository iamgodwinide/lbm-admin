import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import NewMessage from './pages/NewMessage';
import Series from './pages/Series';
import NewSeries from './pages/NewSeries';
import Devotionals from './pages/Devotionals';
import NewDeovtional from './pages/NewDevotional';
import EditMessage from './pages/EditMessage';
import Users from './pages/Users';
import PendingUsers from './pages/PendingUsers';
import "./css/main.css"
import "./css/index.css"


import { useDispatch, useSelector } from "react-redux";

import init from './config/init';

import 'bootstrap/dist/css/bootstrap.min.css';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import EditSeries from './pages/EditSeries';
import Login from './pages/Login';


function App() {

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change


  const updateState = () => {
    init(dispatch);
    setInterval(() => {
      init(dispatch)
    }, 10000)
  }

  useEffect(() => {
    updateState();
  }, []);


  return (
    <Routes>
      <Route exact path="/" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
      } />
      <Route exact path="/messages" element={
      <ProtectedRoute>
        <Messages />
      </ProtectedRoute>
      } />
      <Route exact path="/series" element={
      <ProtectedRoute>
        <Series />
      </ProtectedRoute>
      } />
      <Route exact path="/series/edit/:seriesId" element={
      <ProtectedRoute>
        <EditSeries />
      </ProtectedRoute>
      } />
      <Route exact path="/messages/new-message" element={
      <ProtectedRoute>
        <NewMessage />
      </ProtectedRoute>
      } />
      <Route exact path="/series/new-series" element={
        <ProtectedRoute>
          <NewSeries />
        </ProtectedRoute>
      } />
      <Route exact path="/devotionals" element={
      <ProtectedRoute>
        <Devotionals />
      </ProtectedRoute>
      } />
      <Route exact path="/devotionals/new-devotional" element={
        <ProtectedRoute>
          <NewDeovtional />
        </ProtectedRoute>
      } />
      <Route exact path="/messages/edit/:msgid" element={
        <ProtectedRoute>
          <EditMessage />
        </ProtectedRoute>
      } />
      <Route exact path="/users" element={
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>
      } />
      <Route exact path="/pending-users" element={
        <ProtectedRoute>
          <PendingUsers />
        </ProtectedRoute>
      } />
      <Route exact path="/login" element={
          <Login />
      } />
    </Routes>
  );
};


const ProtectedRoute = ({ children }) => {
  const user = useSelector(state => state.admin.user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default App;
