import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function ContactMessages() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {

        try {

            const res = await API.get("/contact");

            setMessages(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const markRead = async (id) => {

        try {

            await API.put(`/contact/${id}/read`);

            fetchMessages();

            window.dispatchEvent(
                new Event("refreshUnreadCount")
            );

        } catch (err) {

            console.log(err);

        }

    };

    const deleteMessage = async (id) => {

        if (!window.confirm("Delete this message?")) return;

        try {

            await API.delete(`/contact/${id}`);

            fetchMessages();

            window.dispatchEvent(
                new Event("refreshUnreadCount")
            );

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <Layout>

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3>
                            📩 Contact Messages
                        </h3>

                    </div>

                    <div className="card-body">

                        {messages.length === 0 ? (

                            <h5>No Messages Found.</h5>

                        ) : (

                            <table className="table table-striped">

                                <thead className="table-dark">

                                    <tr>

                                        <th>#</th>

                                        <th>Name</th>

                                        <th>Email</th>

                                        <th>Subject</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {messages.map((message,index)=>(

                                        <tr key={message._id}>

                                            <td>{index+1}</td>

                                            <td>{message.name}</td>

                                            <td>{message.email}</td>

                                            <td>{message.subject}</td>

                                            <td>

                                                <span
                                                    className={`badge ${
                                                        message.status==="read"
                                                        ? "bg-success"
                                                        : "bg-warning text-dark"
                                                    }`}
                                                >
                                                    {message.status}
                                                </span>

                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#message${message._id}`}
                                                >
                                                    View
                                                </button>

                                                {message.status === "unread" ? (

                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => markRead(message._id)}
                                                >

                                                    Mark Read

                                                </button>

                                                ) : (

                                                <button
                                                    className="btn btn-secondary btn-sm me-2"
                                                    disabled
                                                >

                                                    Read ✓

                                                </button>

                                                )}

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={()=>deleteMessage(message._id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                            {/* Modal */}

                                            <div
                                                className="modal fade"
                                                id={`message${message._id}`}
                                                tabIndex="-1"
                                            >

                                                <div className="modal-dialog modal-lg">

                                                    <div className="modal-content">

                                                        <div className="modal-header">

                                                            <h5>

                                                                {message.subject}

                                                            </h5>

                                                            <button
                                                                className="btn-close"
                                                                data-bs-dismiss="modal"
                                                            ></button>

                                                        </div>

                                                        <div className="modal-body">

                                                            <h6>

                                                                Name

                                                            </h6>

                                                            <p>

                                                                {message.name}

                                                            </p>

                                                            <h6>

                                                                Email

                                                            </h6>

                                                            <p>

                                                                {message.email}

                                                            </p>

                                                            <h6>

                                                                Message

                                                            </h6>

                                                            <p>

                                                                {message.message}

                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        )}

                    </div>

                </div>

            </div>

        </Layout>

    );

}