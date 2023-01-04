import React, {Fragment, useEffect, useState, useContext} from "react";
import {Row} from "react-bootstrap";
import axios from "axios";
import Loader from "react-spinners/ClipLoader";
import ConfirmOrder from "./ConfirmOrder";
import {ThemeContext} from "../../../../context/ThemeContext";
import PaymentMethodSelected from "./PaymentMethodSelected";



const CreateBuy = ({formStep, setFormStep}) => {

    //loader vars
    let [loader, setLoader] = useState(true);
    const color = "#1a5a6e"

    const userData = useContext(ThemeContext);
    const customer_id= userData.customerId


    const [query, setQuery] = useState([])
    const [reload, setReload] = useState(false)


    //postData Vars

    const [amount, setAmount] = useState([])

    const [exchangeRate, setExchangeRate] = useState('')
    const [reference, setReference] = useState('')
    const [accountRsv, setAccountRsv] = useState('')
    const [accountBank, setAccountBank] = useState('')
    const [maxTime, setMaxTime] = useState("2")
    const [fiat, setFiat] = useState('')
    const [asset, setAsset] = useState('')
    const [alias, setAlias] = useState('')

    const postData = {
        type: "buy",
        amount: amount,
        exchange_rate: exchangeRate,
        life_time: maxTime,
        account_id_in: accountRsv,
        account_id_out: accountBank
    }

    function clearForm() {
        setFormStep(1)
        setReload(false)
        setAmount("")
        setExchangeRate("")
        setReference("")
        setAccountRsv("")
        setMaxTime("2")
        // console.log(postData)
    }

    function goBack (currentStep) {
        if (currentStep < 2 ) return null
        setFormStep(currentStep-1)
    }

    function goForward (currentStep) {
        if (currentStep > 2 ) return null
        setFormStep(currentStep+1)
    }
    //Main UseEffect
    useEffect(() => {
        (
            async () => {
                try {
                    await axios.get('accounts').then((res) => {
                        //console.dir(res.data)
                        setQuery(res.data)
                        setAccountRsv(res.data?.find(account => account.currency_info.id== '1').id)
                        setAccountBank(res.data?.find(account => account.currency_info.id != 1).id)
                        setLoader(false)
                        clearForm()
                    })

                } catch (e) {
                    setLoader(false)
                    console.log('fail loading accounts');

                }

            }
        )()
    }, []);


    return(
        <Fragment>
            <Row className={"justify-content-center bg-white"}>
                <div className="col-12">
                    {loader ?
                        <div className={"row justify-content-center"}>
                            <div className={"col-12 preloaderDiv"}>
                                <Loader color={color} loading={loader} size={50}/>
                            </div>
                        </div>

                        :
                    <Fragment>

                        {formStep == 1 &&
                            <Fragment>
                                <div className="row">
                                    <div className="container col-12 px-5">

                                        <div className="form-group row my-4 justify-content-center">
                                            <label className="col-sm-2 text-right col-form-label fs-12 fc-DarkGrey border border-light
                                            font-weight-bold">Cliente</label>
                                            <select id="asset" name="asset"
                                                    className="custom-select col-2 px-0 fs-10 fc-DarkGrey light-form-control"
                                                    defaultValue={asset}
                                                    onChange={(e) => setAsset(e.target.value)}>
                                                <option value="1">Carlos</option>
                                                <option value="2">John</option>
                                                <option value="3">Reinaldo</option>
                                            </select>
                                        </div>
                                        <div className="form-group row my-4 justify-content-center">
                                            <label className="col-sm-2 text-right col-form-label fs-12 fc-DarkGrey border border-light
                                            font-weight-bold">Asset</label>
                                            <select id="asset" name="asset"
                                                    className="custom-select col-2 px-0 fs-10 fc-DarkGrey light-form-control"
                                                    defaultValue={asset}
                                                    onChange={(e) => setAsset(e.target.value)}>
                                                <option value="1">USDT</option>
                                                <option value="2">USDC</option>
                                                <option value="3">USDX</option>
                                            </select>

                                            <label className="ml-5 col-sm-2 text-right col-form-label fs-12 fc-DarkGrey border border-light
                                            font-weight-bold">Fiat</label>
                                            <select id="fiat" name="fiat"
                                                    className="custom-select col-2 px-0 fs-10 fc-DarkGrey light-form-control"
                                                    defaultValue={maxTime}
                                                    onChange={(e) => setMaxTime(e.target.value)}>
                                                <option value="1">USD $</option>
                                                <option value="2">VES Bs</option>
                                            </select>
                                        </div>
                                        <div className="form-group row my-4 justify-content-center">
                                            <label className="col-sm-2 text-right col-form-label fs-12 fc-DarkGrey border border-light
                                            font-weight-bold">Cantidad</label>
                                            <div className="col-sm-2 px-0">
                                                <input id="amount" type="text" className="form-control light-form-control fs-12"
                                                       placeholder=""
                                                       onChange={(e) => setAmount(e.target.value)}
                                                       value={amount}/>
                                            </div>

                                            <label className="ml-5 col-sm-2 text-right col-form-label fs-12 fc-DarkGrey border border-light
                                            font-weight-bold">Precio</label>
                                            <div className="col-sm-2 px-0">
                                                <input id="amount" type="text" className="form-control light-form-control fs-12"
                                                       placeholder=""
                                                       onChange={(e) => setExchangeRate(e.target.value)}
                                                       value={exchangeRate}/>
                                            </div>
                                        </div>

                                        <br/>

                                    </div>
                                </div>
                            </Fragment>
                        }


                        {formStep == 2 &&
                            <Fragment>
                                <div className="row">
                                    <div className="container col-12 px-5">

                                        <div className="form-group row my-4 border border-light">
                                            <label className="col-sm-6 text-right col-form-label fs-12 fc-DarkGrey
                                            font-weight-bold">Pagar Desde
                                            </label>
                                            <select id="rsv" name="rsv"
                                                    className="custom-select col-6 px-0 fs-10 fc-DarkGrey light-form-control"
                                                    defaultValue={"default"}
                                                    onChange={(e) => setAccountBank(e.target.value)}>
                                                <option value={"default"} disabled>
                                                    Seleccione cuenta
                                                </option>
                                                {
                                                    query?.map((query) => (

                                                            <option key={query.id} value={query.id}
                                                                    className={query.currency_info.id == 1 ? 'allfinNone' : null}>
                                                                {query.bank_info.name} {query.input_fields.titular}</option>

                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <Fragment>
                                            <div className="form-group row my-4 border border-light">
                                                <label className="col-sm-6 text-right col-form-label fs-12 fc-DarkGrey
                                            font-weight-bold">Recibir Pago</label>
                                                <select id="bank" name="bank"
                                                        className="custom-select col-6 px-0 fs-10 fc-DarkGrey light-form-control"
                                                        defaultValue={"default"}
                                                        onChange={(e) => setAccountRsv(e.target.value)}>
                                                    <option value={"default"} disabled>
                                                        Seleccione cuenta
                                                    </option>
                                                    {
                                                        query?.map((query) => (

                                                                <option key={query.id} value={query.id}
                                                                        className={query.currency_info.id != 1  ? 'allfinNone' : null}>
                                                                    {query.input_fields.usuario}</option>

                                                            )
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group row my-4 border border-light">
                                                <label className="col-sm-6 text-right col-form-label fs-12 fc-DarkGrey
                                            font-weight-bold">Tiempo</label>
                                                <select id="maxTime" name="time"
                                                        className="custom-select col-6 px-0 fs-10 fc-DarkGrey light-form-control"
                                                        defaultValue={maxTime}
                                                        onChange={(e) => setMaxTime(e.target.value)}

                                                >
                                                    <option value="1">1:00 hr</option>
                                                    <option value="2">2:00 hrs</option>
                                                    <option value="3">3:00 hrs</option>
                                                    <option value="4">4:00 hrs</option>
                                                    <option value="5">5:00 hrs</option>
                                                    <option value="6">6:00 hrs</option>
                                                </select>
                                            </div>
                                        </Fragment>

                                    </div>
                                </div>
                            </Fragment>
                        }

                        {formStep == 3 &&
                            <Fragment>
                                <div className="row">
                                    <div className="col-12 leftorder mt-4 mb-5">
                                        <div className="row justify-content-center text-center border border-light fs-12">
                                            <div className="col-12 ">
                                                <p className="fc-DarkGrey d-inline-block">Asset:</p>
                                                <p className="d-inline-block fc-DarkGrey font-weight-bold pl-2">{asset}</p>
                                            </div>
                                            <div className="col-12 ">
                                                <p className="fc-DarkGrey d-inline-block">Fiat:</p>
                                                <p className="d-inline-block fc-DarkGrey font-weight-bold pl-2">{fiat}</p>
                                            </div>
                                            <div className="col-12 ">
                                                <p className="fc-DarkGrey d-inline-block">Cantidad:</p>
                                                <p className="d-inline-block fc-DarkGrey font-weight-bold pl-2">{amount}</p>
                                            </div>
                                            <div className="col-12">
                                                <p className="fc-DarkGrey d-inline-block">Precio:</p>
                                                <p className="d-inline-block fc-DarkGrey font-weight-bold pl-2">{exchangeRate}</p>
                                            </div>
                                            <div className="col-12 d-none">
                                                <p className="fc-DarkGrey  d-inline-block ">Cuenta:</p>
                                                <p className="d-inline-block fc-DarkGrey font-weight-bold pl-2">{accountBank}</p>
                                            </div>
                                            <div className="col-12">
                                                <p className="fc-DarkGrey d-inline-block">Tiempo:</p>
                                                <p className="d-inline-block fc-DarkGrey font-weight-bold pl-2">{maxTime}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Fragment>
                        }

                        <div className="row justify-content-around mt-2">
                            <button className={`submit submit-login blueButton text-center fs-12 col-2 ${formStep < 2 ? 'd-none': null}` }
                                    onClick={() => goBack(formStep)}>
                                Atras
                            </button>

                            <button className={`submit submit-login blueButton text-center fs-12 col-2 ${formStep > 2 ? 'd-none': null}`}
                                    onClick={() => goForward(formStep)}>
                                Siguiente
                            </button>

                            {formStep == 3 &&

                                <div className="col-3">
                                    <ConfirmOrder
                                        clearForm={() => clearForm()}
                                        postData={postData}
                                        view={"/orden-compra"}/>
                                </div>

                            }
                        </div>


                    </Fragment>
                    }








                </div>
            </Row>
        </Fragment>
    );
};

export default CreateBuy;

//components used
