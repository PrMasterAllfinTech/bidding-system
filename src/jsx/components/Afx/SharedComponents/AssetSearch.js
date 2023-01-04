import React from 'react';

const AssetSearch = ({users, setSearch}) => {
    const handleChange =(e)=>{
        if (e.target.value === 'all') return setSearch(users)
        const customUsers = users.filter(user => user.status === e.target.value)
        setSearch(customUsers)
    }
    return (
        <>
            <div className="form-group row justify-content-center">
                <label className="col-sm-4 col-form-label fs-12 text-center">Assets</label>
                <select id="idBT" name="idBT" className="custom-select col-7 px-0 fs-10 fc-DarkGrey light-form-control br-75 height-35"
                        defaultValue={'all'}
                        onChange={(e)=>handleChange(e)}>
                    <option value="all">all</option>
                    <option value="usdt">USDT</option>
                    <option value="usdc">USDC</option>
                    <option value="usdx">USDX</option>
                </select>
            </div>
        </>
    );
};

export default AssetSearch;