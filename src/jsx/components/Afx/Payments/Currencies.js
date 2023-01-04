import React, {Fragment, useState, useEffect} from 'react';
import CurrencyRow from "./Banks/CurrencyRow"
import mockData from "./CurrenciesMock.json"
import Pagination from "../Pagination"
import AddUsers from "./Banks/AddUsers/AddUser"
import SearchBar from "../SharedComponents/SearchBar";
import StatusSearch from "../SharedComponents/StatusSearch"


function Currencies(props) {

    const [users, setUsers] = useState(mockData.data.data)
    const [search, setSearch] = useState(mockData.data.data)
    const [addModal, setAddModal] = useState (false)

    return (
        <Fragment>
            <div className="row justify-content-center mb-4"><h3>Currencies</h3></div>
            <div className="row justify-content-center my-4 py-2 ">
                <div className="col-2"><SearchBar type={"name"} users={users} setSearch={setSearch}/></div>
                <div className="col-2"><StatusSearch users={users} setSearch={setSearch}/>
                </div>
                <div className="col-2">
                    <button data-bn-type="button" className=" css-135aux6"  onClick={() => setAddModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                             className="css-1j00ybj">
                            <path d="M13.5 3h-3v7.5H3v3h7.5V21h3v-7.5H21v-3h-7.5V3z" fill="currentColor"></path>
                        </svg>
                        Add Currency
                    </button>
                </div>

            </div>
            <AddUsers show={addModal} onHide={() => setAddModal(false)} />
            <div className="row justify-content-center my-5">
                <div className="col-1 ">#</div>
                <div className="col-2">Name</div>
                <div className="col-1">Type</div>
                <div className="col-1">Slug</div>
                <div className="col-1">Symbol</div>
                <div className="col-1">Status</div>
                <div className="col-2"></div>
            </div>

            {Array.isArray(users) && users !== [] &&
                search.map((user, id) =>(
                        <CurrencyRow key={id} data={user}/>
                    )
                )

            }

            <div className="row justify-content-center mt-5">
                <Pagination />
            </div>
        </Fragment>
    );
}

export default Currencies;