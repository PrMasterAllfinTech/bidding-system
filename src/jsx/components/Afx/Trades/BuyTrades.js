import React, {Fragment, useContext, useState} from "react";
import {Accordion, Card} from "react-bootstrap";
import ContextAwareToggle from "./ContextAwareToggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Reference from "./Reference";
import {faClock, faCopy} from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import Confirm from "../Orders/Confirm";
import BuyTradeSendPay from "./Buy-SendPay";
import BuyTradeData from "./BuyTradeData";
import BuyOrderSendPay from "../Orders/Buy-SendPay";
import {ThemeContext} from "../../../../context/ThemeContext";


function BuyTrades(props) {
    const customer = useContext(ThemeContext);
    const customer_id= customer.customerId

    const tradeCase= props.data?.trade_case
    const tradeStatus= props.data.status
    const statusColor={
        0: "#FFFFFF",
        1: "#b5f2d1",
        2: "#eaed9c",
        3: "#c6c4c4"
    }

    //console.log(props)
    let transferAmount = 0
    if (props.data.amount != undefined) (transferAmount = parseFloat(props.data.amount * props.data.exchange_rate).toFixed(2))

    const deleteData = {orderId: props.data.id};

    const [copied, setCopied] = useState(false)

    const MySwal = withReactContent(Swal)

    async function alertToggle() {
        await MySwal.fire({
            title: <strong>Tiempo Restante</strong>,
            html: <i>Restan : {props.data.life_time}:00hrs para dar de baja a esta orden</i>,
            icon: 'info'
        })
    }

    //console.dir(props.data.trades)
    function parsing(number) {
        return parseFloat(number).toFixed(2)
    }

    //parsing Status
    let status = ''
    const disabled = status == "closed" || status == 4
    // console.log(disabled)


    switch (props.data?.status) {
        case 'pending':
            status = "Pago Pendiente"
            break;
        case '1':
            status = "Pago Enviado"
            break;
        case '2':
            status = "Esperando RSV"
            break;
        case '3':
            status = "Saldo liberado"
            break;
        default:
    }

    return (
        <Fragment>
            <Card className={`smBorder fs-10 fixBottomCard`}>
                <Card.Header eventKey={props.data.id}>
                    <div className="col-1">
                        {props.data.id+100}
                    </div>
                    <div className="col-1">
                        {props.data.type == "buy" ? "Buy" : "Sell"}
                    </div>
                    <div className="col-1">
                        {props.data.amount}
                    </div>
                    <div className="col-1">
                        {props.data.exchange_rate}
                    </div>
                    <div className="col-2">
                        {status}
                    </div>
                    <div className="col-2">
                        {props.data.order_info?.account_in.bank_info.name}
                    </div>
                    <div className="col">
                        <div className="row justify-content-center">
                            <div className="">
                                <button data-bn-type="button" className=" btnSmall fs-12 fc-Blue"
                                        onClick={() => alertToggle()}
                                >
                                    <FontAwesomeIcon icon={faClock}/></button>
                            </div>
                            <div className="">
                                <ContextAwareToggle eventKey={props.data.id}> Details</ContextAwareToggle>
                            </div>
                            <div>
                                {tradeCase ==  1 && tradeStatus== 0 && customer.customerLevel!=2 &&
                                    <BuyTradeSendPay
                                        setReload={value => props.setReload(value)}
                                        setLoader = {val => props.setLoader(val)}
                                        data={props.data}
                                        disabled={disabled}
                                        total={parsing(props.data?.amount * props.data?.exchange_rate)}
                                        customer_id={props.customer_id}
                                        send_type={"0"}/>
                                }

                                {tradeCase ==  1 &&  tradeStatus== 1 && customer.customerLevel==2 &&
                                    <BuyTradeSendPay
                                        setReload={value => props.setReload(value)}
                                        setLoader = {val => props.setLoader(val)}
                                        data={props.data}
                                        disabled={disabled}
                                        total={parsing(props.data?.amount * props.data?.exchange_rate)}
                                        customer_id={props.customer_id}
                                        send_type={"0"}/>
                                }

                                {tradeCase ==  2 && tradeStatus== 0 && customer.customerLevel!=2 &&
                                    <BuyTradeSendPay
                                        setReload={value => props.setReload(value)}
                                        setLoader = {val => props.setLoader(val)}
                                        data={props.data}
                                        disabled={disabled}
                                        total={parsing(props.data?.amount * props.data?.exchange_rate)}
                                        customer_id={props.customer_id}
                                        send_type={"0"}/>
                                }

                                {tradeCase ==  2 &&  tradeStatus== 1 && customer.customerLevel==2 &&
                                    <BuyTradeSendPay
                                        setReload={value => props.setReload(value)}
                                        setLoader = {val => props.setLoader(val)}
                                        data={props.data}
                                        disabled={disabled}
                                        total={parsing(props.data?.amount * props.data?.exchange_rate)}
                                        customer_id={props.customer_id}
                                        send_type={"0"}/>
                                }

                                {tradeCase ==  3 && tradeStatus== 1 &&
                                    <BuyTradeSendPay
                                        setReload={value => props.setReload(value)}
                                        setLoader = {val => props.setLoader(val)}
                                        data={props.data}
                                        disabled={disabled}
                                        total={parsing(props.data?.amount * props.data?.exchange_rate)}
                                        customer_id={props.customer_id}
                                        send_type={"0"}/>
                                }

                            </div>
                            {props.data?.status == 2  &&
                                <div className="">
                                    <button className={"btnSmall fc-Gold"}>
                                        Pago Confirmado
                                    </button>
                                </div>
                            }

                            <div className="">
                                <button className={"btnSmall fc-Orange"}>
                                    Dispute
                                </button>
                            </div>

                        </div>

                    </div>
                </Card.Header>
                <Accordion.Collapse eventKey={props.data.id}>
                    <Card.Body>
                        <BuyTradeData data={props.data} />

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Fragment>
    )
}

export default BuyTrades