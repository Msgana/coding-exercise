import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './Home.css'

const SearchTable = ({filter, setFilter}) => {
    return (
        <div className='search-box'>
            <input value={filter || ''} onChange={(e)=> setFilter(e.target.value)} placeholder="Search over entire chart"/>
            <SearchIcon className="search-icon"/>
        </div>
    )
}

export default SearchTable