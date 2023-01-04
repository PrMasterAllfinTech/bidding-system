import React, {useState, useEffect} from "react"
import axios from "axios";
import Loader from "react-spinners/DotLoader"
import OrdersPreview from "./OrdersPreview";
import Refresh from "../../Okapago/Refresh";


const MarketPreview = (props) => {
    //console.log(props.mainBank)
    //loader vars
    const [sellLoader, setSellLoader] = useState(true)
    const [buyLoader, setBuyLoader] = useState(true)

    const [sellReload, setSellReload] = useState(false)
    const [buyReload, setBuyReload] = useState(false)

    const color= "#022c43"
    //queries vars

    const [sells, setSells] = useState('')
    const [buys, setBuys] = useState('')
    const page = 1
    const countPage = 5

    const sellRequest = {
        order_type: "1", status: "2", show_account_detail: "1", page: page, count_page: countPage, bank_id: props.bankId
    };
    const buyRequest = {
        order_type: "0", status: "2", show_account_detail: "1", page: page, count_page: countPage, bank_id: props.bankId
    };


//functions for orders - based on types
    async function GetSellOrders() {
        //setSellLoader(true)
        await axios.get('orders/separate').then((res) => {
            // console.dir(res.data.sell.data)
            setSells(res.data.sell.data)
            setSellLoader(false)
            setSellReload(false)
        })
    }


    async function GetBuyOrders() {
        // setBuyLoader(true)
        await axios.get('orders/separate').then((res) => {
            // console.dir(res.data.buy.data)
            setBuys(res.data.buy.data)
            setBuyLoader(false)
            setBuyReload(false)
        })
    }

    //useEffects
    useEffect(() => {
        const interval = setInterval(async () => {
            await GetSellOrders()
            await GetBuyOrders()

        }, 15000);
        return () => clearInterval(interval);
    }, [])


    //useEffects reload Sell
    useEffect(() => {
        (async () => {
            if (sellReload === false) {return null}
            try {
                await GetSellOrders()
            } catch (e) {
                console.log('fail effect sell reload mhpleft');
            }
        })()
    }, [sellReload]);

    //useEffects reload Buy
    useEffect(() => {
        (async () => {
            if (buyReload === false) {return null}
            try {
                await GetBuyOrders()
            } catch (e) {
                console.log('fail effect buy reload');
            }
        })()
    }, [buyReload]);

    //useEffects bankId
    useEffect(() => {
        (async () => {
            try {
                setBuyReload(true)
                setSellReload(true)
            } catch (e) {
                console.log('fail effect bankId');
            }
        })()
    }, [props.bankId]);


    return (<div className="market-prev row justify-content-center">
        <div className="col-12 text-center fc-dark-grey font-weight-bold">
            Historial
        </div>
        <div className="col-12 d-flex justify-content-center fs-10">
            {props.mainBank}
        </div>

        <div className="col-12 fs-10 mt-4 book-prev-left">
            <div className="row text-center justify-content-center fc-cool-blue d-none">
                <h6 className="fs-10">
                    Ventas
                </h6>
            </div>


            <div className="row">
                <div className="col-12 d-none">
                    <div className="row  justify-content-center">
                        <div className="col fs-10 text-center font-weight-bold">
                            RSV
                        </div>
                        <div className="col fs-10 text-center font-weight-bold">
                            Tasa
                        </div>
                    </div>
                </div>
                {sellLoader ? <div className="d-flex col-12 justify-content-center my-4 align-content-center">
                    <Loader color={color} loading={sellLoader}/>
                </div> : <div className="col-12">
                    {sells && sells.map((query, id) => (<OrdersPreview key={id} data={query} type={"sell"}/>))}
                </div>}
            </div>

        </div>

        <div className="col-12 book-prev-right mt-1 ">
            <div className="row text-center justify-content-center fs-10 d-none">
                <h6 className="fs-10">
                    Compras
                </h6>

            </div>

            <div className="row">
                <div className="col-12 d-none">
                    <div className="row justify-content-center">
                        <div className="col fs-10 text-center font-weight-bold">
                            RSV
                        </div>
                        <div className="col fs-10 text-center font-weight-bold">
                            Tasa
                        </div>
                    </div>
                </div>

                {buyLoader ? <div className="d-flex col-12 justify-content-center my-4 align-content-center">
                    <Loader color={color} loading={buyLoader}/>
                </div> : <div className="col-12">
                    {Array.isArray(buys) &&
                        buys.map((query, id) => (<OrdersPreview key={id} data={query} type={"buy"}/>))}
                </div>}

            </div>

        </div>

    </div>)
}

export default MarketPreview