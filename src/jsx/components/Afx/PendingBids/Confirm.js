import Swal from "sweetalert2";
import axios from "axios";
import React from "react";


function ConfirmBid (props) {
    //console.log(props.trade)

    async function confirmToggle(){
        await  Swal.fire({
            title: 'Esta seguro que desea aceptar este Bid?',
            text: "no podra revertir esta acción ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar Bid',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                props.setLoader(true)
                await axios.post(`/trades/bids/confirm`, props.confirmData,).then(async (res) => {
                    //console.dir(res.data)
                    await Swal.fire(
                        res.data?.code === 200 ? 'Aceptado!' : 'Error',
                        res.data?.code === 200 ? 'El Bid ha sido aceptado.'
                            : 'No se ha podido aceptar el Bid, contacte con un operador.',
                        res.data?.code === 200 ? 'success' : "error"

                    )
                });
                props.setReload(true)
            }
        })
    }

    return(
        <button className={"btnSmall fc-Green"} onClick={()=>confirmToggle()}>
            Aceptar
        </button>
    )
}


export default ConfirmBid