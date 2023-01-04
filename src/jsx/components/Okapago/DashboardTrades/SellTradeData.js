import React, {Fragment, useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-regular-svg-icons";


const SellTradeData = (props) => {

    const [copied, setCopied] = useState(false)
    const allfinRsv = 'allfin1'

    return(
        <Fragment>
                <div className="d-flex row justify-content-center mt-5">
                    <div className="col-12 mb-4 fc-Green">
                        Datos de Pago Recibido
                    </div>
                </div>

                <div className="row justify-content-center ">
                    <div className="col-2">
                        <div className="row">
                            <div className="col-12 mb-2 fc-Green">
                                Banco
                            </div>
                            <div className="col-12">
                                {props.data?.bc_bankname}
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="row">
                            <div className="col-12 mb-2 fc-Green">
                                Cuenta
                            </div>
                            <div className="col-12">
                                {props.data?.bc_accountnumber}
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="row">
                            <div className="col-12 mb-2 fc-Green">
                                Referencias
                            </div>
                            <div className="col-12">
                                <div className="row justify-content-center">
                                    RSV: {props.data?.rsv_reference}
                                </div>
                                <div className="row justify-content-center">
                                    Bs: {props.data?.bc_reference}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="row">
                            <div className="col-12 mb-2 fc-Green">
                                Cantidad Bs
                            </div>
                            <div className="col-12">
                                {
                                    {
                                        '2': props.data?.amount * props.data.exchange_rate,
                                        '1': props.data?.amount * props.data.exchange_rate,
                                        '0': '  '
                                    }[props.data?.bc_status]
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="row">
                            <div className="col-12 mb-2 fc-Green">
                                Estado
                            </div>
                            <div className="col-12">
                                {
                                    {
                                        '2': ' Pago Confirmado',
                                        '1': ' Realizando pagos',
                                        '0': ' Esperando pagos'
                                    }[props.data?.bc_status]
                                }
                            </div>
                        </div>
                    </div>


                </div>


                <div className="row justify-content-center mt-5">
                    <div className="col-12 mb-2 fc-Orange">
                        Recuerde Enviar la Referencia RSV a la brevedad posible
                    </div>

                    <div className="trade-date">
                        Trade Creado:   {props.data.created}
                    </div>
                </div>


        </Fragment>

    )
}

export default SellTradeData