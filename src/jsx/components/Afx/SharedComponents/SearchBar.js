import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './index.css'
const SearchBar = ({type, users, setSearch}) => {
    const handleChange=  (e) =>{
        if (!e.target.value) return setSearch(users)
        const customUsers = users.filter(user => user[type].includes(e.target.value))
        setSearch(customUsers)
    }
    return (
        <Fragment>
                <div className="search">
                    <input type="text" className="searchTerm" placeholder={type} onChange={(e)=>handleChange(e)}/>
                    <button type="submit" className="searchButton">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
        </Fragment>
    );
};

SearchBar.propTypes = {

};

export default SearchBar;