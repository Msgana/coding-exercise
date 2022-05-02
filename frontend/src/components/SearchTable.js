import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './Home.css'

const SearchTable = ({filter, setFilter, preGlobalFilteredRows}) => {

    
    const count = preGlobalFilteredRows.length;

    console.log('results', count);
    return (
        <div className='search-box'>
            <input value={filter || ''} onChange={(e)=> setFilter(e.target.value)} placeholder="Search over entire chart"/>
            <SearchIcon className="search-icon"/>
        </div>
    )
}

export default SearchTable