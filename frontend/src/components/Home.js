import React, {useMemo} from 'react'
import {useTable, usePagination, useSortBy, useGlobalFilter} from 'react-table'
import { Switch } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Data from './data.json';
import {Columns} from './Columns';
import './Home.css';
import SearchTable from './SearchTable'

const feeds = Data.feeds;


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />
  }
)

export const Home = () => {

    const columns = useMemo(() => Columns, []);
    const data = useMemo(() => feeds, []);

    const tableInstance = useTable({
        columns,
        data,
        initialState: { pageIndex: 2 },
    }, useGlobalFilter,useSortBy,usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page -  which has only the rows for the active page
        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state,
        allColumns,
        getToggleHideAllColumnsProps,
    } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;

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
                <h5>Displaying 535 results</h5>
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
            <div>
                <div>
                <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
                All
                </div>
                {allColumns.map(column => (
                <div key={column.id}>
                    <label>
                    <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                    {column.id}
                    </label>
                </div>
                ))}
                <br />
            </div>
            <SearchTable filter={globalFilter} setFilter={setGlobalFilter}/>
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
                <tbody {...getTableBodyProps()}>
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
                </tbody>
            </table>
        < div className="pagination">
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
        </div>
            
        </div>
    )
}

