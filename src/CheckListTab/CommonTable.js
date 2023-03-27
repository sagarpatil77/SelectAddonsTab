import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Modal } from 'react-bootstrap';
import { Typography,Toolbar } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#162242',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));



const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const StyledTableRowLast = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#00c389',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const StyledTableCellLast = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#162242',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color:'#fff',
      fontWeight:600
    },
  }));

  function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },

            bgcolor: '#e3e3e3'
        
        }}
        className = 'modal-header'
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%',
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontWeight: '500',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '1',
            letterSpacing: '0.15px',
            textAlign: 'left',
            color: '#4f4f4f', }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
        Review Choices
          </Typography>
        )}
       
      </Toolbar>
    );
  }

function createData(name,payment1,payment2) {
  return {name,payment1,payment2, };
}

const rows = [
  createData('Monthly Payment for ELite 1', 200, 270),
  createData('One Time Enrollment Fee', 300, 350),
  
 
];
var total = 0;

const total1 = rows.reduce((total, row) => total + row.payment1, 0); 
const total2 = rows.reduce((total, row) => total + row.payment2, 0);
export default function CommonTable() {
  return (
  
     <>
     {/* <div><EnhancedTableToolbar /></div> */}
      <TableContainer component={Paper} > 
      <Table sx={{ minWidth: 700, }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Plan Fees</StyledTableCell>
            <StyledTableCell align="center">Here's your first payment</StyledTableCell>
            <StyledTableCell align="center">Here's your subsequent <br></br>monthly payment</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                {row.payment1}
              </StyledTableCell>
              <StyledTableCell align="center">{row.payment2}</StyledTableCell>
              
            </StyledTableRow>
          ))}
          
          <StyledTableRowLast >
          <StyledTableCellLast >Family Total</StyledTableCellLast>
          <StyledTableCellLast align="center">${total1}</StyledTableCellLast>
          <StyledTableCellLast align="center">${total2}</StyledTableCellLast>
          </StyledTableRowLast>
        
        </TableBody>
      </Table>
    </TableContainer>
     </>
  );
}
