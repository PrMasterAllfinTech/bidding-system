import React, {Fragment, useState} from "react";
import {Accordion, Card} from "react-bootstrap";
import ContextAwareToggle from "./ContextAwareToggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SellTradeData from "./SellTradeData"
import ConfirmBid from "./Confirm";
import DenyBid from "./Deny";


function PendingBids(props) {
    //console.dir(props.data)
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

    //parsing Status
    const statusBids = {
        0: "Referencia Invalida",
        1: "Activo",
        2: "Completado",
        3: "RSV Liberado"
    }

    const status = statusBids[props.data.status] || "No definido"

    const data = {customer_id: props.customer_id, trade_id: props.data.id, reference: props.data.bc_reference}

    return (
        <Fragment>
            <Card className={"smBorder fs-10 fixBottomCard"}>
                <Card.Header eventKey={props.data.id}>
                    <div className="col-1">
                        {props.data.id}
                    </div>
                    <div className="col-1">
                        {props.data.type == 0 ? "Venta" : "Compra"}
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
                        {props.data.bc_bankname}
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
                                <ContextAwareToggle eventkey={props.data.id}> Details</ContextAwareToggle>
                            </div>




                            <div className="">
                               <ConfirmBid
                                   setReload = {value => props.setReload(value)}
                                   setLoader={val => props.setLoader(val)}
                                   confirmData = {data}

                               />

                                <DenyBid
                                    setReload = {value => props.setReload(value)}
                                    setLoader={val => props.setLoader(val)}
                                    denyData = {data}
                                />
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

export default PendingBids