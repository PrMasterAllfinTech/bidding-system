import React, {useState} from 'react';
import PropTypes from 'prop-types';
import DeleteClient from "./DeleteClients/DeleteClient"
import AddClient from "./AddClients/AddClient";
import EditClient from "./EditClients/EditClient"

ClientRow.propTypes = {
    
};

function ClientRow({user}) {
    const [editModal, setEditModal] = useState(false)
    const {id, name, email, status, role} = user
    const badge = {
        active: "badge badge-success light bg-main",
        pending: "badge badge-warning light bg-main",
        inactive: "badge badge-danger light bg-main"
    }

    const custom = {'border-bottom': "1px solid #000"}

    return (
        <div className={`row justify-content-center mb-3 fs-12 py-1 align-items-center`} style={custom}>
            <div className="col-2 ">{id}</div>
            <div className="col-2">{name}</div>
            <div className="col-2">{email}</div>
            <div className="col-2">{role}</div>
            <div className="col-2"><span className={`${badge[status]}`}>{status}</span></div>
            <div className="col-2">
                    <div className="row">
                        <div className="col-6"><span className={"fc-cool-blue cursor-pointer"} onClick={()=>setEditModal(true)}>Edit</span></div>
                        <EditClient show={editModal} onHide={() => setEditModal(false)} user={user}/>
                       <DeleteClient deleteData={user} />
                    </div>
            </div>
        </div>
    );
}

export default ClientRow;