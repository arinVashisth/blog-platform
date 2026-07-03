import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import AddUserModal from "../components/AddUserModal";
import Layout from "../components/Layout";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showModal,setShowModal]=useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    try {

      await API.post("/users", {
        name,
        email,
        password,
        role,
        status,
      });

      toast.success("User Created Successfully");

      fetchUsers();

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setRole("author");
      setStatus("active");

      // Close modal
      onClose();

    } catch (err) {

      toast.error(err.response?.data?.message || "Failed to create user");

    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <Layout>
      <div className="container mt-4">

        <div
        className="d-flex justify-content-between align-items-center mb-4"
        >

          <h1>

          👥 User Management

          </h1>

          <button
          className="btn btn-primary"
          onClick={()=>setShowModal(true)}
          >

          + Add User

          </button>

        </div>

        <table className="table table-striped table-hover shadow">

          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user, index) => (

              <tr key={user._id}>

                <td>{index + 1}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>{user.status}</td>

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      <AddUserModal

        show={showModal}

        onClose={()=>setShowModal(false)}

        fetchUsers={fetchUsers}

        />
    </Layout>
  );
}