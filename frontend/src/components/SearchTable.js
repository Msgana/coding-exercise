import React from 'react'

const SearchTable = ({filter, setFilter}) => {
    return (
        <div>
            <span>
                Search:{''}
                <input value={filter || ''} onChange={(e)=> setFilter(e.target.value)}/>
            </span>
        </div>
    )
}

export default SearchTable