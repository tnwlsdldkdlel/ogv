import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'

function MovieRank() {
    return (
        <div>
            <div className="title">
                영화매출
                <div className="ordering">실시간 | 일간 | 연간</div>
            </div>
            <div className="content">
                <Table aria-label="simple table">
                    <TableBody>
                        {/* {rows.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                ))} */}

                        <TableRow
                            // key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {/* {row.name} */}test
                            </TableCell>
                            {/* <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                        <TableRow
                            // key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {/* {row.name} */}test
                            </TableCell>
                            {/* <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default MovieRank