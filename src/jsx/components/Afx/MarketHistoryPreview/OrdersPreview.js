import React, {Fragment} from "react"


const OrdersPreview = (props) => {


    return (
        <Fragment>
                <div className={`d-flex row py-1 justify-content-center ${props.type==="buy" ? "fc-Green": "fc-Red"}`}>
                    <div className="col fs-10 text-center">
                        {props.data.amount}
                    </div>
                    <div className="col fs-10 text-center">
                        {props.data.exchange_rate} Bs
                    </div>
                </div>
        </Fragment>
    )
}

export default  OrdersPreview