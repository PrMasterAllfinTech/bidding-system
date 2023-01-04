import {Button, Modal } from "react-bootstrap";
import {useState, Fragment} from "react"
import Data from "./Data"
import PropTypes from 'prop-types';

const EditClient = props => {

    const {show, onHide, user} = props
    const modalData = true
    const [step, setStep] = useState(1)
    return (
        <Modal{...props} size="lg" aria-labelledby="contained-modal-title-vcenter"  dialogClassName="modal-80w"  centered>
            <Modal.Header className={"text-center justify-content-center"}>
                <h4 className="text-black">Edit Client</h4>
                <Button variant="" className="close" onClick={() => onHide()}><span>&times;</span></Button>
            </Modal.Header>
            <Modal.Body >
                <div className="col-xl-12 col-lg-12 text-white">
                    <div className="card bg-main text-white">
                        {step === 1 ?
                            <Data user={user}/>: "2"
                        }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className={"text-center justify-content-center"}>
                <Button onClick={() => onHide()} variant="danger light" className={"btn-100"}>Back</Button>

                <Button variant="primary" onClick={() => onHide()} className={"btn-100"}> Edit </Button>
            </Modal.Footer>
        </Modal>
    );
};

EditClient.propTypes = {

};

export default EditClient;