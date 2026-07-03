import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";




export default function CategoryPage() {

  const { category } = useParams();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  const fetchBlogs = async () => {

    try {

      const res = await API.get("/blogs/public");

      const filtered = res.data.blogs.filter((blog) =>
        blog.categories?.includes(category)
      );

      setBlogs(filtered);

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <>
      <Navbar  />

      <div className="container mt-5">

        <div className="text-center mb-5">
          <h1 className="fw-bold">
              📂 {category}
          </h1>

          <p className="text-muted">
              {blogs.length} article{blogs.length !== 1 ? "s" : ""} found
          </p>
      </div>

        <div className="row">

          {blogs.length === 0 ? (
            <div className="text-center py-5">
              <h3>No blogs found in this category.</h3>

              <p className="text-muted">
                  Try exploring another category.
              </p>

              <Link
                  to="/"
                  className="btn btn-primary mt-3"
              >
                  ← Back to Home
              </Link>
          </div>
          ) : (
            blogs.map((blog) => (

              <div
                  className="col-md-4 mb-4"
                  key={blog._id}
              >

                  <BlogCard blog={blog} />

              </div>

            ))
          )}

        </div>
        <Link
            to="/"
            className="btn btn-primary mt-3"
        >
            ← Back to Home
        </Link>

      </div>

      <Footer />
    </>
  );
}