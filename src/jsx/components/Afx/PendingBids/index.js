import React, {Fragment, useEffect, useContext, useState} from 'react';
import {Accordion, Card} from "react-bootstrap";
import axios from 'axios'
import Loader from "react-spinners/ClipLoader";
import PendingBids from "./PendingBids";
import {ThemeContext} from "../../../../context/ThemeContext";
import FiatSearch from "../SharedComponents/FiatSearch";
import AssetSearch from "../SharedComponents/AssetSearch";
import SearchOptions from "../SharedComponents/SearchOptions";


function DashboardPendingBids(props) {
    let [loader, setLoader] = useState(true);
    const color = "#1a5a6e"

    const {user_data} = JSON.parse(localStorage.getItem('userDetails'))
    const customer_id= user_data.id

    //variables
    const [query, setQuery] = useState([])
    const [reload, setReload] = useState(false)
    const [formStep, setFormStep] = useState(true)

    let bids = []

    query.length >0 && query?.filter(order => order.trades.length > 0 && bids.push(order.trades))
    bids = bids.flat()

    const postData = {order_type: "" , status: "", show_trade_detail: "1", show_account_detail:"1", customer_id: customer_id, show_only_bid:"1"};


    //Main UseEffect
    useEffect(() => {
        const interval = setInterval(async () => {
            try{
                await axios.post('orders', postData).then((res) => {
                    // console.dir(res.data)
                    const reData = res.data
                    if (reData!=query){
                        setQuery(res.data)
                    }
                    setLoader(false)
                })
            }catch (e) {console.log('fail login');}

        }, 5000);
        return () => clearInterval(interval);
    }, [])
    useEffect(() =>{
        (
            async  ()=> {
                if (reload === false) {return null}
                try{
                    setLoader(true)
                    await axios.post('orders', postData).then((res) => {
                        console.dir("reload changed")
                        const reData = res.data
                        if (reData!=query){
                            setQuery(res.data)
                        }
                        setLoader(false)
                        setReload(false)
                    })
                }catch (e) {console.log(e + ' ' +query)
                }

            }
        )()

    }, [reload]);

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState([])
    const statusOptions = [{name: "active", value : "active"}, {name: "closed", value : "closed"},]
    return(
        <Fragment>

            <div className="row justify-content-center mb-4">
                <div className="col-12 text-center">
                    <h3 className={"fc-dark-grey"}>Bids Received</h3>
                </div>
            </div>
            <div className="row justify-content-center my-4 py-2 ">
                <div className="col-2"><FiatSearch users={users} setSearch={setSearch}/></div>
                <div className="col-2"><AssetSearch users={users} setSearch={setSearch}/></div>
                <div className="col-2"><SearchOptions query={users} setSearch={setSearch} options={statusOptions} type={'status'}/></div>
            </div>

            {loader ?
                <div className={"row justify-content-center"}>
                    <div className={"col-12 preloaderDiv"}>
                        <Loader color={color} loading={loader} size={50}/>
                    </div>
                </div>

                :

                <div className="row">
                    <div className="col-12 text-center">
                        <div className="col-12">
                            <Accordion defaultActiveKey="0">
                                <Card.Header className={"fc-DarkGrey text-center pd5"}>
                                    <div className="col-1">
                                        Id
                                    </div>
                                    <div className="col-1">
                                        Type
                                    </div>
                                    <div className="col-1">
                                        Ammount
                                    </div>
                                    <div className="col-1">
                                        Price
                                    </div>
                                    <div className="col-2">
                                        Status
                                    </div>
                                    <div className="col-2">
                                        Payment
                                    </div>
                                    <div className="col-1">
                                        Order
                                    </div>
                                    <div className="col text-center">

                                    </div>
                                </Card.Header>


                                {bids  &&  Array.isArray(query) &&
                                    bids?.map((bid, id) => (
                                            bid.status !== "20" && bid.is_bid == "1" &&
                                            <Fragment key={id}>
                                                <PendingBids
                                                    customer_id={customer_id}
                                                    setReload = {value => setReload(value)}
                                                    data={bid}
                                                    setLoader={val => setLoader(val)}
                                                    next= {next => setFormStep(next)}
                                                />
                                            </Fragment>
                                        )
                                    )
                                }
                            </Accordion>
                        </div>
                    </div>
                </div>
            }

        </Fragment>
    )
}
export default DashboardPendingBids;
