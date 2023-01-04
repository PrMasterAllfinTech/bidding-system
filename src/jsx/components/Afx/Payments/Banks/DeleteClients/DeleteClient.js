import React from 'react';
import PropTypes from 'prop-types';
import Swal from "sweetalert2";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const DeleteClient = props => {
    const {deleteData} = props

    async function deleteToggle(){
        await  Swal.fire({
            title: 'Are you sure you want to delete this currency?',
            text: "this action may not be undone",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Proceed',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                props.setLoader(true)
                await axios.post(`/clients/delete`, deleteData,).then(async (res) => {
                    //console.dir(res.data)

                    props.setReload(true)
                    await Swal.fire(
                        res.data.code === 200 ? 'Deleted!' : 'Error',
                        res.data.code === 200 ? 'Client status changed to inactive.'
                            : 'Delete action failed, contact an Operator.',
                        res.data.code === 200 ? 'success' : "error"
                    )
                });

            }
        })
    }

    return(
        <div className="col-6"><span className={"fc-Red cursor-pointer"} onClick={()=>deleteToggle()}>Delete</span></div>
    )
};

DeleteClient.propTypes = {

};

export default DeleteClient;