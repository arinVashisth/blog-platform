import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  const user = JSON.parse(
      localStorage.getItem("user")
  );



  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      console.log("API Response:", res.data);
      console.log("Blogs Array:", res.data.blogs);
      console.log("Length:", res.data.blogs?.length);
      setBlogs(res.data.blogs);
    } catch (err) {
      console.log(err);
    }
  };


  const handleDelete = async (id) => {

        if (!window.confirm("Delete this blog?")) return;

        try {

            await API.delete(`/blogs/${id}`);

            fetchBlogs();

        } catch (err) {
            console.log(err);
        }

    };

    const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

    const currentBlogs = filteredBlogs.slice(
    indexOfFirstBlog,
    indexOfLastBlog
    );

    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
  <Layout>
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>

            {user?.role === "author"
                ? "📝 My Blogs"
                : "📚 All Blogs"}

        </h2>

        <Link to="/create-blog">
          <button className="btn btn-primary">
            + Create Blog
          </button>
        </Link>
      </div>
        <div className="mb-4">
        <input
            type="text"
            className="form-control"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        </div>
      {blogs.length === 0 ? (
        <div className="alert alert-warning">
          No Blogs Found
        </div>
      ) : (

        <table className="table table-striped table-hover shadow">

          <thead className="table-dark">

            <tr>
              <th>#</th>
              <th>Title</th>
              {user?.role !== "author" && (

                <th>

                Author

                </th>

                )}
              <th>Content</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {currentBlogs
                .map((blog,index) => (

              <tr key={blog._id}>

                <td>{index + 1}</td>

                <td>{blog.title}</td>

                {user?.role !== "author" && (

                    <td>

                    {blog.author?.name}

                    </td>

                    )}

                <td>
                  {blog.content.substring(0, 40)}...
                </td>
                <td>
                    <span
                        className={`badge ${
                        blog.status === "published"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                    >
                        {blog.status}
                    </span>
                </td>
                <td>
                <button
                    className="btn btn-info btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target={`#imageModal${blog._id}`}
                >
                    Show
                </button>

                <div
                  className="modal fade"
                  id={`imageModal${blog._id}`}
                  tabIndex="-1"
                >

                   <div className="modal-dialog modal-xl modal-dialog-scrollable">

                      <div className="modal-content">

                          <div className="modal-header">

                              <h4>{blog.title}</h4>

                              <button
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                              ></button>

                          </div>

                          <div className="modal-body">

                              {/* Feature Image */}

                              {blog.featureImage && (

                                  <div className="text-center mb-4">

                                      <img
                                          src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${blog.featureImage}`}
                                          className="img-fluid rounded shadow"
                                          style={{
                                              maxHeight: "350px",
                                          }}
                                      />

                                  </div>

                              )}

                              {/* Blog Information */}

                              <div className="card mb-3">

                                  <div className="card-header bg-primary text-white">

                                      📝 Blog Information

                                  </div>

                                  <div className="card-body">

                                      <p>

                                          <strong>Author:</strong>{" "}
                                          {blog.author?.name}

                                      </p>

                                      <p>

                                          <strong>Status:</strong>{" "}
                                          <span
                                              className={`badge ${
                                                  blog.status === "published"
                                                      ? "bg-success"
                                                      : "bg-warning text-dark"
                                              }`}
                                          >
                                              {blog.status}
                                          </span>

                                      </p>

                                      <p>

                                          <strong>Category:</strong>{" "}
                                          {blog.categories?.join(", ") || "N/A"}

                                      </p>

                                      <p>

                                          <strong>Tags:</strong>{" "}
                                          {blog.tags?.join(", ") || "N/A"}

                                      </p>

                                      <hr />

                                      <p>

                                          {blog.content}

                                      </p>

                                  </div>

                              </div>

                              {/* SEO */}

                              <div className="card mb-3">

                                  <div className="card-header bg-success text-white">

                                      🔍 SEO Information

                                  </div>

                                  <div className="card-body">

                                      <p>

                                          <strong>Meta Title:</strong>

                                          <br />

                                          {blog.metaTitle || "N/A"}

                                      </p>

                                      <p>

                                          <strong>Meta Description:</strong>

                                          <br />

                                          {blog.metaDescription || "N/A"}

                                      </p>

                                      <p>

                                          <strong>Canonical URL:</strong>

                                          <br />

                                          {blog.canonicalUrl || "N/A"}

                                      </p>

                                  </div>

                              </div>

                              {/* Open Graph */}

                              <div className="card mb-3">

                                  <div className="card-header bg-info text-dark">

                                      🌐 Open Graph

                                  </div>

                                  <div className="card-body">

                                      <p>

                                          <strong>OG Title:</strong>

                                          <br />

                                          {blog.ogTitle || "N/A"}

                                      </p>

                                      <p>

                                          <strong>OG Description:</strong>

                                          <br />

                                          {blog.ogDescription || "N/A"}

                                      </p>

                                      <p>

                                          <strong>OG Image:</strong>

                                          <br />

                                          {blog.ogImage || "N/A"}

                                      </p>

                                      <p>

                                          <strong>Twitter Card:</strong>{" "}

                                          {blog.twitterCard || "N/A"}

                                      </p>

                                  </div>

                              </div>

                              {/* FAQ */}

                              {blog.faq?.some(
                                    item => item.question?.trim() || item.answer?.trim()
                                ) && (

                                <div className="card shadow-sm mb-4">

                                    <div className="card-header bg-warning">
                                        ❓ Frequently Asked Questions
                                    </div>

                                    <div className="card-body">

                                        {blog.faq.map((item,index)=>(

                                            <div key={index}>
                                                <strong>Q:</strong> {item.question}
                                                <br />
                                                <strong>A:</strong> {item.answer}
                                                <hr />
                                            </div>

                                        ))}

                                    </div>

                                </div>

                                )}

                              {/* Internal Links */}

                              {blog.internalLinks?.filter(link=>link.trim()).length > 0 && (

                              <div className="card mb-3">

                                  <div className="card-header">

                                      🔗 Internal Links

                                  </div>

                                  <div className="card-body">

                                      {

                                          blog.internalLinks?.length

                                              ? blog.internalLinks.map((link,index)=>(

                                                  <div key={index}>

                                                      {link}

                                                  </div>

                                              ))

                                              : "No Internal Links"

                                      }

                                  </div>

                              </div>
                              )}

                              {/* External Links */}
                              {blog.internalLinks?.filter(link=>link.trim()).length > 0 && (

                              <div className="card">

                                  <div className="card-header">

                                      🌍 External Links

                                  </div>

                                  <div className="card-body">

                                      {

                                          blog.externalLinks?.length

                                              ? blog.externalLinks.map((link,index)=>(

                                                  <div key={index}>

                                                      <a
                                                          href={link}
                                                          target="_blank"
                                                          rel="noreferrer"
                                                      >

                                                          {link}

                                                      </a>

                                                  </div>

                                              ))

                                              : "No External Links"

                                      }

                                  </div>

                              </div>
                              )}

                          </div>

                      </div>

                  </div>

                </div>
                  <Link to={`/edit-blog/${blog._id}`}>
                    <button className="btn btn-warning btn-sm me-2">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
        

      )}
      <div className="d-flex justify-content-center mt-4">

        <button
            className="btn btn-secondary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
        >
            Previous
        </button>

        <span className="align-self-center">
            Page {currentPage} of {totalPages}
        </span>

        <button
            className="btn btn-secondary ms-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
        >
            Next
        </button>

        </div>

    </div>
  </Layout>
);
}