import React, { useState } from 'react'
/// React router dom
import {Switch, Route } from 'react-router-dom'
/// Css
import './index.css'
import './chart.css'
import './step.css'

/// Layout
import Nav from './layouts/nav'
import Footer from './layouts/Footer'


//allfin otc
//accounts
import Accounts from "./components/Okapago/accounts-manager"
import RegisteredAccounts from "./components/Afx/ExternalAccounts/RegisteredAccounts"
//orders
import BuySellTab from  "./components/Okapago/SinglePageOtc/Buy-Sell/index"
import CreateSell from "./components/Okapago/Orders/CreateSell";
//import CreateBuy from "./components/Okapago/Orders/CreateBuy";
import CreateBuy from "./components/Okapago/Orders/CreateBuy";
//testing
import Testing from "./components/Okapago/testing"
//market
import MarketBuy from "./components/Okapago/Market/MarketBuy";
import MarketSell from "./components/Okapago/Market/MarketSell";
import OrderBook from "./components/Okapago/Market/OrderBook";
/// Dashboard
import Dashboard from "./components/Afx/Dashboard/Home"
import DashboardTrades from "./components/Okapago/DashboardTrades/DashboardTrades";
import MultiDashboard from "./components/Okapago/MultiDashboard/MultiDashboard";
//AFX
import SinglePageOtc from "./components/Okapago/SinglePageOtc/index";
//import BSOrderBook from "./components/Okapago/BiddingSystemOrderBook/index"
import BSOrderBook from "./components/Afx/OrderBook/index"
import Users from "./components/Afx/Users/index"
import Clients from "./components/Afx/Users/Clients"
import Currencies from "./components/Afx/Payments/Currencies"
import Banks from "./components/Afx/Payments/Banks"
// @ts-ignore
import Orders from "./components/Afx/Orders/index"
import Trades from "./components/Afx/Trades/index"
import Bids from "./components/Afx/Bids/index"
import PendingBids from "./components/Afx/PendingBids/index"
//Policy terms and conditions
import Policy from "./components/Okapago/Policy";


/// Pages
import Registration from './pages/Registration'
import Login from './pages/Login'
import Logout from './layouts/nav/Logout'
import Recovery from './pages/ForgotPassword'
import LockScreen from './pages/LockScreen'
import Error400 from './pages/Error400'
import Error403 from './pages/Error403'
import Error404 from './pages/Error404'
import Error500 from './pages/Error500'
import Error503 from './pages/Error503'
import Todo from './pages/Todo';

//Scroll To Top
import ScrollToTop from './layouts/ScrollToTop';



const Markup = () => {
  let path = window.location.pathname
  path = path.split('/')
  path = path[path.length - 1]
  let pagePath = path.split('-').includes('page')
  const [activeEvent, setActiveEvent] = useState(!path)

  const routes = [
      //AFX
    {url: 'create-order', component: BuySellTab},
    {url: 'active-orders', component: Orders},
    {url: 'active-trades', component: Trades},
    {url: 'bids-made', component: Bids},
    {url: 'bids-received', component: PendingBids},
    //users
    { url: 'clients', component: Clients},
    { url: 'users', component: Users},
    { url: 'accounts', component: RegisteredAccounts},
      //payments
    { url: 'currencies', component: Currencies},
    { url: 'banks', component: Banks},
    //allfin-otc
      //accounts
    { url: 'agregar-cuenta', component: Accounts},
    { url: 'cuentas-registradas', component: RegisteredAccounts},
      //orders
    {url: 'orden-compra', component: CreateBuy},
    {url: 'orden-venta', component: CreateSell},
    {url: 'crear-orden', component: BuySellTab},
      //market
    {url: 'comprar-rsv', component: MarketBuy},
    {url: 'vender-rsv', component: MarketSell},
    {url: 'order-book', component: BSOrderBook},
      //testing
    {url: 'test', component: Testing},

    // Dashboard
    { url: 'orders', component: Dashboard },
    { url: 'trades', component: DashboardTrades },
    { url: 'dashboard', component: Dashboard },

    // SPOtc
    { url: 'reserve-otc', component: SinglePageOtc },

    // Policy
    { url: 'reserve-policy', component: Policy },


    /// pages
    { url: 'page-register npm install --save @fortawesome/free-solid-svg-icons', component: Registration },
    { url: 'page-lock-screen', component: LockScreen },
    { url: 'page-recovery', component: Recovery},
    { url: 'page-login', component: Login },
    { url: 'logout', component: Logout },
    { url: 'page-error-400', component: Error400 },
    { url: 'page-error-403', component: Error403 },
    { url: 'page-error-404', component: Error404 },
    { url: 'page-error-500', component: Error500 },
    { url: 'page-error-503', component: Error503 },
    { url: 'todo', component: Todo },
  ]

  return (
       <>
          <div
            id={`${!pagePath ? 'main-wrapper' : ''}`}
            className={`${!pagePath ? 'show' : 'mh100vh'}`}
          >
            {!pagePath && (
              <Nav
                onClick={() => setActiveEvent(!activeEvent)}
                activeEvent={activeEvent}
                onClick2={() => setActiveEvent(false)}
                onClick3={() => setActiveEvent(true)}
              />
            )}
            <div
              className={` ${!path && activeEvent ? 'rightside-event' : ''} ${
                !pagePath ? 'content-body' : ''
              }`}
            >
              <div
                className={`${!pagePath ? 'container-fluid' : ''}`}
                style={{ minHeight: "100%"}}
              >
                <Switch>
                  {routes.map((data, i) => (
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                  ))}
                </Switch>
              </div>
            </div>
            {!pagePath && <Footer />}
          </div>
         <ScrollToTop />
       </>
  )
}

export default Markup
