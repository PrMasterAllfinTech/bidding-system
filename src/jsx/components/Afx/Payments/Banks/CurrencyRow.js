import React, {useState} from 'react';
import DeleteClient from "./DeleteClients/DeleteClient"
import EditClient from "./EditClients/EditClient"

CurrencyRow.propTypes = {
    
};

function CurrencyRow({data}) {
    const [editModal, setEditModal] = useState(false)
    const {id, name, slug, type, symbol, status} = data
    const badge = {
        active: "badge badge-success light bg-main",
        pending: "badge badge-warning light bg-main",
        inactive: "badge badge-danger light bg-main"
    }

    const custom = {'border-bottom': "1px solid #000"}

    return (
        <div className={`row justify-content-center mb-3 fs-12 py-1 align-items-center`}>
            <div className="col-1 single-row">{id}</div>
            <div className="col-2 single-row">{name}</div>
            <div className="col-1 single-row">{type}</div>
            <div className="col-1 single-row">{slug}</div>
            <div className="col-1 single-row">{symbol}</div>
            <div className="col-1 single-row"><span className={`${badge[status]}`}>{status}</span></div>
            <div className="col-2 single-row" >
                    <div className="row">
                        <div className="col-6"><span className={"fc-cool-blue cursor-pointer"} onClick={()=>setEditModal(true)}>Edit</span></div>
                        <EditClient show={editModal} onHide={() => setEditModal(false)} user={data}/>
                       <DeleteClient deleteData={data} />
                    </div>
            </div>
        </div>
    );
}

export default CurrencyRow;