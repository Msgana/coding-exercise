import React, {useState, useEffect, useMemo} from 'react'
import {useTable, usePagination, useSortBy, useGlobalFilter} from 'react-table'
import { Switch } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Columns} from './Columns';
import './Home.css';
import SearchTable from './SearchTable'
import axios from 'axios'


export const Home = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginate, setPaginate] = useState(false);
    const [showPagination, setShowPagination] = useState(false);
    
    async function getData(){
		await axios.get(`http://localhost:3001/`)
			.then(response => { 
                setRecords(response.data)
                setLoading(false);
			})
			.catch(error => {
				alert('Axios GET request failed', error);
			})
	}

    function handlePagination(event){
        setPaginate(event.target.checked);
        setShowPagination(event.target.checked);
    }
	
    useEffect(()=>{
		getData();
	},[]);

	const columns = useMemo(() => Columns, []);
    const data = useMemo(() => records, [records]);
    

    const tableInstance = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 50 },
    }, useGlobalFilter,useSortBy,usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, 
        rows,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setGlobalFilter,
        preGlobalFilteredRows,
        state,
        allColumns
    } = tableInstance;

    const { globalFilter, pageIndex } = state;
    
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
                <Switch className='pagination-toggle' size='small' checked={paginate
                } onChange={handlePagination}/>
                <h5>Yes</h5>
            </div> 
            <div className='results-display'>
                <h5>Displaying results</h5>
                <button>Reset Filters</button>
            </div>
            <div className='column-selection-search'>
                <div className='column-selection'>
                    <div className="dropdown-check-list">
                        <div className='dropdown'>
                            <button className='dropdown-item-1'> Show all columns</button>
                            <span className='dropdown-item-2' >
                                {allColumns.map(column => (
                                <div key={column.id}>
                                    <label>
                                        <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                                        {column.id}
                                    </label>
                                </div>
                                ))}
                            </span>
                        </div>
                        <div className="text-icon">
                            <p>6 of 6 selected </p>
                            <ArrowDropDownIcon className='dropdown-icon' />
                        </div>
                        
                    </div>
                </div>
                <SearchTable className="search-icon" filter={globalFilter} setFilter={setGlobalFilter} preGlobalFilteredRows={preGlobalFilteredRows}/>
            </div>
            
            { !loading && (
                <>
                <table {...getTableProps()}>
                <thead>
                {// Loop over the header rows
                headerGroups.map(headerGroup => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {// Loop over the headers in each row
                    headerGroup.headers.map(column => (
                        // Apply the header cell props
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {// Render the header
                            column.render('Header')}
                            <span>
                            {column.isSorted
                                ? column.isSortedDesc
                                    ? ' 🔽'
                                    : ' 🔼'
                                : ''}
                            </span>
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                {/* Apply the table body props */}
                { paginate ? (<tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                    page.map(row => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                        {// Loop over the rows cells
                        row.cells.map(cell => {
                        // Apply the cell props
                        return (
                            <td {...cell.getCellProps()}>
                            {// Render the cell contents
                            cell.render('Cell')}
                            </td>
                        )
                        })}
                    </tr>
                    )
                })}
                </tbody>):(<tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                    rows.map(row => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                        {// Loop over the rows cells
                        row.cells.map(cell => {
                        // Apply the cell props
                        return (
                            <td {...cell.getCellProps()}>
                            {// Render the cell contents
                            cell.render('Cell')}
                            </td>
                        )
                        })}
                    </tr>
                    )
                })}
                </tbody>)}
                
            </table>
            { showPagination && (< div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
                </button>{' '}
                <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
                </span>
            </div>)}
             
            </>
            )}      
        </div>
    )
}
