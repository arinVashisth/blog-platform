import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { toast } from "react-toastify";

export default function CategoryList() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await API.get("/categories");
        setCategories(res.data);
    };

    const addCategory = async () => {

        if (!name.trim()) return;

        await API.post("/categories",{name});

        setName("");

        fetchCategories();

    };

    const updateCategory = async () => {

        await API.put(`/categories/${editingId}`,{
            name:editingName
        });

        setEditingId(null);
        setEditingName("");

        fetchCategories();

    };

    const deleteCategory = async(id)=>{

        try {

            await API.delete(`/categories/${id}`);

            toast.success("Category deleted successfully.");

            fetchCategories();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to delete category."
            );

        }

    };

    return(

    <Layout>

    <div className="container mt-4">

        <div className="card shadow">

            <div className="card-header bg-primary text-white">

                <h3>📂 Category Management</h3>

            </div>

            <div className="card-body">

                <div className="row mb-4">

                    <div className="col-md-6">

                        <input
                            className="form-control"
                            placeholder="Add Category"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />

                    </div>

                    <div className="col-md-2">

                        <button
                            className="btn btn-success w-100"
                            onClick={addCategory}
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

                        {
                            categories
                            .filter(cat=>cat.name.toLowerCase().includes(search.toLowerCase()))
                            .map((cat,index)=>(

                            <tr key={cat._id}>

                                <td>{index+1}</td>

                                <td>

                                {
                                    editingId===cat._id ?

                                    <input
                                        className="form-control"
                                        value={editingName}
                                        onChange={(e)=>setEditingName(e.target.value)}
                                    />

                                    :

                                    cat.name

                                }

                                </td>

                                <td>

                                {
                                    editingId===cat._id ?

                                    <>
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={updateCategory}
                                        >
                                            Save
                                        </button>

                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={()=>setEditingId(null)}
                                        >
                                            Cancel
                                        </button>

                                    </>

                                    :

                                    <>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={()=>{
                                                setEditingId(cat._id);
                                                setEditingName(cat.name);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={()=>deleteCategory(cat._id)}
                                        >
                                            Delete
                                        </button>
                                    </>

                                }

                                </td>

                            </tr>

                        ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    </div>

    </Layout>

    );

}