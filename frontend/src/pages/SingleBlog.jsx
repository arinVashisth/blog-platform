import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SingleBlog() {

    const { slug } = useParams();

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {

        try {

            const res = await API.get(`/blogs/${slug}`);

            setBlog(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    if (!blog) {

        return (
            <h2 className="text-center mt-5">
                Loading...
            </h2>
        );

    }

return (
    <>
        <Navbar />

        <div className="container my-5">

            <div className="row justify-content-center">

                <div className="col-lg-10">

                    <div className="card shadow-lg border-0">

                        {/* Feature Image */}

                        {blog.featureImage && (

                            <img
                                src={`${import.meta.env.VITE_API_URL.replace("/api","")}${blog.featureImage}`}
                                className="card-img-top"
                                style={{
                                    maxHeight: "500px",
                                    objectFit: "cover"
                                }}
                            />

                        )}

                        <div className="card-body p-5">

                            {/* Category & Tag */}

                            <div className="mb-3">

                                <span className="badge bg-primary me-2">

                                    {blog.categories?.[0] || "General"}

                                </span>

                                <span className="badge bg-dark">

                                    {blog.tags?.[0] || "Blog"}

                                </span>

                            </div>

                            {/* Title */}

                            <h1 className="fw-bold mb-3">

                                {blog.title}

                            </h1>

                            {/* Author */}

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div>

                                    <strong>

                                        👤 {blog.author?.name}

                                    </strong>

                                </div>

                                <div className="text-muted">

                                    📅 {new Date(blog.createdAt).toLocaleDateString()}

                                </div>

                            </div>

                            <hr />

                            {/* Blog Content */}

                            <div
                                style={{
                                    fontSize: "18px",
                                    lineHeight: "2",
                                    textAlign: "justify"
                                }}
                            >

                                {blog.content}

                            </div>

                        </div>

                    </div>


                    {/* FAQ */}
                    {blog.faq?.some(
                        item => item.question?.trim() || item.answer?.trim()
                    ) && (

                    <div className="card shadow mt-4">

                        <div className="card-header bg-warning">

                            ❓ Frequently Asked Questions

                        </div>

                        <div className="card-body">

                            {

                                blog.faq?.length ? (

                                    blog.faq.map((item,index)=>(

                                        <div key={index}>

                                            <h5>

                                                {item.question}

                                            </h5>

                                            <p>

                                                {item.answer}

                                            </p>

                                            <hr />

                                        </div>

                                    ))

                                ) : (

                                    <p>No FAQs Available</p>

                                )

                            }

                        </div>

                    </div>
                    )}

                    {/* Internal Links */}
                    {blog.internalLinks?.filter(link=>link.trim()).length > 0 && (

                    <div className="card shadow mt-4">

                        <div className="card-header">

                            📚 Related Articles

                        </div>

                        <div className="card-body">

                            {

                                blog.internalLinks?.length

                                ? blog.internalLinks.map((link,index)=>(

                                    <div key={index}>

                                        {link}

                                    </div>

                                ))

                                : <p>No Internal Links</p>

                            }

                        </div>

                    </div>
                    )}

                    {/* External Links */}
                    {blog.externalLinks?.filter(link=>link.trim()).length > 0 && (

                    <div className="card shadow mt-4 mb-5">

                        <div className="card-header">

                            🌍 External References

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

                                : <p>No External Links</p>

                            }

                        </div>

                    </div>
                    )}

                </div>

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