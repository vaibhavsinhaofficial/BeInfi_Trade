import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const DashboardTable = ({ data, title }) => {
    const columns = Object.keys(data[0] || {});
    const imageURL = "imges/"; // Update the imageURL to point to the public folder

    return (
        <div className="card p-2 position-relative border-0" style={{ height: "19rem", maxHeight: "19rem", borderRadius: "25px" }}>
            <style>{`
                /* Hide the scrollbar for x-axis but allow scrolling */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                    background: transparent; /* Make scrollbar transparent*/
                    border: none;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    display: none; /* Hide scrollbar thumb */
                }
                .custom-scrollbar {
                    overflow-x: auto; /* Allow horizontal scrolling */
                }
            `}</style>
            <p className="fw-normal ps-2 pt-2  text-decoration-underline name text-uppercase fw-bold">{title}</p>
            <TableContainer className='custom-scrollbar'>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell key={index} align="center" className='text-uppercase custom-scrollbar fw-bolder ' style={{ minWidth: 5, color: "#fc9647" }}>
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column, columnIndex) => {
                                        if (column === 'currency') {
                                            return (
                                                <TableCell key={columnIndex} align="center" className='custom-scrollbar'>
                                                    {row[column]['Image'] ? (
                                                        <img src={`${imageURL}${row[column]['Image']}`} alt={row[column]['Name']} style={{ width: '40px', height: '40px' }} />
                                                    ) : (
                                                        <span>{row[column]['Name']}</span>
                                                    )}
                                                    &nbsp;&nbsp;
                                                    {row[column]['Name']}
                                                </TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell key={columnIndex} align="center">
                                                    {column === 'Image' ? null : row[column]}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DashboardTable;
