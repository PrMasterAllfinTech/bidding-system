import {useState, useEffect, Fragment} from 'react';
import './index.css'
import Market from "./Market/OrderBook"
import Select from 'react-select'
import OrderShow from "./Market/OrdersShow";
const BSOrderBook = () => {


    const fiat = [
        { value: 'usd', label: 'USD' },
        { value: 'ves', label: 'BS' }
    ]
    const paymentUsd= [
        { value: 'zelle', label: 'Zelle' },
        { value: 'wire', label: 'Wire Transfer' }
    ]
    const paymentVes= [
        { value: 'banesco', label: 'Banesco' },
        { value: 'mercantil', label: 'Mercantil' },
        { value: 'bbva', label: 'BBVA' }
    ]

    const [action, setAction] = useState ('buy')
    const [crypto, setCrypto] = useState('usdt')

    const pickAction = (pick) => {
        if(pick === action ) return null
        setAction(pick)
    }

    function pickCrypto (pick){
        if(pick === crypto ) return null
        setCrypto(pick)
    }

    useEffect(() => {
        console.log(action)
    }, [action]);
    return (
        <>
            <div className="css-3tldoo w-100">
                <div className="css-10oi4yv row justify-content-center" >
                    <div className="css-73i06">
                        <div data-tutorial-id="trade_filter">
                            <div className="css-1yl7p9">
                                <div className="css-1bgspcv">
                                    <div  className={action=== 'buy' ? "p2p-green" : "p2p-grey"} onClick={()=>pickAction('buy')}>Buy</div>
                                    <div  className={action=== 'sell' ? "p2p-red" : "p2p-grey"} onClick={()=>pickAction('sell')}>Sell</div>
                                    <div  className={action=== 'all' ? "p2p-main" : "p2p-grey"} onClick={()=>pickAction('all')}>All</div>
                                </div>
                            </div>
                        </div>
                        <div data-bn-type="text" className="css-wc0fcl">Actives</div>
                        <div className="css-8f6za">
                            <div data-tutorial-id="trade_filter" className="css-vurnku">
                                <div className="css-1cvxz8n"><h2 data-bn-type="text"  className={crypto=== 'usdt' ? "selected-crypto" : "unselected-crypto"} onClick={()=>pickCrypto('usdt')}>USDT</h2>
                                </div>
                                <div className="css-1gw94z4"><h2 data-bn-type="text" className={crypto=== 'usdc' ? "selected-crypto" : "unselected-crypto"}  onClick={()=>pickCrypto('usdc')}>USDC</h2>
                                </div>
                                <div className="css-1gw94z4"><h2 data-bn-type="text" className={crypto=== 'usdx' ? "selected-crypto" : "unselected-crypto"}  onClick={()=>pickCrypto('usdx')}>USDX</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="css-10oi4yv row justify-content-center">
                    <div className="css-73i06">

                        <div className="css-beb7as">
                            <div data-bn-type="text" className="css-wc0fcl">Fiat</div>
                            <div className="css-10nf7hq px-3">
                                <Select options={fiat} />
                            </div>
                        </div>

                        <div className="css-beb7as">
                            <div data-bn-type="text" className="css-wc0fcl">Payment Method</div>
                            <div className="css-10nf7hq px-3">
                                <Select options={paymentVes} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="css-16g55fu row justify-content-center mt-5">
                {action === 'buy' &&
                    <OrderShow action={action} viewName={action} width={12} />
                }

                {action === 'sell' &&
                    <OrderShow action={action} viewName={action} width={12} />
                }

                {action === 'all'  &&
                    <Fragment>
                        <OrderShow action={'buy'} viewName={'buy'} width={6}/>
                        <OrderShow action={'sell'} viewName={'sell'} width={6}/>
                    </Fragment>

                }


            </div>
        </>
    );
};

export default BSOrderBook;