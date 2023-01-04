import React, {Fragment, useEffect, useContext, useState} from 'react';
import {Accordion, Card} from "react-bootstrap";
import axios from 'axios'
import Loader from "react-spinners/ClipLoader";
import Refresh from "../Refresh";
import PendingBids from "./PendingBids";


function DashboardPendingBids(props) {

    //loader vars
    let [loader, setLoader] = useState(true);
  const color = "#1a5a6e"
    //acceder a localstorage para obtener customerid
    const storedData = JSON.parse(localStorage.getItem('userDetails'))
    let customer_id = ''
    if (localStorage.getItem('userDetails') !== null) {
        customer_id = storedData.userData.customers.id
    } else {
        customer_id = 0
    }
    //console.log(customerId)

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


    return(
        <Fragment>

            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h3 className={"fc-dark-grey"}>Bids Pendientes</h3>
                </div>
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
                                            Tipo
                                        </div>
                                        <div className="col-1">
                                            RSV
                                        </div>
                                        <div className="col-1">
                                            Tasa
                                        </div>
                                        <div className="col-2">
                                            Estado
                                        </div>
                                        <div className="col-2">
                                            Banco
                                        </div>
                                        <div className="col-1">
                                            Orden
                                        </div>
                                        <div className="col text-center">
                                            Acciones
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
