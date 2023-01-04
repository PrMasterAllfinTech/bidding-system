    import React, {useState, useEffect} from "react"
import axios from "axios";
import Loader from "react-spinners/DotLoader"
import OrderBookList from "../../Okapago/Market/OrderBookList";
import OrdersPreview from "./OrdersPreview";
import Refresh from "../../Okapago/Refresh";


const MarketPreview = () => {
    //loader vars
    const [sellLoader, setSellLoader] = useState(true)
    const [buyLoader, setBuyLoader] = useState(true)

    const [sellReload, setSellReload] = useState(false)
    const [buyReload, setBuyReload] = useState(false)

    const color= "#022c43"
    //queries vars

    const [sells, setSells] = useState()
    const [buys, setBuys ] = useState()
    const page = 1
    const countPage = 5

    const sellRequest = {order_type: "1", status: "1", show_account_detail: "1", page: page, count_page: countPage};
    const buyRequest = {order_type: "0", status: "1", show_account_detail: "1", page: page, count_page: countPage};


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

    useEffect(() => {
        const interval = setInterval(async () => {
            await GetSellOrders()
            await GetBuyOrders()

        }, 15000);
        return () => clearInterval(interval);
    }, [])


    //useEffects reload Sell
    useEffect(() => {
        (
            async () => {
                try {
                    await GetSellOrders()
                } catch (e) {
                    console.log('fail effect sell reload spo mp');
                }
            }
        )()
    }, [sellReload]);

    //useEffects reload Buy
    useEffect(() => {
        (
            async () => {
                try {
                    await GetBuyOrders()
                } catch (e) {
                    console.log('fail effect buy reload');
                }
            }
        )()
    }, [buyReload]);

    function autoload (){
        setBuyReload(true)
        setSellReload(true)
        console.log('autoload')
    }


    return(
        <div className="market-prev row justify-content-center">
            <div className="col-12 text-center fc-cool-blue font-weight-bold">
                Order Book Preview
            </div>

            <div className="col-6 fs-10 my-4 book-prev-left border-bottom-Green">
                <div className="row text-center justify-content-center my-3 fc-cool-blue font-weight-bold">
                    Ventas
                </div>
                <div className="refresh-orderbook d-none">
                    <Refresh setReload={val=>setSellReload(val)} setLoader={val=>setSellLoader(val)} color={""}/>
                </div>


                <div className="row">
                    <div className="col-12">
                        <div className="row border-bottom-Green p-3 justify-content-center fc-cool-blue font-weight-bold">
                            <div className="col fs-10 text-center">
                                Banco
                            </div>
                            <div className="col fs-10 text-center">
                                RSV
                            </div>
                            <div className="col fs-10 text-center">
                                Tasa
                            </div>
                        </div>
                    </div>

                    {sellLoader ?
                        <div className="d-flex col-12 justify-content-center my-4 align-content-center">
                            <Loader color={color} loading={sellLoader} />
                        </div>
                        :
                        <div className="col-12">
                            {sells &&
                                sells.map((query, id) => (
                                        <OrdersPreview key={id} data={query} type={"sell"}/>
                                    )
                                )
                            }
                        </div>
                    }


                </div>

            </div>

            <div className="col-6 book-prev-right my-4 border-bottom-Green">
                <div className="row text-center justify-content-center fs-10 my-3 fc-cool-blue font-weight-bold">
                    Compras
                </div>
                <div className="refresh-orderbook d-none">
                    <Refresh setReload={val=>setBuyReload(val)} setLoader={val=>setBuyLoader(val)} color={""}/>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="row border-bottom-Green p-3 justify-content-center fc-cool-blue font-weight-bold">
                            <div className="col fs-10 text-center">
                                Tasa
                            </div>
                            <div className="col fs-10 text-center">
                                RSV
                            </div>
                            <div className="col fs-10 text-center">
                                Banco
                            </div>
                        </div>
                    </div>

                    {buyLoader ?
                        <div className="d-flex col-12 justify-content-center my-4 align-content-center">
                            <Loader color={color} loading={buyLoader}/>
                        </div>
                        :
                        <div className="col-12">
                            {buys &&
                                buys.map((query, id) => (
                                        <OrdersPreview key={id} data={query} type={"buy"} />
                                    )
                                )
                            }
                        </div>
                    }

                </div>

            </div>

        </div>
    )
}

export default MarketPreview