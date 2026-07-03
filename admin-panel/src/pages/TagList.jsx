import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function TagList() {

    const [tags, setTags] = useState([]);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        const res = await API.get("/tags");
        setTags(res.data);
    };

    const addTag = async () => {

        if (!name.trim()) return;

        await API.post("/tags", {
            name,
        });

        setName("");

        fetchTags();

    };

    const updateTag = async () => {

        await API.put(`/tags/${editingId}`, {
            name: editingName,
        });

        setEditingId(null);
        setEditingName("");

        fetchTags();

    };

    const deleteTag = async (id) => {

        if (!window.confirm("Delete Tag?")) return;

        await API.delete(`/tags/${id}`);

        fetchTags();

    };

    return (

        <Layout>

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-success text-white">

                        <h3>🏷️ Tag Management</h3>

                    </div>

                    <div className="card-body">

                        <div className="row mb-4">

                            <div className="col-md-6">

                                <input
                                    className="form-control"
                                    placeholder="Add Tag"
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                />

                            </div>

                            <div className="col-md-2">

                                <button
                                    className="btn btn-success w-100"
                                    onClick={addTag}
                                >
                                    Add
                                </button>

                            </div>

                            <div className="col-md-4">

                                <input
                                    className="form-control"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e)=>setSearch(e.target.value)}
                                />

                            </div>

                        </div>

                        <table className="table table-striped">

                            <thead className="table-dark">

                                <tr>

                                    <th>#</th>

                                    <th>Name</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {tags
                                    .filter(tag =>
                                        tag.name
                                            .toLowerCase()
                                            .includes(search.toLowerCase())
                                    )
                                    .map((tag, index) => (

                                        <tr key={tag._id}>

                                            <td>{index + 1}</td>

                                            <td>

                                                {editingId === tag._id ? (

                                                    <input
                                                        className="form-control"
                                                        value={editingName}
                                                        onChange={(e)=>setEditingName(e.target.value)}
                                                    />

                                                ) : (

                                                    tag.name

                                                )}

                                            </td>

                                            <td>

                                                {editingId === tag._id ? (

                                                    <>
                                                        <button
                                                            className="btn btn-success btn-sm me-2"
                                                            onClick={updateTag}
                                                        >
                                                            Save
                                                        </button>

                                                        <button
                                                            className="btn btn-secondary btn-sm"
                                                            onClick={() => {
                                                                setEditingId(null);
                                                                setEditingName("");
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>

                                                ) : (

                                                    <>
                                                        <button
                                                            className="btn btn-warning btn-sm me-2"
                                                            onClick={() => {
                                                                setEditingId(tag._id);
                                                                setEditingName(tag.name);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => deleteTag(tag._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </>

                                                )}

                                            </td>

                                        </tr>

                                    ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </Layout>

    );

}