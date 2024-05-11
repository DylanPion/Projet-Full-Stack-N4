import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Layout from "./pages/Layout";
import SecureRoute from "./components/SecureRoute";
import Drive from "./pages/Drive";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Bucket from "./components/Bucket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route
            index
            path="drive"
            element={
              <SecureRoute>
                <Drive />
              </SecureRoute>
            }
          />
          <Route
            path="file/:bucketId"
            element={
              <SecureRoute>
                <div className="content">
                  <Bucket />
                </div>
              </SecureRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
