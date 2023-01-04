import React, {Fragment, useContext, useEffect, useState} from "react";
import axios from "axios";
import Loader from "react-spinners/DotLoader"
import OrderBookList from "./OrderBookList";
import PaginationControlled from "./Pagination";
import {ThemeContext} from "../../../../../context/ThemeContext";


const OrderShow = (props) => {
//loader vars
    let [loader, setLoader] = useState(true);
    const color = "#1a5a6e"
    const userData = useContext(ThemeContext);
    const customerId= userData.customerId

//variables for Orders
    const [query, setQuery] = useState([])
    const [reload, setReload] = useState(false)
    const [page, setPage] = useState("1")
    const [count, setCount] = useState(null)
    const [bankId, setBankId] = useState(null)
    const [maxPages, setMaxPages] = useState(1)
    const [disabledSell, setDisabledSell] = useState(false)
    const [adminDisabled, setAdminDisabled] = useState(false)
    const countPagesSell = 10
    const [formStep, setFormStep] = useState(true)
    const [account, setAccount] = useState('')
    const [buyOrders, setBuyOrders] = useState([])
    const [sellOrders, setSellOrders] = useState([])

    const actionOrders= props.action == 'buy' ? sellOrders : buyOrders

    function clearForm() {
        setFormStep(true)
        setReload(false)
        setAccount("")
    }

    async function GetOrders() {
        setDisabledSell(true)
        await axios.get('orders/separate').then((res) => {
                const reData = res.data
                setBuyOrders(res.data.buy.data)
                setSellOrders(res.data.sell.data)

                if (reData!=query){setQuery(reData)}setLoader(false)
                setAdminDisabled(res.data !== undefined ? true : false)
                setDisabledSell(false)
                setCount(res.data.total_pages)
                setMaxPages(
                    props.action=='buy' ?
                    res.data.sell.total_pages< countPagesSell ? 0 : Math.round(res.data.count / countPagesSell)
                        :res.data.buy.total_pages< countPagesSell ? 0 : Math.round(res.data.count / countPagesSell))
                clearForm()
            }
        )}

//Main UseEffect
    useEffect(() => {
        const interval = setInterval(async () => {
            try{
                await GetOrders()
            } catch(e){console.log(e)
            }finally {}

        }, 15000);
        return () => clearInterval(interval);
    }, [])



    useEffect(() => {
        (async () => {
            try {
                await GetOrders()

            } catch (e) {
                console.log('fail new page');
            }

        })()
    }, [page]);


    useEffect(()=>{
        console.log(actionOrders)
    },[query])
    return (<Fragment>
        <div className={`col-${props.width}  pl-4`}>

            <div className="css-cjwhpx row">
                <div className="css-17q4dod fs-10 row">
                    <div className="col-2 fc-cool-blue font-weight-bold">#</div>
                    <div className="col-2 fc-cool-blue font-weight-bold">Precio</div>
                    <div className="col-2 fc-cool-blue font-weight-bold">Disponible</div>
                    <div className="col-4 fc-cool-blue font-weight-bold">Pago</div>
                    <div className="col-2 text-center fs-10"></div>
                </div>
                {loader ? <div className={"row justify-content-center"}>
                    <div className={"col-12 preloaderDiv"}>
                        <Loader color={color} loading={loader} size={50}/>
                    </div>
                </div> : <Fragment>
                    { query !== undefined &&

                        actionOrders?.map((data, id) => (<div key={id}>
                            <OrderBookList
                                reload={value => setReload(value)}
                                viewName={props.viewName}
                                data={data}
                                next={next => setFormStep(next)}
                                action={props.action}
                            />
                        </div>))}
                </Fragment>}
            </div>

            <div className="row justify-content-center">
                <PaginationControlled
                    setPage={page => setPage(page)}
                    count={maxPages}
                    disabled={maxPages == 1 ? true : disabledSell}
                    adminDisabled={adminDisabled}
                    setDisabled={val => setDisabledSell(val)}
                    viewName={props.ViewName}
                />
            </div>

        </div>
    </Fragment>);
}

export default OrderShow;
