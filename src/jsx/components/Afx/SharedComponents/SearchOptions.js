import React from 'react';

const SearchOptions = ({query, setSearch, options, type}) => {


    const handleChange =(e)=>{
        if (e.target.value === 'all') return setSearch(query)
        const customOptions = query.filter(row => row[type] === e.target.value)
        setSearch(customOptions)
    }
    return (
        <>
            <div className="form-group row justify-content-center">
                <label className="col-sm-4 col-form-label fs-12 text-center">{type}</label>
                <select id="idBT" name="idBT" className="custom-select col-7 px-0 fs-10 fc-DarkGrey light-form-control br-75 height-35"
                        defaultValue={'all'}
                        onChange={(e)=>handleChange(e)}>
                    <option value="all">all</option>
                    {Array.isArray(options) && options.length &&
                        options.map((option, index) => (<option key={index} value={option.value}>{option.name}</option> ))
                    }
                        )

                </select>
            </div>
        </>
    );
};

export default SearchOptions;