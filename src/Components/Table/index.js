import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('dt', 159, 6.0, 24, 4.0),
//   createData('Icdch', 237, 9.0, 37, 4.3),
//   createData('Edir', 262, 16.0, 24, 6.0),
//   createData('asd', 305, 3.7, 67, 4.3),
//   createData('asd', 356, 16.0, 49, 3.9),
// ];

export default ({rows=[], heads=[], data=[]}) => {
  return (
    <Paper 
      variant="outlined"
      style={{padding:'1em'}}
    >
    <TableContainer>
      <Table sx={{ minWidth: '100%' }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
              {
                  heads.map((title, index)=>{
                    return (
                        <TableCell key={index}>{title}</TableCell>
                    )
                  })
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {
              data.map((item, i)=>{
                  return (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {
                                item.map((row, j) => {
                                    return (
                                        <TableCell key={`${i}${j}`}>{row}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                  )
              })
          }
          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.calories}</TableCell>
              <TableCell>{row.fat}</TableCell>
              <TableCell>{row.carbs}</TableCell>
              <TableCell>{row.protein}</TableCell>
            </TableRow>
          ))} */}

        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}
