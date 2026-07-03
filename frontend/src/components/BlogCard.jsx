import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
    return (

        <div
            className="card shadow-lg h-100 border-0"
            style={{
                transition: "0.3s",
                borderRadius: "15px",
                overflow: "hidden",
            }}
        >

            {blog.featureImage && (

                <img
                    src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${blog.featureImage}`}
                    className="card-img-top"
                    alt={blog.title}
                    style={{
                        height: "220px",
                        objectFit: "cover",
                    }}
                />

            )}

            <div className="card-body d-flex flex-column">

                {/* Status & Date */}

                <div className="mb-3">

                    <span className="badge bg-success me-2">
                        {blog.status}
                    </span>

                    <span className="badge bg-secondary">
                        {new Date(blog.createdAt).toLocaleDateString()}
                    </span>

                </div>

                {/* Title */}

                <h4
                    className="fw-bold"
                    style={{
                        minHeight: "70px",
                    }}
                >
                    {blog.title}
                </h4>

                {/* Description */}

                <p className="text-muted">

                    {blog.content.substring(0, 120)}...

                </p>

                <div className="mt-auto">

                    {/* Author */}

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <Link
                            to={`/author/${blog.author?.name
                                ?.toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            className="text-decoration-none"
                        >

                            👤 {blog.author?.name}

                        </Link>

                        <small className="text-muted">

                            📅 {new Date(blog.createdAt).toLocaleDateString()}

                        </small>

                    </div>

                    {/* Category & Tag */}

                    <div className="mb-3">

                        {blog.categories?.length > 0 && (

                            <Link
                                to={`/category/${blog.categories[0]}`}
                                className="badge bg-primary text-decoration-none me-2"
                            >

                                {blog.categories[0]}

                            </Link>

                        )}

                        {blog.tags?.length > 0 && (

                            <Link
                                to={`/tag/${blog.tags?.[0]}`}
                                className="badge bg-dark text-decoration-none"
                            >
                                {blog.tags?.[0]}
                            </Link>

                        )}

                    </div>

                    {/* Button */}

                    <Link
                        to={`/blog/${blog.slug}`}
                        className="btn btn-primary w-100"
                    >

                        Read Article →

                    </Link>

                </div>

            </div>

        </div>

    );
}