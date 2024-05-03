import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./components/Root";
import Layout from "./pages/Layout";
import SecureRoute from "./components/SecureRoute";
import Login from "./Pages/Login";
import Main from "./components/Main";
import Signup from "./Pages/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path="/dashboard" element={<Layout />}>
        <Route
          index
          element={
            <SecureRoute>
              <div className="content">
                <Main />
              </div>
            </SecureRoute>
          }
        />
      </Route>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
