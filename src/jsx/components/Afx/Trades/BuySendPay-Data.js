import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from "react-spinners/ClipLoader";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";

function BuySendPayData(props) {
    console.dir('send_type '+props.send_type)
    //loader vars

    return (
        <div className="card-body bg-blue-rsv">
            {props.send_type== 0 ?
                <div className="basic-form text-white">
                    <div className="form-group row mb-3"><label className="col-sm-12 col-form-label fs-14 text-center ">Datos de
                        Transferencia</label>
                    </div>

                    <div className="row fc-BlueSec  my-2 text-center">
                        <div className="col mb-2 fs-12 text-right">
                            Banco:
                        </div>
                        <div className="col text-white fs-12 text-left">
                            {props.data.order_info?.account_in.bank_info.name}
                        </div>
                    </div>

                    <div className="row fc-BlueSec  my-2 text-center">
                        <div className="col mb-2 fs-12 text-right">
                            Cuenta:
                        </div>
                        <div className="col text-white fs-12 text-left">
                            {props.data.order_info?.account_in.input_fields.cuenta}
                        </div>
                    </div>

                    <div className="row fc-BlueSec my-2 text-center">
                        <div className="col-6 mb-2 text-right fs-12 text-left">
                            Documento:
                        </div>
                        <div className="col-6 text-white text-left">
                            {props.data.order_info?.account_in.input_fields.cedula}
                        </div>
                    </div>

                    <div className="row  my-2 text-center">
                        <div className="col mb-2 fs-12 text-right fc-Green text-left">
                            Total:
                        </div>
                        <div className="col fc-Green fs-12 text-left">
                            {props.total} Bs
                        </div>
                    </div>


                    <div className="form-group row justify-content-center mb-n5 mt-3">
                        <label className="col-sm-12  text-right col-form-label fs-14 text-center mb-2">Referencia Bs</label>
                        <div className="col-sm-12 my-2">
                            <input id="refVal" type="text" className="form-control fs-12 text-center"
                                   placeholder="Referencia para validar"
                                   onChange={(e) => props.setReference(e.target.value)}
                                   value={props.reference}
                            />
                        </div>
                    </div>
                </div>
                :
                <div className="basic-form text-white">
                    <div className="form-group row mb-3"><label className="col-sm-12 col-form-label fs-14 text-center ">Datos de
                        Transferencia RSV</label>
                    </div>

                    <div className="row fc-BlueSec  my-2 text-center">
                        <div className="col mb-2 fs-12 text-right">
                            Cuenta:
                        </div>
                        <div className="col text-white fs-12 text-left">
                            {props.data?.order[0]?.RSV_reserve_account}
                        </div>
                    </div>

                    <div className="row  my-2 text-center">
                        <div className="col mb-2 fs-12 text-right fc-Green text-left">
                            Total:
                        </div>
                        <div className="col fc-Green fs-12 text-left">
                            {props.data?.order[0]?.amount} Bs
                        </div>
                    </div>


                    <div className="form-group row justify-content-center mb-n5 mt-3">
                        <label className="col-sm-12  text-right col-form-label fs-14 text-center mb-2">
                            Referencia {props.send_type==0 ? "Bs" : "RSV"}</label>
                        <div className="col-sm-12 my-2">
                            <input id="refVal" type="text" className="form-control fs-12 text-center"
                                   placeholder="Referencia para validar"
                                   onChange={(e) => props.setReference(e.target.value)}
                                   value={props.reference}
                            />
                        </div>
                    </div>
                </div>}
        </div>);
}

export default BuySendPayData