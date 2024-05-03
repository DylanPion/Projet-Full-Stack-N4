import Main from "./components/Main";
import Layout from "./pages/Layout";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./components/Root";
import SecureRoute from "./components/SecureRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path="/dashboard" element={<Layout />}>
        <Route
          index
          element={
            <SecureRoute>
              <Main />
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
