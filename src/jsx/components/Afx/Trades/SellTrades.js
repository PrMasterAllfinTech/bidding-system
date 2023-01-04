import React, {Fragment, useContext, useState} from "react";
import {Accordion, Card} from "react-bootstrap";
import ContextAwareToggle from "./ContextAwareToggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Reference from "./Reference";
import {faClock, faCopy} from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ConfirmAlert from "../Orders/Confirm";
import SellTradeData from "./SellTradeData"
import Deny from "../Orders/Deny";
import BuyTradeSendPay from "./Buy-SendPay";
import {ThemeContext} from "../../../../context/ThemeContext";

function SellTrades(props) {
    const customer = useContext(ThemeContext);

    const tradeCase= props.data?.trade_case
    const tradeStatus= props.data.status
    const statusColor={
        0: "#FFFFFF",
        1: "#b5f2d1",
        2: "#eaed9c",
        3: "#c6c4c4"
    }

    //console.dir(props)
    let transferAmount = 0
    if (props.data.amount != undefined) (transferAmount = parseFloat(props.data.amount * props.data.exchange_rate).toFixed(2))

    const deleteData = {orderId: props.data.id};
    const MySwal = withReactContent(Swal)

    async function alertToggle() {
        await MySwal.fire({
            title: <strong>Tiempo Restante</strong>,
            html: <i>Restan : {props.data.order_time}:00hrs para dar de baja a esta orden</i>,
            icon: 'info'
        })
    }

    //console.dir(props.data.trades)
    function parsing(number) {
        return parseFloat(number).toFixed(2)
    }

    //Array of Trades
    const arrayTrades = props.data.trades
    //parsing Status
    let status = ''
    const disabled = status == 3 || status == 4
    //console.log(disabled)



    switch (props.data?.status) {
        case '0':
            status = "Referencia Pendiente"
            break;
        case '1':
            switch ( props.data.bc_status) {
                case '0':
                    status = "Pago Pendiente"
                    break
                case '1':
                    status = "Pago Recibido"
                    break
                case '2':
                    status = "Pago Confirmado"
                    break
            }
            break;
        case '2':
            status = "Esperando Cierre"
            break;
        case '3':
            status = "Cerrado"
            break;
        default:
    }
    const confirmData = {customer_id: props.customer_id, trade_id: props.data.id, reference: props.data.bc_reference}
    const denyData = {customer_id: props.customer_id, trade_id: props.data.id, reference: props.data.bc_reference, comments: ""}

    return (
        <Fragment>
            <Card className={"smBorder fs-10 fixBottomCard"}>
                <Card.Header eventKey={props.data.id}>
                    <div className="col-1">
                        {props.data.id}
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

                            {tradeCase ==  1 && tradeStatus== 0 && customer.customerLevel!=2 &&
                                <BuyTradeSendPay
                                    setReload={value => props.setReload(value)}
                                    setLoader = {val => props.setLoader(val)}
                                    data={props.data}
                                    disabled={disabled}
                                    total={parsing(props.data?.amount * props.data?.exchange_rate)}
                                    customer_id={props.customer_id}
                                    send_type={"1"}/>
                            }

                            {tradeCase ==  1 &&  tradeStatus== 1 && customer.customerLevel==2 &&
                                <BuyTradeSendPay
                                    setReload={value => props.setReload(value)}
                                    setLoader = {val => props.setLoader(val)}
                                    data={props.data}
                                    disabled={disabled}
                                    total={parsing(props.data?.amount * props.data?.exchange_rate)}
                                    customer_id={props.customer_id}
                                    send_type={"1"}/>
                            }

                            {tradeCase ==  2 && tradeStatus== 0 && customer.customerLevel!=2 &&
                                <BuyTradeSendPay
                                    setReload={value => props.setReload(value)}
                                    setLoader = {val => props.setLoader(val)}
                                    data={props.data}
                                    disabled={disabled}
                                    total={parsing(props.data?.amount * props.data?.exchange_rate)}
                                    customer_id={props.customer_id}
                                    send_type={"1"}/>
                            }

                            {tradeCase ==  2 &&  tradeStatus== 1 && customer.customerLevel==2 &&
                                <BuyTradeSendPay
                                    setReload={value => props.setReload(value)}
                                    setLoader = {val => props.setLoader(val)}
                                    data={props.data}
                                    disabled={disabled}
                                    total={parsing(props.data?.amount * props.data?.exchange_rate)}
                                    customer_id={props.customer_id}
                                    send_type={"1"}/>
                            }

                            {tradeCase ==  3 && tradeStatus== 1&&
                                <BuyTradeSendPay
                                    setReload={value => props.setReload(value)}
                                    setLoader = {val => props.setLoader(val)}
                                    data={props.data}
                                    disabled={disabled}
                                    total={parsing(props.data?.amount * props.data?.exchange_rate)}
                                    customer_id={props.customer_id}
                                    send_type={"1"}/>
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

                        <SellTradeData data={props.data}/>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Fragment>
    )
}

export default SellTrades