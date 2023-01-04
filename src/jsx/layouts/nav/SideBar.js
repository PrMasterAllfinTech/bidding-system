/// Menu
import MetisMenu from "metismenujs";
import React, {Component} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGavel, faFilePen, faUser, faHouse, faMoneyCheckDollar} from '@fortawesome/free-solid-svg-icons'

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import {Link} from "react-router-dom";

class MM extends Component {
    componentDidMount() {
        this.$el = this.el;
        this.mm = new MetisMenu(this.$el);
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="mm-wrapper">
                <ul className="metismenu" ref={(el) => (this.el = el)}>
                    {this.props.children}

                </ul>
            </div>
        );
    }
}


class SideBar extends Component {

    /// Open menu
    componentDidMount() {
        // sidebar open/close
        var btn = document.querySelector(".nav-control");
        var aaa = document.querySelector("#main-wrapper");


        function toggleFunc() {
            return aaa.classList.toggle("menu-toggle");
        }


        btn.addEventListener("click", toggleFunc);
    }


    state = {
        loveEmoji: false,
    };

    render() {
        //acceder a localstorage para obtener Level
        const storedData = JSON.parse(localStorage.getItem('userDetails'))
        let level = ''
        if (localStorage.getItem('userDetails') !== null) {
            level = storedData.level
        } else {
            level = 0
        }
        // console.log(level)

        /// Path
        let path = window.location.pathname;
        path = path.split("/");
        path = path[path.length - 1]

        /// Active menu
        let dashboard = ["dashboard",],
            accounts = ["agregar-cuenta", "cuentas-registradas",],
            orders = ["active-orders", "create-orders",],
            trades = ["active-trades", "active-bids", "bids-made", "bids-received"],
            clients = ["clients", "accounts", "users"],
            market = ["order-book"],
            payments = ["currencies", "banks",];

        // console.dir(dashboard.includes(path))

        return (
            <div className="deznav">
                <PerfectScrollbar className="deznav-scroll">
                    <MM className="metismenu" id="menu">

                        <li className={` ${dashboard.includes(path) ? "mm-active arrow-down" : "mm-nonactive"}`}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faHouse} size={"sm"}/>
                                <span className="nav-text">Home</span>
                            </Link>
                            <ul className={`${dashboard.includes(path) ? "d-soft-block" : "mm-collapse"}`}>
                                <li className={""}>
                                    <Link className={`${path === "dashboard" ? "mm-active" : ""}`} to="/dashboard"
                                          onClick={() => this.props.onClick()}>Dashboard</Link>
                                </li>

                            </ul>
                        </li>

                        <li className={` ${market.includes(path) ? "mm-active arrow-down" : "mm-nonactive"}`}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faGavel} size={"sm"}/>
                                <span className="nav-text">Market</span>
                            </Link>
                            <ul className={`${market.includes(path) ? "d-soft-block" : "mm-collapse"}`}>
                                <li>
                                    <Link className={`${path === "order-book" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/order-book">
                                        Order Book
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className={` ${orders.includes(path) ? "mm-active arrow-down" : "mm-nonactive"}`}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faFilePen} size={"sm"}/>
                                <span className="nav-text">Orders</span>
                            </Link>
                            <ul className={`${orders.includes(path) ? "d-soft-block" : "mm-collapse"}`}>
                                <li>
                                    <Link className={`${path === "create-order" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/create-order">
                                        Create
                                    </Link>

                                    <Link className={`${path === "active-orders" ? "mm-active" : ""} `}
                                          onClick={() => this.props.onClick()} to="/active-orders">
                                        Active Orders
                                    </Link>

                                </li>
                            </ul>
                        </li>


                        <li className={` ${trades.includes(path) ? "mm-active arrow-down" : "mm-nonactive"}`}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faFilePen} size={"sm"}/>
                                <span className="nav-text">Trades</span>
                            </Link>
                            <ul className={`${trades.includes(path) ? "d-soft-block" : "mm-collapse"}`}>
                                <li>

                                    <Link className={`${path === "active-trades" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/active-trades">
                                        Active Trades
                                    </Link>
                                    <Link className={`${path === "bids-made" ? "mm-active" : ""} `}
                                          onClick={() => this.props.onClick()} to="/bids-made">
                                        Bids Made
                                    </Link>
                                    <Link className={`${path === "bidas-received" ? "mm-active" : ""} `}
                                          onClick={() => this.props.onClick()} to="/bids-received">
                                        Bids Received
                                    </Link>

                                </li>
                            </ul>
                        </li>


                        <li className={` ${clients.includes(path) ? "mm-active arrow-down" : "mm-nonactive"}`}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faUser} size={"sm"}/>
                                <span className="nav-text">Users</span>
                            </Link>
                            <ul className={`${clients.includes(path) ? "d-soft-block" : "mm-collapse"}`}>
                                <li>

                                    <Link className={`${path === "clients" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/clients">
                                        Clients
                                    </Link>
                                    <Link className={`${path === "users" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/users">
                                        Users
                                    </Link>
                                    <Link className={`${path === "add-account" ? "mm-active" : ""} `}
                                          onClick={() => this.props.onClick()} to="/accounts">
                                        Accounts
                                    </Link>

                                </li>
                            </ul>
                        </li>

                        <li className={` ${payments.includes(path) ? "mm-active arrow-down" : "mm-nonactive"}`}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faMoneyCheckDollar} size={"sm"}/>
                                <span className="nav-text">Payments</span>
                            </Link>
                            <ul className={`${payments.includes(path) ? "d-soft-block" : "mm-collapse"}`}>
                                <li>
                                    <Link className={`${path === "currencies" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/currencies">
                                        Currencies
                                    </Link>
                                    <Link className={`${path === "banks" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/banks">
                                        Banks
                                    </Link>
                                </li>
                            </ul>
                        </li>


                    </MM>

                    <div className="copyright d-none">
                        <p className="fs-14 font-w200"><strong className="font-w400"></strong></p>
                        <a href="/reserve-policy" target="_blank">Terms and Policy</a>
                    </div>
                </PerfectScrollbar>
            </div>
        );
    }
}

export default SideBar;
