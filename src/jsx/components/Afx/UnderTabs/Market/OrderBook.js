import React, {Fragment, useContext, useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import axios from "axios";
import Loader from "react-spinners/DotLoader"
import OrderBookList from "./OrderBookList";
import PaginationControlled from "./Pagination";
import DropdownList from "react-widgets/DropdownList"
import Refresh from "../../../Okapago/Refresh";
import MarketHistoryPreview from "./MarketHistoryPreview";
import {ThemeContext} from "../../../../../context/ThemeContext";


const OrderBook = (props) => {
    //loader vars
    let [loader, setLoader] = useState(true);
    let [loaderBuy, setLoaderBuy] = useState(true);
  const color = "#1a5a6e"
    const userData = useContext(ThemeContext);
    const customerId= userData.customerId

    const comprar = "Comprar"
    const vender = "Vender"

    const [banks, setBanks] = useState([])
    const [bankSelect, setBankSelect] = useState("2")
    //variables for Sell Orders
    const [query, setQuery] = useState([])
    const [reload, setReload] = useState(false)
    const [page, setPage] = useState("1")
    const [count, setCount] = useState(null)
    const [bankId, setBankId] = useState(null)
    const [maxPages, setMaxPages] = useState(1)
    const [disabledSell, setDisabledSell] = useState(false)
    const [adminDisabled, setAdminDisabled] = useState(false)
    const countPagesSell = 10
    const postData = {
        order_type: "1", status: "1", show_account_detail: "1", page: page, count_page: countPagesSell, bank_id: bankId
    };
    //variables for Buy Orders
    const [queryBuy, setQueryBuy] = useState([])
    const [reloadBuy, setReloadBuy] = useState(false)
    const [pageBuy, setPageBuy] = useState("1")
    const [countBuy, setCountBuy] = useState(null)
    const [maxPagesBuy, setMaxPagesBuy] = useState(1)
    const [bankIdBuy, setBankIdBuy] = useState(null)
    const [disabledBuy, setDisabledBuy] = useState(false)
    const [adminDisabledBuy, setAdminDisabledBuy] = useState(false)
    const countPagesBuy = 10
    const postDataBuy = {
        order_type: "0",
        status: "1",
        show_account_detail: "1",
        page: pageBuy,
        count_page: countPagesBuy,
        bank_id: bankIdBuy
    };
    //

    //variables main filter
    const [mainFilter, setMainfilter] = useState("")
    const [defaultBank, setDefaultBank] = useState('Banesco')
    const [defaultBankVal, setDefaultBankVal] = useState(2)
    //
    const [formStep, setFormStep] = useState(true)

    const [account, setAccount] = useState('')


    function clearForm() {
        setFormStep(true)
        setReload(false)
        setAccount("")
    }


    function clearFormBuy() {
        setFormStep(true)
        setReloadBuy(false)
        setAccount("")
    }

    async function GetBanks() {
       // setLoader(true)
        await axios.get('banks').then((res) => {
            //console.dir(res.data)
            setBanks(res.data)
        })
    }

    async function GetSellOrders() {
        //setLoader(true)
        setDisabledSell(true)
        await axios.get('orders/separate').then((res) => {
            const reData = res.data?.sell.data
            if (reData!=query){
                setQuery(res.data.sell.data)
            }
            setLoader(false)
            setAdminDisabled(res.data !== undefined ? true : false)
            setDisabledSell(false)
            setCount(res.data.total_pages)
            setMaxPages(res.data.total_pages< countPagesSell ? 0 : Math.round(res.data.count / countPagesSell))

            clearForm()
        })
    }


    async function GetBuyOrders() {
        //setLoaderBuy(true)
        setDisabledBuy(true)
        await axios.get('orders/separate').then((res) => {
            // console.dir(res.data)
            const reData = res.data?.buy.data
            if (reData!=queryBuy){
                setQueryBuy(res.data?.buy.data)
            }

            setLoaderBuy(false)
            setDisabledBuy(false)
            setCountBuy(res.data.total_pages)
            setMaxPagesBuy(res.data.total_pages < countPagesSell ? 1 : Math.round(res.data.count / countPagesSell))

            clearFormBuy()
        })
    }
    const [mainBank, setMainBank] = useState('Todos')

    //Main UseEffect
    useEffect(() => {
        const interval = setInterval(async () => {
            await GetSellOrders()
            await GetBuyOrders()
            await GetBanks()

        }, 15000);
        return () => clearInterval(interval);
    }, [])



    useEffect(() => {
        (async () => {
            //console.log(postData)
            try {
                await GetSellOrders()

            } catch (e) {
                console.log(e);
            }

        })()
    }, [reload]);

    useEffect(() => {
        (async () => {
            try {
                await GetBuyOrders()

            } catch (e) {
                console.log('fail orders list');
            }

        })()
    }, [reloadBuy]);


    useEffect(() => {
        (async () => {
            try {
                await GetSellOrders()

            } catch (e) {
                console.log('fail new page');
            }

        })()
    }, [page]);

    useEffect(() => {
        (async () => {
            try {

                await GetBuyOrders()

            } catch (e) {
                console.log('fail new page');
            }

        })()
    }, [pageBuy]);

    useEffect(() => {
        (async () => {
            try {
                setReload(true)
            } catch (e) {
                console.log('fail bankid reload');
            }

        })()
    }, [bankId]);

    useEffect(() => {
        (async () => {
            try {
                setReloadBuy(true)
               // console.log(defaultBank)
            } catch (e) {
                console.log('fail bankidbuy reload');
            }

        })()
    }, [bankIdBuy]);

    //mainFilter useEffect
    useEffect(() => {
        (async () => {
            try {
                setBankId(mainFilter)
                setBankIdBuy(mainFilter)
            } catch (e) {
                console.log('fail mainfilter reload');
            }

        })()
    }, [mainFilter]);

    function MainFilterData(id, name){

        if(id!== undefined && name!== undefined){
            setMainfilter(id)
            setMainBank(name)
        }

    }

    return (<Fragment>

        <Row className={"justify-content-center"}>

            <div className="col-12">
                <div className="">
                    <div className="">
                        <div className="row">
                            <div className="col-12 ">
                                <div className="css-16g55fu row">

                                    {props.action === 'sell' ?
                                        <div className="col-12  pl-4">
                                            <div className="refresh-orderbook d-none">
                                                <Refresh setReload={val => setReload(val)}
                                                         setLoader={val => setLoader(val)}/>
                                            </div>

                                            <div className="row left-orders overflowHidden">
                                                <div className="col orders-filters justify-content-cente mb-4">
                                                    <div
                                                        className="col-12 rsv-filter justify-content-center d-none">

                                                        <DropdownList
                                                            defaultValue={{id: "",  name: `Filtrar por otro banco`}}
                                                            busy={banks === []}
                                                            data={banks}
                                                            dataKey={"id"}
                                                            textField={"name"}
                                                            onChange={value => setBankId(value?.id)}
                                                        />


                                                    </div>
                                                </div>

                                                <div className="css-cjwhpx row">
                                                    <div className="css-17q4dod fs-10 row">
                                                        <div
                                                            className="col-2 fc-cool-blue font-weight-bold">Precio
                                                        </div>
                                                        <div
                                                            className="col-3 fc-cool-blue font-weight-bold">Disponible
                                                        </div>
                                                        <div
                                                            className="col-4 fc-cool-blue font-weight-bold">Pago
                                                        </div>
                                                        <div className="col-3 text-center fs-10">
                                                            <div data-bn-type="text"
                                                                 className="css-vurnku fc-cool-blue font-weight-bold">{comprar}</div>
                                                        </div>
                                                    </div>
                                                    {loader ? <div className={"row justify-content-center"}>
                                                        <div className={"col-12 preloaderDiv"}>
                                                            <Loader color={color} loading={loader} size={50}/>
                                                        </div>
                                                    </div> : <Fragment>
                                                        {query != undefined &&

                                                            query?.map((query, id) => (<div key={id}>
                                                                <OrderBookList
                                                                    reload={value => setReload(value)}
                                                                    viewName={vender}
                                                                    data={query}
                                                                    next={next => setFormStep(next)}
                                                                    action={props.action}
                                                                />
                                                            </div>))}
                                                    </Fragment>}

                                                </div>
                                            </div>
                                            <div className="col-12 pagination-left">
                                                <div className="row justify-content-center">
                                                    <PaginationControlled
                                                        setPage={page => setPage(page)}
                                                        count={maxPages}
                                                        disabled={maxPages == 1 ? true : disabledSell}
                                                        adminDisabled={adminDisabled}
                                                        setDisabled={val => setDisabledSell(val)}
                                                        viewName={comprar}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        :
                                        <div className="col-12  pl-4">
                                            <div className="refresh-orderbook d-none">
                                                <Refresh setReload={val => setReloadBuy(val)}
                                                         setLoader={val => setLoaderBuy(val)}/>
                                            </div>
                                            <div className="row right-orders overflowHidden">
                                                <div className="col orders-filters justify-content-center mb-4">
                                                    <div
                                                        className="col-12 rsv-filter justify-content-center d-none">
                                                        <DropdownList
                                                            defaultValue={{id:"", name: `Filtrar por otro banco`}}
                                                            busy={banks === []}
                                                            data={banks}
                                                            dataKey={"id"}
                                                            textField={"name"}
                                                            onChange={value => setBankId(value?.id)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="css-cjwhpx row">
                                                    <div className="css-17q4dod fs-10 row">
                                                        <div
                                                            className="col-2 fc-cool-blue font-weight-bold">Precio
                                                        </div>
                                                        <div
                                                            className="col-3 fc-cool-blue font-weight-bold">Disponible
                                                        </div>
                                                        <div
                                                            className="col-4 fc-cool-blue font-weight-bold">Pago
                                                        </div>
                                                        <div className="col-3 text-center fs-10">
                                                            <div data-bn-type="text"
                                                                 className="css-vurnku fc-cool-blue font-weight-bold">{comprar}</div>
                                                        </div>
                                                    </div>

                                                    {loaderBuy ? <div className={"row justify-content-center"}>
                                                        <div className={"col-12 preloaderDiv"}>
                                                            <Loader color={color} loading={loaderBuy} size={50}/>
                                                        </div>
                                                    </div> : <Fragment>
                                                        {queryBuy != undefined && queryBuy.map((query, id) => (
                                                            <div key={id}>
                                                                <OrderBookList
                                                                    reload={value => setReloadBuy(value)}
                                                                    viewName={comprar}
                                                                    data={query}
                                                                    next={next => setFormStep(next)}
                                                                    action={props.action}
                                                                />
                                                            </div>))}

                                                    </Fragment>}

                                                </div>
                                            </div>


                                            <div className="col-12 pagination-right">
                                                <div className="row justify-content-center">
                                                    <PaginationControlled
                                                        setPage={page => setPageBuy(page)}
                                                        count={maxPages}
                                                        disabled={maxPages == 1 ? true : disabledSell}
                                                        adminDisabled={adminDisabledBuy}
                                                        setDisabled={val => setDisabledBuy(val)}
                                                        viewName={vender}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    }

                                </div>


                            </div>

                        </div>


                    </div>

                </div>
            </div>

            <div className="col-2 d-none ">
                <MarketHistoryPreview bankId={mainFilter} mainBank={mainBank}/>
            </div>
        </Row>

    </Fragment>);
};

export default OrderBook;

//components used
