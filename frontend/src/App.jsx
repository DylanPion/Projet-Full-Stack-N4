import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Layout from "./pages/Layout";
import SecureRoute from "./components/SecureRoute";
import Drive from "./pages/Drive";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Bucket from "./components/Bucket";
import { FileProvider } from "./context/FileContext";

function App() {
  return (
    <FileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <SecureRoute>
                <Root />
              </SecureRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SecureRoute>
                <Layout />
              </SecureRoute>
            }
          >
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
    </FileProvider>
  );
}

export default App;
