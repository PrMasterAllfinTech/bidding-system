import React, {Fragment, useEffect} from "react"
import axios from "axios";


const OrdersPreview = (props) => {
    return (
        <Fragment>
                <div className={`d-flex row p-3 fc-DarkGrey justify-content-center ${props.type==="buy" ? "flex-row-reverse": null}`}>
                    <div className="col fs-10 text-center font-weight-">
                        {"name"}
                    </div>
                    <div className="col fs-10 text-center">
                        {props.data.amount}
                    </div>
                    <div className="col fs-10 text-center font-weight-bold">
                        {props.data.exchange_rate} Bs
                    </div>
                </div>
        </Fragment>
    )
}

export default  OrdersPreview