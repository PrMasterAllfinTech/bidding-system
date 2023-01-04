import React, {useState} from 'react';
import PropTypes from 'prop-types';
import useInput from "../../../../CustomHooks/useInput";

const Data = ({user}) => {
    const {name, slug, symbol, type, status} = user
    return (
            <div>
                <div className="form-group row justify-content-center">
                    <label className="col-sm-2 col-form-label fs-12 text-center">Name</label>
                    <div className="col-sm-5 px-0">
                        <input type="text" className="form-control fs-12" placeholder="user name" {...name} value={name}/>
                    </div>
                </div>

                <div className="form-group row justify-content-center">
                    <label className="col-sm-2 col-form-label fs-12 text-center" >Slug</label>
                    <div className="col-sm-5 px-0">
                        <input type="text" className="form-control fs-12" placeholder="user email" {...slug} value={slug}/>
                    </div>
                </div>
                <div className="form-group row justify-content-center">
                    <label className="col-sm-2 col-form-label fs-12 text-center" >Symbol</label>
                    <div className="col-sm-5 px-0">
                        <input type="text" className="form-control fs-12" placeholder="user email" {...symbol} value={symbol}/>
                    </div>
                </div>


                <div className="form-group row justify-content-center">
                    <label className="col-sm-2 col-form-label fs-12 text-center">Type</label>
                    <select id="idBT" name="idBT" className="custom-select col-5 px-0 fs-10 fc-DarkGrey light-form-control br-75 height-35"
                            defaultValue={type}
                            {...type}>
                        <option value="fiat">Fiat</option>
                        <option value="asset">Asset</option>
                    </select>
                </div>
                <div className="form-group row justify-content-center">
                    <label className="col-sm-2 col-form-label fs-12 text-center">Status</label>
                    <select id="idBT" name="idBT" className="custom-select col-5 px-0 fs-10 fc-DarkGrey light-form-control br-75 height-35"
                            defaultValue={status}
                            {...status}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>
    );
};

export default Data;