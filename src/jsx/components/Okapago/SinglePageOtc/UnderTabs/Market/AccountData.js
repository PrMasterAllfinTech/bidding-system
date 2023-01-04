import React, {useEffect, useState, Fragment, useContext} from "react";
import axios from "axios";
import Loader from "react-spinners/ClipLoader";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {ThemeContext} from "../../../../../../context/ThemeContext";

function AccountData(props) {
    //console.dir(props)
    //loader vars
    const [copied, setCopied] = useState(false)
    let [loader, setLoader] = useState(true);
    const [query, setQuery] = useState([])


    const userData = useContext(ThemeContext);
    const customer_id= userData.customerId

    const type = props.viewName === "Comprar" ? 0 : 1


    useEffect(() => {
        (
            async () => {
                try {
                    const response = await axios.get('account').then((res) => {
                       // console.dir(res.data)
                        setQuery(res.data)
                        props.setBankAccount(res.data.find(account => account.type == 0).id)
                        props.setReserve(res.data.find(account => account.type == 1).id)
                        setLoader(false)
                        props.setLoader(false)
                    })

                    console.dir(query)
                } catch (e) {
                    console.log('fail loading accounts');
                }

            }
        )()
    }, []);

    return (
        <div className="card-body  bg-blue-rsv text-white">
            <div className="basic-form bg-blue-rsv text-white">
                <form>

                    <div className="form-group row"><label className="col-sm-12 col-form-label fs-12 text-center">Paso final
                        para completar su trade</label>
                    </div>

                    {props.loadingStatus ?
                        <div className={"row justify-content-center"}>
                            <div className={"col-12 preloaderDiv"}>
                                <Loader color={props.color} loading={props.loadingStatus} size={30}/>
                            </div>
                        </div>
                        :
                        <div className=" form-group  row justify-content-center">
                            {props.viewName === "Comprar" ?
                                <Fragment>
                                    <label className="col-sm-12  text-right col-form-label fs-12 text-center">Seleccione
                                        un RSV asociado</label>
                                    <select id="bank" name="bank" className="form-control  col-sm-10 idType fs-12 ml-3"
                                            defaultValue={"default"}

                                            onChange={(e) => props.setReserve(e.target.value)}>
                                        <option value={"default"} disabled>
                                            Seleccione cuenta
                                        </option>
                                        {
                                            query?.map((query) => (
                                                    <option key={query.id} value={query.id}
                                                            className={query.type == 0 ? 'allfinNone' : null}>
                                                        {query.alias}</option>

                                                )
                                            )
                                        }
                                    </select>

                                </Fragment>
                                :
                                <Fragment>
                                    <label className="col-sm-12  text-right col-form-label fs-12 text-center">Seleccione
                                        un Banco asociado</label>
                                    <select id="bank" name="bank" className="form-control  col-sm-10 idType fs-12 ml-3"
                                            defaultValue={"default"}
                                            onChange={(e) => props.setBankAccount(e.target.value)}>
                                        <option value={"default"} disabled>
                                            Seleccione cuenta
                                        </option>
                                        {
                                            query?.map((query) => (
                                                    <option key={query.id} value={query.id}
                                                            className={query.type == 1 ? 'allfinNone' : null}>
                                                        {query.alias}</option>

                                                )
                                            )
                                        }
                                    </select>

                                </Fragment>
                            }

                        </div>


                    }


                </form>
            </div>
        </div>);
}

export default AccountData