import React, {Fragment, useContext, useEffect, useState} from "react";
import useStorage from "../../CustomHooks/useStorage"
import {Row} from "react-bootstrap";
import axios from "axios";
import EditNationalBank from "./EditNationalBank";
import EditReserve from "./EditReserve";
import DeleteAccount from "./DeleteAccount";
import Loader from "react-spinners/ClipLoader";
import {ThemeContext} from "../../../../context/ThemeContext";
import "./index.css"
import AddPayment from "./AddPayment";

const RegisteredAccounts = () => {


    //loader vars
    let [loader, setLoader] = useState(true);

    const color = "#1a5a6e"
    const userData = useContext(ThemeContext);
    const customerId= userData.customerId

    //variables

    const [query, setQuery] = useState([])
    const [reload, setReload] = useState(false)


    //Main UseEffect
    useEffect(() => {
        (
            async () => {
                try {
                    const response = await axios.get('accounts/').then((res) => {
                        console.dir(res.data)
                        setQuery(res.data)
                        setLoader(false)
                    })

                } catch (e) {
                    console.log('fail loading accounts');
                }

            }
        )()
    }, []);

    //reload useffect
    useEffect(() => {
        (
            async () => {
                if (reload === false) {return null}
                try {
                    setLoader(true)
                    await axios.get('accounts/').then((res) => {
                        console.dir("reload changed")
                        setQuery(res.data)
                        setLoader(false)
                        setReload(false)
                    })

                } catch (e) {
                    console.log('fail reloading effect');
                }

            }
        )()
    }, [reload]);

    return (
        <Fragment>
            <Row className={"justify-content-center"}>
                <div className="col-12">
                    <div className="row justify-content-center mb-2"><h3>Accounts</h3></div>
                    <div className="row justify-content-end mt-2">
                        <AddPayment />
                    </div>
                    <div className="card">
                        <div className="card-header">
                        </div>


                        <div className="card-body">
                            {loader?
                                <div className={"row justify-content-center"}>
                                    <div className={"col-12 preloaderDiv"}>
                                        <Loader color={color} loading={loader} size={50}/>
                                    </div>
                                </div>
                                :
                                <div className="css-1rttasy">

                                    {
                                        query?.map((query, id) => (
                                                <div key={id}>
                                                    {query.currency_info.id!=1
                                                        ?
                                                        <BankAccount
                                                            data={query}
                                                            setReload={reload => setReload(reload)}
                                                        />
                                                        :
                                                        <ReserveAccount
                                                            data={query}
                                                            setReload={reload => setReload(reload)}
                                                        />
                                                    }
                                                </div>
                                            )
                                        )
                                    }

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Row>
        </Fragment>
    );
};

export default RegisteredAccounts;

//components used
function BankAccount(props) {

    return (
        <div aria-disabled="false" className="UserMethodListItem__Container-sc-4g7swm-0 dOfYvP">
            <div className="UserMethodListItem__Header-sc-4g7swm-1 gISePG">
                <div className="css-cb80k8"></div>
                <div data-bn-type="text" className="css-1c82c04 text-white">{props.data.bank_info.name}</div>
                <div className="UserMethodListItem__Actions-sc-4g7swm-2 kEWSnb">
                    <EditNationalBank data={props.data} />
                    <DeleteAccount  data={props.data} />
                </div>
            </div>
            <div className="UserMethodListItem__Body-sc-4g7swm-4 jpExtY">
                <div className="UserMethodListItem__Grid-sc-4g7swm-5 bRfDIF">
                    <div className="UserMethodListItem__GridItem-sc-4g7swm-6 igoJAJ">
                        <label className="UserMethodListItem__Label-sc-4g7swm-8 bgESmu">Nombre del receptor</label>
                        <div className="UserMethodListItem__Value-sc-4g7swm-9 lXWIr"> {props.data.input_fields.titular}
                        </div>
                    </div>
                    <div className="UserMethodListItem__GridItem-sc-4g7swm-6 igoJAJ">
                        <label className="UserMethodListItem__Label-sc-4g7swm-8 bgESmu">Numero
                            de Cédula - Rif</label>
                        <div className="UserMethodListItem__Value-sc-4g7swm-9 lXWIr">{props.data.input_fields.cedula}
                        </div>
                    </div>
                    <div className="UserMethodListItem__GridItem-sc-4g7swm-6 igoJAJ">
                        <label className="UserMethodListItem__Label-sc-4g7swm-8 bgESmu">Número
                            de cuenta</label>
                        <div
                            className="UserMethodListItem__Value-sc-4g7swm-9 lXWIr">{props.data.input_fields.cuenta}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ReserveAccount(props) {

    return (
        <div aria-disabled="false" className="UserMethodListItem__Container-sc-4g7swm-0 dOfYvP">
            <div className="UserMethodListItem__Header-sc-4g7swm-1 gISePG">
                <div className="css-1tl05xl"></div>
                <div data-bn-type="text" className="css-1c82c04 text-white">Reserve</div>
                <div className="UserMethodListItem__Actions-sc-4g7swm-2 kEWSnb">
                    <EditReserve data={props.data}        setReload={reload => props.setReload(reload)} />

                    <DeleteAccount  data={props.data}
                                    setReload={reload => props.setReload(reload) }
                    />
                </div>
            </div>
            <div className="UserMethodListItem__Body-sc-4g7swm-4 jpExtY">
                <div className="UserMethodListItem__Grid-sc-4g7swm-5 bRfDIF">
                    <div className="UserMethodListItem__GridItem-sc-4g7swm-6 cePlqc">
                        <label className="UserMethodListItem__Label-sc-4g7swm-8 bgESmu">Nombre del receptor</label>
                        <div className="UserMethodListItem__Value-sc-4g7swm-9 lXWIr">{props.data.input_fields.nombre}
                        </div>
                    </div>

                    <div className="UserMethodListItem__GridItem-sc-4g7swm-6 cePlqc">
                        <label className="UserMethodListItem__Label-sc-4g7swm-8 bgESmu">ID Reserve</label>
                        <div className="UserMethodListItem__Value-sc-4g7swm-9 lXWIr">{props.data.input_fields.usuario}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}