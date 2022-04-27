import React from 'react'
// import "bootstrap/dist/css/bootstrap.min.css";
import { Switch } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TableSortLabel } from '@mui/material';
import './Home.css';


export const Home = () => {
    
    return (
        <div className="home-container">
            <div className='header-title'>
                <h2>8-bit PIC MCU Products </h2> 
            </div>
            <div className='product-view-mode'>
                <div className='product-view-mode-left'>
                    <h5 className='text-1'>Products View Mode</h5>
                    <h5 className='text-2'>All</h5>
                    <Switch className='product-view-toggle' size='small' />
                    <h5 className='text-3'>Popular</h5>
                </div>
                <div className='products-view-mode-right'>
                    <button>Downlaod Chart</button>
                </div>
            </div> 
            <div className='pagination'>
                <h5>Pagination</h5>
                <h5>No</h5>
                <Switch className='pagination-toggle' size='small' />
                <h5>Yes</h5>
            </div> 
            <div className='results-display'>
                <h5>Displaying 537 results</h5>
                <button>Reset Filters</button>
            </div>

            <div className='column-selection-search'>
                <div className='column-selection'>
                    <button>Show all columns</button>
                    <div className="dropdown-check-list">
                        <span className="text">6 of 6 selected</span>
                        <ArrowDropDownIcon />
                    </div>
                </div>
                <div className='search-box'>
                    <input type="text" id="fname" placeholder="Search over entire chart"></input>
                    <SearchIcon className="search-icon"/>
                </div>
            </div>
            <div className="data-table">
                <h2>Table here!</h2>
            </div>
        </div>
    )
}
