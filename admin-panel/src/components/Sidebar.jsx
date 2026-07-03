import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Sidebar() {
  const user = JSON.parse(
      localStorage.getItem("user")
  );
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {

      if (user?.role === "superadmin") {

          fetchUnread();

      }

      const refreshUnread = () => {

          fetchUnread();

      };

      window.addEventListener(
          "refreshUnreadCount",
          refreshUnread
      );

      return () => {

          window.removeEventListener(
              "refreshUnreadCount",
              refreshUnread
          );

      };

  }, []);

  const fetchUnread = async () => {

      try {

          const res = await API.get(
              "/contact/unread-count"
          );

          setUnreadCount(
              res.data.unread
          );

      } catch (err) {

          console.log(err);

      }

  };
  
  return (

    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >

      <div className="text-center mb-4">

        <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{
                width: "70px",
                height: "70px",
                fontSize: "28px",
                fontWeight: "bold"
            }}
        >
            {user?.name?.charAt(0).toUpperCase()}
        </div>

        <h4 className="mb-1">
            {user?.name}
        </h4>

        <span className="badge bg-success">
            {user?.role?.toUpperCase()}
        </span>

      </div>

      <hr />

      <ul className="nav flex-column">

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/dashboard">
            📊 Dashboard
          </Link>
        </li>

        <li className="nav-item mb-3">
            <Link
                className="nav-link text-white"
                to="/blogs"
            >

                {user?.role === "author"
                    ? "📝 My Blogs"
                    : "📝 Blogs"}

            </Link>
        </li>

        {user?.role !== "author" && (

          <li className="nav-item mb-2">

              <Link
                  to="/categories"
                  className="nav-link text-white"
              >

                  📂 Categories

              </Link>

          </li>

          )}

        {user?.role !== "author" && (

          <li className="nav-item mb-2">

              <Link
                  to="/tags"
                  className="nav-link text-white"
              >

                  🏷️ Tags

              </Link>

          </li>

          )}

        {user?.role === "superadmin" && (

        <li className="nav-item mb-3">

            <Link
                className="nav-link text-white"
                to="/users"
            >

                👥 Users

            </Link>

        </li>

        )}

        {user?.role === "superadmin" && (

          <li className="nav-item mb-3">

              <Link
                  className="nav-link text-white d-flex justify-content-between align-items-center"
                  to="/contact-messages"
              >

                  <span>

                      📩 Contact Messages

                  </span>

                  {unreadCount > 0 && (

                      <span className="badge bg-danger">

                          {unreadCount}

                      </span>

                  )}

              </Link>

          </li>

          )}

        <li className="nav-item mt-5">
          <button
            className="btn btn-danger w-100"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");

              window.location.replace("/");
            }}
          >
            Logout
          </button>
        </li>

      </ul>

    </div>

  );

}