import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components and Pages are here.
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BlogList from "./pages/BlogList";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Users from "./pages/Users";
import CategoryList from "./pages/CategoryList";
import TagList from "./pages/TagList";
import RoleRoute from "./components/RoleRoute"
import ContactMessages from "./pages/ContactMessages";

function App() {
  return (
    <>
    <Routes>

      <Route
          path="/"
          element={<Login />}
      />

      <Route
          path="*"
          element={<Navigate to="/" />}
      />

      <Route
          path="/dashboard"
          element={
              <RoleRoute
                  allowedRoles={[
                      "superadmin",
                      "editor",
                      "author",
                  ]}
              >
                  <Dashboard />
              </RoleRoute>
          }
      />

      <Route
          path="/blogs"
          element={
              <RoleRoute
                  allowedRoles={[
                      "superadmin",
                      "editor",
                      "author",
                  ]}
              >
                  <BlogList />
              </RoleRoute>
          }
      />
      <Route
            path="/contact-messages"
            element={
                <RoleRoute
                    allowedRoles={["superadmin"]}
                >
                    <ContactMessages />
                </RoleRoute>
            }
        />

      <Route
          path="/create-blog"
          element={
              <RoleRoute
                  allowedRoles={[
                      "superadmin",
                      "editor",
                      "author",
                  ]}
              >
                  <CreateBlog />
              </RoleRoute>
          }
      />

      <Route
          path="/edit-blog/:id"
          element={
              <RoleRoute
                  allowedRoles={[
                      "superadmin",
                      "editor",
                      "author",
                  ]}
              >
                  <EditBlog />
              </RoleRoute>
          }
      />

      <Route
          path="/users"
          element={
              <RoleRoute
                  allowedRoles={["superadmin"]}
              >
                  <Users />
              </RoleRoute>
          }
      />
      <Route
          path="/categories"
          element={
              <RoleRoute
                  allowedRoles={[
                      "superadmin",
                      "editor",
                  ]}
              >
                  <CategoryList />
              </RoleRoute>
          }
      />
      <Route
          path="/tags"
          element={
              <RoleRoute
                  allowedRoles={[
                      "superadmin",
                      "editor",
                  ]}
              >
                  <TagList />
              </RoleRoute>
          }
      />
      

    </Routes>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
    />
    </>
  );
}

export default App;