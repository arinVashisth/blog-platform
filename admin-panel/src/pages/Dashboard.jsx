import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalUsers: 0,
    latestBlogs: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container-fluid">

        <h2 className="mb-4">Dashboard</h2>

        <div className="row">

          {/* Total Blogs */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h5>Total Blogs</h5>
                <h2>{stats.totalBlogs}</h2>
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h5>Total Users</h5>
                <h2>{stats.totalUsers}</h2>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h5>Status</h5>
                <h2 className="text-success">Online</h2>
              </div>
            </div>
          </div>

        </div>

        {/* Latest Blogs */}
        <div className="card shadow-sm">
          <div className="card-body">

            <h4 className="mb-3">Latest Blogs</h4>

            {stats.latestBlogs.length === 0 ? (
              <p>No blogs available.</p>
            ) : (
              stats.latestBlogs.map((blog) => (

                <div
                    key={blog._id}
                    className="card mb-3 shadow-sm border-0"
                >

                    <div className="row g-0">

                        <div className="col-md-3">

                            {blog.featureImage && (

                                <img
                                    src={`http://localhost:5000${blog.featureImage}`}
                                    className="img-fluid rounded-start"
                                    style={{
                                        height: "180px",
                                        width: "100%",
                                        objectFit: "cover"
                                    }}
                                    alt={blog.title}
                                />

                            )}

                        </div>

                        <div className="col-md-9">

                            <div className="card-body">

                                <div className="d-flex justify-content-between">

                                    <h4 className="fw-bold">

                                        {blog.title}

                                    </h4>

                                    <span
                                        className={`badge ${
                                            blog.status === "published"
                                                ? "bg-success"
                                                : "bg-warning text-dark"
                                        }`}
                                    >
                                        {blog.status}
                                    </span>

                                </div>

                                <p className="text-muted">

                                    {blog.content.substring(0,120)}...

                                </p>

                                <div className="d-flex justify-content-between">

                                    <small>

                                        👤 {blog.author?.name}

                                    </small>

                                    <small>

                                        📅 {new Date(blog.createdAt).toLocaleDateString()}

                                    </small>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            ))
            )}

          </div>
        </div>

      </div>
    </Layout>
  );
}