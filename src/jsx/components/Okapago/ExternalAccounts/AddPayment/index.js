import React, {useContext, useState, useEffect, Fragment} from "react";
import {Button, Modal } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-spinners/ClipLoader";
import {ThemeContext} from "../../../../../context/ThemeContext";
import "../index.css"
import ConfirmOrder from "../../SinglePageOtc/Buy-Sell/ConfirmOrder";


//Components used //
function AccountData(props) {

    console.dir(props)

    const [ type, setType] = useState('asset')

    const [formStep, setFormStep] = useState(1)

    function goBack () {
        if (formStep < 2 ) return null
        setFormStep(e=> e-1)
    }

    function goForward () {
        if (formStep > 3 ) return null
        setFormStep(x=> x+1)
    }

    useEffect(()=>{
        if (formStep === 3) props.modalSend()
    },[formStep])


    return (      <div className="card-body" >
        <div className="basic-form">
            <form>

                {formStep == 1 &&
                    <Fragment>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label fs-12">Cliente</label>

                            <select id="asset" name="asset"
                                    className="custom-select col-9 px-0 fs-10 fc-DarkGrey light-form-control br-75 height-35"
                                    defaultValue={1}>
                                <option value="1">Carlos</option>
                                <option value="2">John</option>
                                <option value="3">Reinaldo</option>
                            </select>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label fs-12">Tipo</label>

                            <select id="asset" name="asset"
                                    className="custom-select col-9 px-0 fs-10 fc-DarkGrey light-form-control br-75 height-35"
                                    defaultValue={type}
                                    onChange={e => setType(e.target.value)}>
                                <option value="asset">Asset</option>
                                <option value="fiat">Fiat</option>
                            </select>
                        </div>

                        {type === 'asset' ?
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label fs-12">Asset</label>

                                <select id="asset" name="asset"
                                        className="custom-select col-9 px-0 fs-10 fc-DarkGrey light-form-control br-75 height-35"
                                        defaultValue={1}>
                                    <option value="1">USDT</option>
                                    <option value="2">USDC</option>
                                    <option value="3">USDX</option>
                                </select>
                            </div>
                            :
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label fs-12">Fiat</label>

                                <select id="fiat" name="fiat"
                                        className="custom-select col-9 px-0 fs-10 fc-DarkGrey light-form-control br-75 height-35"
                                        defaultValue={1}>
                                    <option value="1">USD $</option>
                                    <option value="2">Ves Bs</option>
                                </select>
                            </div>
                        }
                    </Fragment>
                }

                {formStep == 2 && type === 'asset' &&
                    <Fragment>
                        <div className="form-group row"><label className="col-sm-3 col-form-label fs-12">Adress</label>
                            <div className="col-sm-9 px-0">
                                <input  id="adress" type="text" className="form-control fs-12" placeholder="Dirección de Billetera"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label fs-12">Network</label>

                            <select id="asset" name="asset"
                                    className="custom-select col-9 px-0 fs-10 fc-DarkGrey light-form-control br-75 height-35"
                                    defaultValue={'trc20'}
                            >
                                <option value="erc20">ERC20</option>
                                <option value="trc20">TRC20</option>
                                <option value="matic">Matic</option>
                            </select>
                        </div>
                    </Fragment>
                }


                {formStep == 2 && type === 'fiat' &&
                    <Fragment>
                        <div className="form-group row"><label className="col-sm-3 col-form-label fs-12">Titular</label>
                            <div className="col-sm-9 px-0">
                                <input id="name" type="text" className="form-control fs-12"
                                       placeholder="Titular de cuenta"
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label fs-12">Banco</label>

                            <select id="asset" name="asset"
                                    className="custom-select col-9 px-0 fs-10 fc-DarkGrey light-form-control br-75 height-35"
                                    defaultValue={'trc20'}
                            >
                                <option value="banesco">Banesco</option>
                                <option value="fc">Fondo Comun</option>
                                <option value="bbva">BBVA</option>
                            </select>
                        </div>

                        <div className="form-group row"><label className="col-sm-3 col-form-label fs-12">Número</label>
                            <div className="col-sm-9 px-0">
                                <input id="number" type="text" className="form-control fs-12"
                                       placeholder="Número de cuenta"
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label fs-12">Id Asociado</label>
                            <div className="col-sm-9 px-0">
                                <div className=" form-group  row justify-content-center">
                                    <select id="idBT" name="idBT"
                                            className="custom-select br-75  col-sm-3 idType fs-12 idType"
                                            defaultValue={'v'}>
                                        <option value="v">V</option>
                                        <option value="j">J</option>
                                        <option value="r">R</option>
                                        <option value="e">E</option>
                                    </select>

                                    <input id="idNumber" type="text" className="form-control col-sm-8 fs-12"
                                           placeholder="id asociado a la cuenta"
                                    />
                                </div>
                            </div>
                        </div>
                    </Fragment>
                }


            </form>
            <div className="row justify-content-around mt-5">
                <button className={`submit submit-login blueButton text-center fs-12 col-4 ${formStep < 2 ? 'd-none': null}` }
                        onClick={() => goBack()}>
                    Atras
                </button>

                <button className={`submit submit-login blueButton text-center fs-12 col-4 ${formStep > 2 ? 'd-none': null}`}
                        onClick={() => goForward()}>
                    Siguiente
                </button>
            </div>

        </div>
    </div>);
}

function AccountResponse(props) {
    //console.dir(props.response.code)
    const code = props.response.code
    let result = 'Exitoso'
    let description = 'Se ha agregado su cuenta'
    let symbol = true

    if (code !==200){
        result= 'Error'
        description = 'Revise los datos ingresados e intentelo de nuevo'
        symbol = false
    }

    return (
        <div className="card-body bg-blue-rsv text-white" >
            {props.loadingStatus ?
                <div className={"row justify-content-center bg-blue-rsv text-white"}>
                    <p>
                        Vaidando los datos ingresados
                    </p>
                    <div className={"col-12 preloaderDiv"}>
                        <Loader color={props.color} loading={props.loadingStatus} size={30} />
                    </div>
                    Esto puede tardar varios segundos. <br/>
                </div>
                :
                <div className="row bg-blue-rsv">
                    <div  className={"col-12 text-center"}>
                        {symbol ?
                            <i className="customCheckmark">✓</i>
                            :
                            <i className="customXmark">⮿</i>
                        }
                    </div>
                    <div className="col-12 text-center bg-blue-rsv text-white">
                        <h3 className={"text-white"}>{result}</h3>
                        <p>{description}<br/> </p>
                    </div>

                </div>

            }



        </div>);
}

const AddPayment= () => {
    const userData = useContext(ThemeContext);
    const customerId= userData.customerId
    //console.log(customerId)

    //modal variables
    const [basicModal, setBasicModal] = useState(false);
    const [modalData, setModalData] = useState(true);

    //data variables
    const [responseData, setResponseData] = useState('')

    const [reserve, setReserve] = useState('')
    const [holder, setHolder] = useState('')



    const postData = {account_type: "1", currency_id: '2', RIF: "", customer_id: customerId, accountnumber: "",
        holder: holder, routing: "", swift: "", address: "", zip: "", bank_id: "26", reserve_account: reserve };



    //adding account
    function modalVerify() {
        setModalData(false)
        //console.dir(postData)
        saveRequest().then(r => console.log('ejecutado savedRequest'))

    }

    const modalSend = () =>{
            setModalData(false)
            //console.dir(postData)
            saveRequest().then(r => console.log('ejecutado savedRequest'))

    }

    //account save endpoint
    const  filteredData = 'okData'

    async function saveRequest(response) {
        switch (filteredData) {
            case 'okData':

                await axios.post(`/account/save`, postData,).then( async (res) => {
                    console.dir(res.data)
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
        setReserve('')
        setHolder('')
    }

    function openModal (){
        resetData()
        //console.log(postData)
        setModalData(true)
        setBasicModal(true)
    }

    function closeModal (){
        resetData()
        setModalData(true)
        setBasicModal(false)
        setLoader(true)
    }

    //loader vars
    let [loader, setLoader] = useState(true);
    const color = "#1a5a6e"

    return (
        <div className="bootstrap-modal" >
            {/* <!-- Button trigger modal --> */}
            <button data-bn-type="button" className=" css-135aux6"  onClick={() => openModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     className="css-1j00ybj">
                    <path d="M13.5 3h-3v7.5H3v3h7.5V21h3v-7.5H21v-3h-7.5V3z" fill="currentColor"></path>
                </svg>
                Add a payment method
            </button>
            {/* <!-- Modal --> */}
            <Modal className="fade" show={basicModal} onHide={setBasicModal} centered>
                <Modal.Header className={"text-center justify-content-center"}>
                    <h4 className="text-black">Seleccione Metodo de Pago</h4>
                    <Button
                        variant=""
                        className="close"
                        onClick={() => closeModal()}
                    >
                        <span>&times;</span>
                    </Button>
                </Modal.Header>
                <Modal.Body >
                    <div className="col-xl-12 col-lg-12 bg-blue-rsv text-white">
                        <div className="card bg-blue-rsv text-white">
                            {modalData ?
                                <AccountData
                                    setName={name => setHolder(name)}
                                    setIdReserve={idReserve => setReserve(idReserve)}
                                    modalSend = {modalSend}

                                /> : <AccountResponse response={responseData}
                                                      loadingStatus={loader}
                                                      color = {color}
                                                      setLoader={loader => setLoader(loader)}/>}
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


                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default AddPayment;



