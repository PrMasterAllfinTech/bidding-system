import {Nav, Tab} from "react-bootstrap";
import Dashboard from "../../Okapago/Dashboard/Dashboard"
import Trades from "../../Okapago/DashboardTrades/DashboardTrades"
import ActiveBids from "../../Okapago/DashboardBids/DashboardBids"
import PendingBids from "../../Okapago/DashboardPendingBids/DashboardPendingBids"
import OrderBook from "./Market/OrderBook"


const Tabs = ()=>{
    return(
        <>
               <OrderBook />
        </>
    )
}

export default Tabs