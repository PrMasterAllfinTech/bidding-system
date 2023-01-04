import React, {useContext, useState} from "react";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-spinners/ClipLoader";
import {Link} from "react-router-dom";
import {faFilePen, faHouse} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ThemeContext} from "../../../../../context/ThemeContext";


function AccountResponse(props) {
    //console.dir(props)
    const error = props.response.error
    let result = 'Exitoso'
    let description = 'Su orden ha sido creada'
    let symbol = true;

    if (error ===true){
        result= 'Error'
        description = 'Contacte con un operador'
        symbol = false
    }

    return (
        <div className="card-body bg-blue-rsv" >
            {props.loadingStatus ?
                <div className={"row justify-content-center bg-blue-rsv text-white"}>
                    <p>
                        Validating Data
                    </p>
                    <div className={"col-12 preloaderDiv bg-blue-rsv"}>
                        <Loader color={props.color} loading={props.loadingStatus} size={30} />
                    </div>
                   This may take a few seconds. <br/>
                </div>
                :
                <div className="row mt-n4 bg-blue-rsv text-white">
                    <div  className={"col-12 text-center"}>
                        {symbol ?
                            <i className="customCheckmark">✓</i>
                            :
                            <i className="customXmark">⮿</i>
                        }
                    </div>
                    <div className="col-12 text-center">
                        <h3 className={"text-white"}>{result}</h3>
                        <p className={"text-white"}>{description}<br/> </p>
                    </div>
                </div>

            }



        </div>);
}

const ConfirmOrder= (props) => {
    const userData = useContext(ThemeContext);
    const customerId= userData.customerId

    //modal variables
    const [basicModal, setBasicModal] = useState(false);
    const [modalData, setModalData] = useState(true);

    //data variables
    const [dataResult, setDataResult] = useState(false)
    const [responseData, setResponseData] = useState('')

    const postData = props.postData


    //account save endpoint
    const  filteredData = 'okData'

    async function createOrder(response) {
        switch (filteredData) {
            case 'okData':

                await axios.post(`/orders`, postData,).then( async (res) => {
                    //console.dir(res.data)
                    setResponseData(res.data)
                    setLoader(false)
                });

                //await delayedRequest()
                break;
            case 'failed':
                //';
                swal("Faltan Datos - No es posible Registrar", "Verificar los datos ingresados", "error", {button: false,});
                break;
            case 'pending':
                //';
                swal("Estatus de Transacción", "Pendiente", "info", {button: false,});
                break;
            default:
                return '';
        }
    }

    //modal interaction functions

    function resetData(){
    }

    function openModal (){
        setModalData(true)
        setDataResult(false)
        setBasicModal(true)
        createOrder().then(r => console.log('orden creada'))
    }

    function closeModal (){
        setModalData(true)
        setDataResult(false)
        setBasicModal(false)
        setLoader(true)
        resetData()

        props.clearForm()
    }

    //loader vars
    let [loader, setLoader] = useState(true);
  const color = "#1a5a6e"

    return (
        <div className="bootstrap-modal" >
            {/* <!-- Button trigger modal --> */}

            <button className={"submit submit-login blueButton text-center fs-12 w-100"}
                        onClick={() => openModal()}>Confirm</button>


            {/* <!-- Modal --> */}
            <Modal className="fade" show={basicModal} onHide={setBasicModal} centered>
                <Modal.Header className={"text-center justify-content-center"}>
                    <h4 className="text-black">New Order</h4>
                    <Button
                        variant=""
                        className="close"
                        onClick={() => closeModal()}
                    >
                        <span>&times;</span>
                    </Button>
                </Modal.Header>
                <Modal.Body >
                    <div className="col-xl-12 col-lg-12">
                        <div className="card bg-blue-rsv">
                          <AccountResponse response={responseData}
                                                       closeModal={()=> closeModal()}
                                                      loadingStatus={loader}
                                                      color = {color}
                                                      setLoader={loader => setLoader(loader)}
                          />

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={"text-center justify-content-center"}>
                    <Button
                        onClick={() => closeModal()}
                        variant="danger light"
                    >
                        Close
                    </Button>


                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default ConfirmOrder;



