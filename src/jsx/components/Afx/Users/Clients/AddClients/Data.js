import React, {useState} from 'react';
import PropTypes from 'prop-types';
import useInput from "../../../../CustomHooks/useInput";

const Data = props => {
    const name = useInput("");
    const docType = useInput('v')
    const docNumber = useInput('')
    const email = useInput("");
    const role = useInput("c");
    return (
        <div>
            <div className="form-group row justify-content-center">
                <label className="col-sm-2 col-form-label fs-12 text-center">Name</label>
                <div className="col-sm-5 px-0">
                    <input type="text" className="form-control fs-12" placeholder="user name" {...name}/>
                </div>
            </div>

            <div className="form-group row justify-content-center">
                <label className="col-sm-2 col-form-label fs-12 text-center" >Email</label>
                <div className="col-sm-5 px-0">
                    <input type="text" className="form-control fs-12" placeholder="user email" {...email}/>
                </div>
            </div>


            <div className="form-group row justify-content-center">
                        <label className="col-sm-2 col-form-label fs-12 text-center">Id</label>
                        <select id="idBT" name="idBT" className="custom-select col-2 px-0 fs-10 fc-DarkGrey light-form-control br-75 height-35"
                                defaultValue={docType.value}
                                {...docType}>
                            <option value="v">V</option>
                            <option value="j">J</option>
                            <option value="r">R</option>
                            <option value="e">E</option>
                        </select>

                        <input id="idNumber" type="text" className="form-control col-sm-3 fs-12"
                               placeholder="user doc id"
                            {...docNumber}/>
            </div>

        </div>
    );
};

Data.propTypes = {

};

export default Data;