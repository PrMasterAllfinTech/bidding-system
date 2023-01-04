import React, {Fragment, useState} from "react";
import TradeMaker from "./TradeMaker";
import BookTradeMaker from "./BookTradeMaker";
import {Dropdown} from "react-bootstrap"

function OrderBookList (props){

    //console.log(props.data)
    const [form, setForm] = useState(true)
    const [bid, setBid] = useState(false)

    const realCurrentAmount = props.data.available
    const bankName = props.data.bc_bankname

    const makeBid =  () =>{
        setForm(false)
        setBid(true)
    }
    const cancelBid =  () =>{
        setForm(false)
        setBid(false)
    }

    return(
        <Fragment>
            {form
                ?
                <div className={realCurrentAmount == 0 ? "allfinNone" :null}>
                    <div className="row ">
                        <div className="col-2 ">
                            <div className="css-e6o4x5 fs-10 pl-2">{props.data.id+100}</div>
                        </div>
                        <div className="col-2">
                            <div className="css-4ptx7h justify-content-center">
                                <div className="css-1kj0ifu">
                                    <div className="css-1m1f8hn fs-10">{props.data.exchange_rate}</div>
                                    <div className="css-dyl994 fs-10">Bs</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="css-4ptx7h justify-content-center">
                                <div className="css-1kj0ifu ">
                                    <div className="css-1m1f8hn fs-10">{realCurrentAmount}</div>
                                    <div className="css-dyl994 fs-10">RSV</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-4 ">
                            <div className="fs-10">
                                <div data-bn-type="text" className="css-e6o4x5 text-left">
                                    {"Payment Method name"}
                                </div>
                            </div>
                        </div>

                        <div className="col-2 text-center bg-white">
                            <div className="row justify-content-center ">
                                <div className={props.action == 'buy' ? 'p2p-green fs-10' : 'p2p-red fs-10'}
                                     onClick={() =>setForm(false)}
                                >{props.viewName}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                :
                <BookTradeMaker
                    makebid={makeBid}
                    cancelbid={cancelBid}
                    bid={bid}
                    reload = {value => props.reload(value)}
                    viewName = {props.viewName}
                    form = {form => setForm(form)}
                    orderData = {props.data}
                />
            }

        </Fragment>

    )
}

export default OrderBookList