import { useState } from "react";
import API from "../services/api";

export default function AddUserModal({
    show,
    onClose,
    fetchUsers,
}) {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("author");
    const [status,setStatus]=useState("active");

    const createUser=async()=>{

        try{

            await API.post("/users",{

                name,
                email,
                password,
                role,
                status,

            });

            alert("User Created Successfully");

            fetchUsers();

            onClose();

        }

        catch(err){

            alert(err.response?.data?.message);

        }

    }

    if(!show) return null;

    return(

<div
className="modal d-block"
style={{background:"rgba(0,0,0,.5)"}}
>

<div className="modal-dialog">

<div className="modal-content">

<div className="modal-header">

<h4>Add User</h4>

<button
className="btn-close"
onClick={onClose}
/>

</div>

<div className="modal-body">

<input
className="form-control mb-3"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
className="form-control mb-3"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="form-control mb-3"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<select
className="form-select mb-3"
value={role}
onChange={(e)=>setRole(e.target.value)}
>

<option value="author">

Author

</option>

<option value="editor">

Editor

</option>

</select>

<select
className="form-select"
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

<option value="active">

Active

</option>

<option value="inactive">

Inactive

</option>

</select>

</div>

<div className="modal-footer">

<button
className="btn btn-secondary"
onClick={onClose}
>

Cancel

</button>

<button
className="btn btn-success"
onClick={createUser}
>

Create User

</button>

</div>

</div>

</div>

</div>

    );

}