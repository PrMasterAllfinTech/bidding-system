import React, {Fragment, useState} from "react";
import {Accordion, Card} from "react-bootstrap";
import ContextAwareToggle from "./ContextAwareToggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SellTradeData from "./SellTradeData"


function SellTrades(props) {
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

    return (
        <Fragment>
            <Card className={"smBorder fs-10 fixBottomCard"}>
                <Card.Header eventKey={props.data.id}>
                    <div className="col-1">
                        {props.data.id}
                    </div>
                    <div className="col-1">
                        {props.data.order_type == 0 ? "Venta" : "Compra"}
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
                    <div className="col-1">
                        {props.data.order_info?.id}
                    </div>
                    <div className="col">
                        <div className="row justify-content-center">
                            <div className="">
                                <button data-bn-type="button" className=" btnSmall fs-12 fc-Blue"
                                        onClick={() => alertToggle()}
                                >
                                    <FontAwesomeIcon icon={faClock}/></button>
                            </div>
                            <div className="d-none">
                                <ContextAwareToggle eventKey={props.data.id}> Details</ContextAwareToggle>
                            </div>



                            {props.data?.is_bid == "pending" &&
                            <div className="">
                                <button className={"btnSmall fc-BlueSec"}>
                                   Esperando Confirmación
                                </button>
                            </div>
                            }


                            {props.data?.is_bid == "rejected" &&
                                <div className="">
                                    <button className={"btnSmall fc-Red"}>
                                       Rechazado
                                    </button>
                                </div>
                            }


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