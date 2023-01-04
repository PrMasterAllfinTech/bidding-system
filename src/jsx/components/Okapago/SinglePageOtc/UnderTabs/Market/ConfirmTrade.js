import React, {useState, Fragment, useEffect, useContext} from "react"
import {Row, Card, Col, Button, Modal, Container} from "react-bootstrap"
import axios from "axios"
import swal from "sweetalert"
import Loader from "react-spinners/ClipLoader"
import AccountData from "./AccountData"
import AccountResponse from "./AccountResponse"
import {ThemeContext} from "../../../../../../context/ThemeContext";

const ConfirmTrade = (props) => {
    const userData = useContext(ThemeContext);
    const customerId= userData.customerId

    const [nextButton, setNextButton] = useState(true)
    //modal variables
    const [basicModal, setBasicModal] = useState(false);
    const [modalData, setModalData] = useState(true);
    const [formStep, setFormStep] = useState(true)
    //data variables
    const [dataResult, setDataResult] = useState(false)

    const [reserve, setReserve] = useState('')
    const [bankAccount, setBankAccount] = useState()
    const [reference, setReference] = useState('')


    const tradeData = {
        order_id: props.orderData.id,
        customer_id: customerId,
        rsv_account_id: reserve,
        bc_account_id: bankAccount,
        amount: props.buyAmount,
        exchange_rate: props.exchange,
        is_bid: props.exchange !== "" ? "1": "",
        rsv_reference: reference
    }


    //console.dir(postData)

    //modal interaction functions

    function resetData() {
        setFormStep(true)
    }

    function openModal() {
        setModalData(true)
        setDataResult(false)
        setBasicModal(true)
        setReference('')
    }

    function closeModal() {
        setModalData(true)
        setDataResult(false)
        setBasicModal(false)
        setLoader(true)
        setFormStep(true)
        setNextButton(true)
        setReference('')
        props.reload(true)
        props.clearBuyAmount('');
    }

    //loader vars
    let [loader, setLoader] = useState(true);
  const color = "#1a5a6e"

    return (
        <div className="bootstrap-modal">
            {/* <!-- Button trigger modal --> */}
            <button data-bn-type="button" id="C2CofferBuy__btn_buyNow" type="button"
                    className=" css-s1iig6 fs-10"
                    onClick={() => openModal()}>
                {props.viewName}</button>

            {/* <!-- Modal --> */}
            <Modal className="fade"
                   show={basicModal}
                   size="md"
                   backdrop="static"
                   keyboard={false}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header className={"text-center justify-content-center"}>
                    <h4 className="text-black">Crear Trade</h4>
                    <Button
                        variant=""
                        className="close"
                        onClick={() => closeModal()}
                    >
                        <span>&times;</span>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-xl-12 col-lg-12">
                        <div className="card bg-dark-grey text-white">
                            {formStep ?

                                <AccountData
                                    buyAmount={props.buyAmount}
                                    viewName={props.viewName}
                                    loadingStatus={loader}
                                    color={color}
                                    customer_id={customerId}
                                    setReserve={reserve => setReserve(reserve)}
                                    reserve = {reserve}
                                    setBankAccount={bank => setBankAccount(bank)}
                                    bankAccount = {bankAccount}
                                    reference={reference}
                                    setReference={ref => setReference(ref)}
                                    setLoader={loader => setLoader(loader)}
                                    formStep={value => setFormStep(value)}
                                />
                                :
                                <AccountResponse
                                    setReference={ref => setReference(ref)}
                                    clearBuyAmount={val => props.clearBuyAmount(val)}
                                    next={value => setNextButton(value)}
                                    reload={value => props.reload(value)}
                                    viewName={props.viewName}
                                    accountNumber={props.orderData.bc_accountnumber}
                                    bankName={props.orderData.bc_bankname}
                                    rif={props.orderData.bc_RIF}
                                    tradeData={tradeData}
                                    loadingStatus={loader}
                                    color={color}
                                    customer_id={customerId}
                                    setLoader={loader => setLoader(loader)}
                                    formStep={value => setFormStep(value)}
                                    closeModal={()=>closeModal()}

                                />

                            }


                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={"text-center justify-content-center"}>
                    <Button
                        onClick={() => closeModal()}
                        variant="danger light"
                    >
                        Volver
                    </Button>

                    {nextButton &&

                    <Button
                        onClick={() => setFormStep(false)}
                        variant="primary"
                    >
                        Siguiente
                    </Button>
                    }

                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default ConfirmTrade;



