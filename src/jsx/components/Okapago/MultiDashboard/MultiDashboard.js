import Dashboard from "../Dashboard/Dashboard"
import DashboardTrade from "../DashboardTrades/DashboardTrades"
import {Fragment} from "react"
import DashboardBids from "../DashboardBids/DashboardBids";
import DashboardPendingBids from "../DashboardPendingBids/DashboardPendingBids";

const MultiDashboard = () =>{

    return(
        <Fragment>
            <Dashboard />

            <div className="my-5">
                <DashboardTrade />
            </div>

            <div className="my-5">
                <DashboardBids />
            </div>

            <div className="my-5">
                <DashboardPendingBids />
            </div>

        </Fragment>
    )
}

export default MultiDashboard