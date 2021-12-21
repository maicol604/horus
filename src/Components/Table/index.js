import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
                          <TableCell key={`${i}${j}`}><span style={{color:row.color?row.color:'#89835f'}}>{row.text}</span></TableCell>
                        )
                      })
                    }
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
