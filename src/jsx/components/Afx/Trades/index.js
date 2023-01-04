import React, {Fragment, useEffect, useContext, useState} from 'react';
import {Accordion, Card} from "react-bootstrap";
import axios from 'axios'
import SellTrades from "./SellTrades"
import Loader from "react-spinners/ClipLoader";
import BuyTrades from "./BuyTrades";
import {ThemeContext} from "../../../../context/ThemeContext";
import FiatSearch from "../SharedComponents/FiatSearch";
import AssetSearch from "../SharedComponents/AssetSearch";
import SearchOptions from "../SharedComponents/SearchOptions";


function ActiveTrades(props) {
    const {user_data} = JSON.parse(localStorage.getItem('userDetails'))
    const customer_id= user_data.id

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState([])
    const statusOptions = [
        {name: "active", value : "active"},
        {name: "closed", value : "closed"},
    ]

    //loader vars
    let [loader, setLoader] = useState(true);
    const color = "#1a5a6e"

    //variables
    const [query, setQuery] = useState([])
    const [reload, setReload] = useState(false)
    const [formStep, setFormStep] = useState(true)
    const [account, setAccount] = useState('')
    const postData = {order_type: "" , status: "", customer_id: customer_id, show_account_detail:1, show_order_detail:1, is_bid:"0"}


    function clearForm (){
        setFormStep(true)
        setReload(false)
        setAccount("")

    }

    //Main UseEffect
    useEffect(async () => {
        try {
            console.log ('from trades e: '+ customer_id)
            const response = await axios.get(`trades/${customer_id}`).then((res) => {
                // console.dir(res.data.data)
                const reData = res.data.data
                if (reData!=query){setQuery(res.data.data)}
                setLoader(false)
            })
        } catch (e) {
            console.log(e);
        }


    }, [])


    useEffect(() =>{
        (
            async  ()=> {
                if (reload === false) {return null}
                try{
                    setLoader(true)
                    const response = await axios.get(`trades/${customer_id}`).then((res) => {
                        // console.dir(res.data.data)
                        const reData = res.data.data
                        if (reData!=query){setQuery(res.data.data)}
                        setLoader(false)
                        setReload(false)
                    })
                }catch (e) {console.log('fail reload');}

            }
        )()

    }, [reload]);


    return(
        <Fragment>

            <div className="row justify-content-center mb-4">
                <div className="col-12 text-center"><h3 className={"fc-dark*grey"}>Active Trades</h3></div>
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
                                    <div className="col-1">#</div>
                                    <div className="col-1">Type</div>
                                    <div className="col-1">Ammount</div>
                                    <div className="col-1">Price</div>
                                    <div className="col-2">Satus</div>
                                    <div className="col-2">Payment</div>
                                    <div className="col text-center"></div>
                                </Card.Header>


                                {query  &&  Array.isArray(query) &&
                                    query?.map((data, id) => (

                                            data.status !== "closed" &&

                                            <Fragment key={id}>
                                                {data.type == "sell" ?
                                                    <SellTrades
                                                        customer_id={customer_id}
                                                        setReload = {value => setReload(value)}
                                                        data={data}
                                                        setLoader={val => setLoader(val)}
                                                        next= {next => setFormStep(next)}
                                                    />
                                                    :
                                                    <BuyTrades
                                                        customer_id={customer_id}
                                                        setReload = {value => setReload(value)}
                                                        data={data}
                                                        setLoader={val => setLoader(val)}
                                                        next= {next => setFormStep(next)}
                                                    />
                                                }

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
export default ActiveTrades;
