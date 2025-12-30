import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sign from './pages/Sign';
import Main from './pages/Main';
import Details from './pages/Details';
import Roles from './pages/Roles';
const isAuthenticated = () => {
  return (
    localStorage.getItem('loggedInUser') ||
    sessionStorage.getItem('loggedInUser')
  );
};

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          }
        />
        <Route
          path="/roles"
          element={
            <PrivateRoute>
              <Roles />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
