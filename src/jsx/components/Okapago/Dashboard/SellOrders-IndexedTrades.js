import React, {Fragment, useContext, useEffect} from "react";
import {Card} from "react-bootstrap";
import ConfirmAlert from "./Confirm";
import axios from "axios";
import BuyOrderSendPay from "./Buy-SendPay";
import get from "lodash/get"
import Reference from "../DashboardTrades/Reference";
import Confirm from "./Confirm";
import Deny from "./Deny";
import {ThemeContext} from "../../../../context/ThemeContext";

function SellIndexedTrades(props) {
    const customer = useContext(ThemeContext);
    const tradeCase= props.trade?.trade_case
    const tradeStatus= props.trade.status

    let tradeColor= "#ffffff"

    const statusColor={
        0: "#FFFFFF",
        1: "#b5f2d1",
        2: "#eaed9c",
        3: "#c6c4c4"
    }

    // console.log(props)
    function parsing(number) {
        return parseFloat(number).toFixed(2)
    }

    //parsing Status

    let status =''
    switch (props.trade?.status) {
        case '0':
            status = "Esperando pago"
            break;
        case '1':
            status = "Realizando Pagos"
            break;
        case '2':
            status = "Segundo Pago Realizado"
            break;
        case '3':
            status = "Cerrado"
            break;
        default:
    }

    const confirmData = {customer_id: props.customer_id, trade_id: props.trade.id, reference: props.trade.bc_reference}
    const denyData = {customer_id: props.customer_id, trade_id: props.trade.id, reference: props.trade.bc_reference,
        comments: ""}


    return (
        <Fragment>

            <div className="row justify-content-center borderBottomGreen align-items-center fs-10"
                 style={{backgroundColor: statusColor[props.trade.status] }}>
                <div className="col-1">
                    {props.trade.id}
                </div>
                <div className="col-1">
                    {props.trade.amount}
                </div>
                <div className="col-1">
                    {props.trade.exchange_rate}
                </div>
                <div className="col-2">
                    {parsing(props.trade.amount * props.exchange)} Bs
                </div>
                <div className="col-2 fs-10">
                    {status}
                </div>
                <div className="col-2 fs-10">
                    <div className="row justify-content-center">
                        RSV:  {props.trade.rsv_reference}
                    </div>
                    <div className="row justify-content-center">
                        Bs: {props.trade.bc_reference}
                    </div>
                </div>


                <div className="col">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-6">
                            {tradeCase ==  1 && tradeStatus== 0 && customer.customerLevel!=2 &&
                                <BuyOrderSendPay
                                    total={parsing(props.trade.amount * props.exchange)}
                                    customer_id={props.customer_id}
                                    order ={props.order}
                                    trade={props.trade}
                                    setReload={val => props.setReload(val)}
                                    setLoader={val => props.setLoader(val)}
                                    confirmData={props.confirmData}
                                    send_type={1}
                                />
                            }

                            {tradeCase ==  1 &&  tradeStatus== 1 && customer.customerLevel==2 &&
                                <BuyOrderSendPay
                                    total={parsing(props.trade.amount * props.exchange)}
                                    customer_id={props.customer_id}
                                    order ={props.order}
                                    trade={props.trade}
                                    setReload={val => props.setReload(val)}
                                    setLoader={val => props.setLoader(val)}
                                    confirmData={props.confirmData}
                                    send_type={1}
                                />
                            }

                            {tradeCase ==  2 && tradeStatus== 0 && customer.customerLevel!=2 &&
                                <BuyOrderSendPay
                                    total={parsing(props.trade.amount * props.exchange)}
                                    customer_id={props.customer_id}
                                    order ={props.order}
                                    trade={props.trade}
                                    setReload={val => props.setReload(val)}
                                    setLoader={val => props.setLoader(val)}
                                    confirmData={props.confirmData}
                                    send_type={1}
                                />
                            }

                            {tradeCase ==  2 &&  tradeStatus== 1 && customer.customerLevel==2 &&
                                <BuyOrderSendPay
                                    total={parsing(props.trade.amount * props.exchange)}
                                    customer_id={props.customer_id}
                                    order ={props.order}
                                    trade={props.trade}
                                    setReload={val => props.setReload(val)}
                                    setLoader={val => props.setLoader(val)}
                                    confirmData={props.confirmData}
                                    send_type={1}
                                />
                            }

                            {tradeCase ==  3 && tradeStatus== 0 &&
                                <BuyOrderSendPay
                                    total={parsing(props.trade.amount * props.exchange)}
                                    customer_id={props.customer_id}
                                    order ={props.order}
                                    trade={props.trade}
                                    setReload={val => props.setReload(val)}
                                    setLoader={val => props.setLoader(val)}
                                    confirmData={props.confirmData}
                                    send_type={1}
                                />
                            }

                        </div>
                        <div className="col-4 d-none">
                            <button className={"btnSmall fc-Orange"}>
                                Dispute
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </Fragment>
    );
}

export default SellIndexedTrades