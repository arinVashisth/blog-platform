import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import API from "../services/api";

export default function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const submitMessage = async () => {

        try {

            await API.post("/contact", {

                name,
                email,
                subject,
                message,

            });

            toast.success("Message sent successfully!");

            setName("");
            setEmail("");
            setSubject("");
            setMessage("");

        } catch (err) {

            toast.error("Something went wrong.");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <div className="text-center mb-5">

                    <h1>
                        📩 Contact Us
                    </h1>

                    <p className="text-muted">

                        We'd love to hear from you.

                    </p>

                </div>

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        <div className="card shadow">

                            <div className="card-body">

                                <div className="mb-3">

                                    <label>Name</label>

                                    <input
                                        className="form-control"
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Subject</label>

                                    <input
                                        className="form-control"
                                        value={subject}
                                        onChange={(e)=>setSubject(e.target.value)}
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Message</label>

                                    <textarea
                                        rows="6"
                                        className="form-control"
                                        value={message}
                                        onChange={(e)=>setMessage(e.target.value)}
                                    />

                                </div>

                                <button
                                    className="btn btn-primary"
                                    onClick={submitMessage}
                                >

                                    Send Message

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}