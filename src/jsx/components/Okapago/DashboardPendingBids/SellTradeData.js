import React, {Fragment, useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-regular-svg-icons";


const SellTradeData = (props) => {

    const [copied, setCopied] = useState(false)
    const allfinRsv = 'allfin1'

    return(
        <Fragment>
                    <div className="row justify-content-center">
                        <div className="col-12 mb-4 fc-BlueSec">
                            Datos de la Orden
                        </div>
                    </div>


                    <div className="d-flex row justify-content-center">

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec">
                                    Id
                                </div>
                                <div className="col-12">
                                    {props.data.amount}
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec ">
                                    RSV
                                </div>
                                <div className="col-12 ">
                                    Allfinpayments1
                                    <CopyToClipboard
                                        text={"Allfinpayments1"}
                                        onCopy={() => setCopied(true)}><span>
                                        <FontAwesomeIcon icon={faCopy} className={"ctc ml-1"}/></span>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec">
                                    Tasa
                                </div>
                                <div className="col-12">
                                    {props.data.rsv_reference}
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec">
                                    Estado de Transferencia
                                </div>
                                <div className="col-12">
                                    {
                                        {
                                            '2': 'Referencia Validada',
                                            '0': 'Referencia Invalida'
                                        }[props.data?.rsv_status]
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

        </Fragment>

    )
}

export default SellTradeData