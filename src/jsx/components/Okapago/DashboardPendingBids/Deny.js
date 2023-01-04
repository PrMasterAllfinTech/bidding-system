import Swal from "sweetalert2";
import axios from "axios";

function DenyBid (props) {
    //console.log(props.trade)
    async function confirmToggle(){
        await  Swal.fire({
            title: 'Esta seguro que desea rechazar este Bid?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Rechazar Bid',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                props.setLoader(true)
                await axios.post(`/trades/bids/deny`, props.denyData,).then(async (res) => {
                    //console.dir(res.data)
                    await Swal.fire(
                        res.data?.code === 200 ? 'Bid Rechazado!' : 'Error',
                        res.data?.code === 200 ? 'El Bid ha sido denagado.'
                            : 'No se ha podido rechazar el bid, contacte con un operador.',
                        res.data?.code === 200 ? 'success' : "error"

                    )
                });
                props.setReload(true)
            }
        })
    }

    return(
        <button className={"btnSmall fc-Red "} onClick={()=>confirmToggle() }>Rechazar</button>
    )
}


export default DenyBid