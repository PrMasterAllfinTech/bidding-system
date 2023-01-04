import React from 'react';

const FiatSearch = ({users, setSearch}) => {
    const handleChange =(e)=>{
        if (e.target.value === 'all') return setSearch(users)
        const customUsers = users.filter(user => user.status === e.target.value)
        setSearch(customUsers)
    }
    return (
        <>
            <div className="form-group row justify-content-center">
                <label className="col-sm-4 col-form-label fs-12 text-center">Fiats</label>
                <select id="idBT" name="idBT" className="custom-select col-7 px-0 fs-10 fc-DarkGrey light-form-control br-75 height-35"
                        defaultValue={'all'}
                        onChange={(e)=>handleChange(e)}>
                    <option value="all">all</option>
                    <option value="usd">USD</option>
                    <option value="bs">Ves</option>
                </select>
            </div>
        </>
    );
};

export default FiatSearch;