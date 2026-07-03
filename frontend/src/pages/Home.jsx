import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";



export default function Home() {

    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");



    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {

        try {

            const res = await API.get("/blogs/public");

            setBlogs(res.data.blogs);

        } catch (err) {

            console.log(err);

        }

    };


    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
        <Navbar  />
        <div className="container mt-5">

            <div
                className="text-center text-white rounded shadow-lg mb-5"
                style={{
                    background:
                    "linear-gradient(135deg, #0d6efd, #6610f2)",
                    padding: "70px 20px",
                }}
                >
                <h1 className="display-4 fw-bold">
                    Welcome to Blog Platform
                </h1>

                <p className="lead mt-3">
                    Discover amazing articles on Technology, AI,
                    Programming and more.
                </p>

                <div className="mt-4">

                    <input
                    type="text"
                    className="form-control form-control-lg w-50 mx-auto"
                    placeholder="🔍 Search blogs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                </div>

            <div className="row">

                {filteredBlogs.map((blog) => (
                    <div
                        className="col-md-4 mb-4"
                        key={blog._id}
                    >

                        <BlogCard blog={blog} />

                    </div>

                ))}
                {filteredBlogs.length === 0 && (

                    <div className="text-center mt-5">

                        <h3>No blogs found.</h3>

                    </div>

                )}

            </div>

        </div>
        <Footer />
        </>
    );

}