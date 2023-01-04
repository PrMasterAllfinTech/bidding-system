import {Nav, Tab} from "react-bootstrap";
import Dashboard from "../../Dashboard/Dashboard"
import Trades from "../../DashboardTrades/DashboardTrades"
import ActiveBids from "../../DashboardBids/DashboardBids"
import PendingBids from "../../DashboardPendingBids/DashboardPendingBids"
import OrderBook from "./Market/OrderBook"


const Tabs = ()=>{
    return(
        <>
               <OrderBook />
        </>
    )
}

export default Tabs