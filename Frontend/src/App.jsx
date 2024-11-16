import React from 'react';
import Left from './components/Left';
import Right from './components/Right';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SignUp from './components/Signup/SignUp';
import { useAuth } from './context/AuthProvider';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const { authUser } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-full">
                <Sidebar />
                <div className="flex flex-col w-full">
                  <Navbar />
                  <div className="flex flex-1">
                    <Left />
                    <Right />
                  </div>
                </div>
              </div>
            ) : (
              <SignUp />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
