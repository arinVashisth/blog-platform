import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";

export default function AuthorPage() {

    const { author } = useParams();

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, [author]);

    const fetchBlogs = async () => {

        try {

            const res = await API.get("/blogs/public");

            const filtered = res.data.blogs.filter(
                (blog) =>
                    blog.author?.name
                        .toLowerCase()
                        .replace(/\s+/g, "-") === author
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

                <h2 className="mb-4">
                    👤 Blogs by {author.replace("-", " ")}
                </h2>

                <div className="row">

                    {blogs.map((blog) => (

                        <div
                            className="col-md-4 mb-4"
                            key={blog._id}
                        >

                            <BlogCard blog={blog} />

                        </div>

                    ))}

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