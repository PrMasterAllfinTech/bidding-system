import React, {Fragment, useEffect, useState, useContext} from "react";
import {Row} from "react-bootstrap";
import axios from "axios";
import Loader from "react-spinners/ClipLoader";
import ConfirmOrder from "./ConfirmOrder";
import {ThemeContext} from "../../../../../context/ThemeContext";


const SellRSV = () => {
    //copy to clipboard
    const [copied, setCopied] = useState(false)

    //loader vars
    let [loader, setLoader] = useState(true);
    const color = "#1a5a6e"

    const userData = useContext(ThemeContext);
    const customer_id= userData.customerId
    //variables

    const [query, setQuery] = useState([])
    const [reload, setReload] = useState(false)
    const [formStep, setFormStep] = useState(true)

    //postData Vars

    const [amount, setAmount] = useState([])

    const [exchangeRate, setExchangeRate] = useState('')
    const [reference, setReference] = useState('')
    const [accountBank, setAccountBank] = useState('')
    const [accountRSV, setAccountRsv] = useState('')
    const [maxTime, setMaxTime] = useState("2")
    const [alias, setAlias] = useState('')

    const postData = {
        type: "sell",
        amount: amount,
        exchange_rate: exchangeRate,
        life_time: maxTime,
        account_id_in: accountBank,
        account_id_out: accountRSV
    }

    function clearForm() {
        setFormStep(true)
        setReload(false)
        setAmount("")
        setExchangeRate("")
        setReference("")
        setMaxTime("2")
        // console.log(postData)
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
                    console.log('fail loading accounts createsell');
                }

            }
        )()
    }, []);

    //console.log(accountBank+' - '+accountRSV)

    return (
        <Fragment>
            <Row className={"justify-content-center bg-white"}>
                <div className="col-12">
                    {formStep ?
                        <div className="">
                            {loader ?
                                <div className={"row justify-content-center"}>
                                    <div className={"col-12 preloaderDiv"}>
                                        <Loader color={color} loading={loader} size={50}/>
                                    </div>
                                </div>
                                :
                                <div className="row">
                                    <div className="container col-12 px-5">

                                        <div className="form-group row my-4 border border-light">
                                            <label className="col-sm-6 text-right col-form-label fs-12 fc-DarkGrey
                                            font-weight-bold">
                                                Cantidad RSV</label>
                                            <div className="col-sm-6 px-0">
                                                <input id="amount" type="text" className="form-control light-form-control fs-12"
                                                       placeholder=""
                                                       onChange={(e) => setAmount(e.target.value)}
                                                       value={amount}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row my-4 border border-light">
                                            <label className="col-sm-6 text-right col-form-label fs-12 fc-DarkGrey
                                            font-weight-bold">
                                                Tasa</label>
                                            <div className="col-sm-6 px-0">
                                                <input id="exchange" type="text" className="form-control light-form-control fs-12"
                                                       placeholder=""
                                                       onChange={(e) => setExchangeRate(e.target.value)}
                                                       value={exchangeRate}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row my-4 border border-light">
                                            <label className="col-sm-6 text-right col-form-label fs-12 fc-DarkGrey
                                            font-weight-bold">Recibir
                                                Pago</label>
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
                                        <div className="form-group row my-4 border border-light">
                                            <label className="col-sm-6 text-right col-form-label fs-12 fc-DarkGrey
                                            font-weight-bold">Pagar
                                                desde</label>
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
                                        <br/><br/>
                                        <div className="row justify-content-center">
                                            <button className={"btn btn-secondary text-center fs-12 col-12"}
                                                    onClick={() => setFormStep(false)}>
                                                Vender RSV &raquo;
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            }
                        </div>

                        :

                        <div className="card-body stepH">
                            <div className="container">

                                <div className="row">

                                    <div className="col-12 text-center">
                                        <button className={"btn btn-secondary text-center col-12 "}
                                                onClick={() => setFormStep(true)}

                                        >&laquo;Volver
                                        </button>
                                    </div>

                                    <div className="col-12 leftorder my-4">
                                        <div className="col-12 py-2 text-center fc-cool-blue font-weight-bold">
                                            Datos de su Orden:
                                        </div>

                                        <div className="row justify-content-center text-center border border-light fs-12">
                                            <div className="col-12 ">
                                              <p className="fc-DarkGrey d-inline-block">Cantidad:</p>
                                                    <p className="d-inline-block fc-DarkGrey font-weight-bold pl-2">{amount}</p>
                                            </div>
                                            <div className="col-12">
                                                <p className="fc-DarkGrey d-inline-block">Tasa:</p>
                                                <p className="d-inline-block fc-DarkGrey font-weight-bold pl-2">{exchangeRate}</p>
                                            </div>
                                            <div className="col-12 d-none">
                                                <p className="fc-DarkGrey  d-inline-block">Cuenta:</p>
                                                <p className="d-inline-block fc-DarkGrey font-weight-bold pl-2">{alias}</p>
                                            </div>
                                            <div className="col-12">
                                                <p className="fc-DarkGrey d-inline-block">Tiempo:</p>
                                                <p className="d-inline-block fc-DarkGrey font-weight-bold pl-2">{maxTime}</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>


                                <div className="form-group row justify-content-center mt-4">
                                    <ConfirmOrder
                                        bankAccount={accountBank}
                                        rsvAccount={accountRSV}
                                        clearForm={() => clearForm()}
                                        postData={postData}
                                        view={"/orden-venta"}
                                    />
                                </div>


                            </div>


                        </div>
                    }

                </div>
            </Row>
        </Fragment>
    );
};

export default SellRSV;

//components used
