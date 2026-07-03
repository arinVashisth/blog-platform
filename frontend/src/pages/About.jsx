import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <div className="text-center mb-5">

                    <h1 className="fw-bold">
                        About Rewathi Blog
                    </h1>

                    <p className="text-muted">
                        Learn more about our mission, vision and the technologies behind our platform.
                    </p>

                </div>

                <div className="row">

                    <div className="col-lg-6">

                        <div className="card shadow-sm h-100">

                            <div className="card-body">

                                <h3>
                                    Our Mission
                                </h3>

                                <p className="mt-3">

                                    Rewathi Blog is built to share high-quality
                                    articles related to Programming, Artificial
                                    Intelligence, Web Development, Machine Learning,
                                    Cyber Security and emerging technologies.

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-6">

                        <div className="card shadow-sm h-100">

                            <div className="card-body">

                                <h3>
                                    Technologies Used
                                </h3>

                                <ul className="mt-3">

                                    <li>React.js</li>
                                    <li>Node.js</li>
                                    <li>Express.js</li>
                                    <li>MongoDB</li>
                                    <li>Bootstrap 5</li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow-sm mt-5">

                    <div className="card-body">

                        <h3>
                            About This Project
                        </h3>

                        <p className="mt-3">

                            This Blog Management System provides a modern CMS
                            with Role-Based Access Control, SEO management,
                            categories, tags, image uploads and a public blog
                            website for readers.

                        </p>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}