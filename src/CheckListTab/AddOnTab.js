import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import CheckListStyles from "./CheckListStyles.css";
import { Button } from "react-bootstrap";
import CommonDropDwn from "./CommonDropDwn";
import CommonDropDown from "./CommonDropDown";
import CommonTable from "./CommonTable";
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import CloseIcon from '@mui/icons-material/Close';
function createData(planInfo, EnrollFee, cost) {
  return {
    planInfo,
    EnrollFee,
    cost,
  };
}

const rows = [
  createData("Add Elite1", "$100", "$200"),
  createData("Add Elite2", "$100", "$300"),
  createData("Add Elite3", "$100", "$700"),
  createData("Add Optimum1", "$100", "$800"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const options = [
  {
    id: "planInfo",
    numeric: false,
    disablePadding: true,
  },
  {
    id: "EnrollFee",
    numeric: true,
    disablePadding: false,
  },
  {
    id: "cost",
    numeric: true,
    disablePadding: false,
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    setSelected,
    newSelected
    

  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        
        {options.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected,newSelected,setSelected, } = props;
  
  const [modalShow, setModalShow] = React.useState(props.modalShow);
  const showTotal = () => {
    options.map((item) => {
      if (item.setSelected) {
        return <span>{item.cost}</span>;
      } else {
        return null;
      }
    });
  };
  return (
    <Box>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        <Typography
          sx={{ display: "flex", flex: "1 1 auto" }}
          id="tableTitle"
          component="div"
        >
          Review the plans available, compare premiums and click the ADD button.
        </Typography>

        <div>
          <Tooltip>
            <IconButton>
              <h3 style={{ color: "#00c389" }}>{()=>setSelected(newSelected)}</h3>
            </IconButton>
          </Tooltip>

          <Tooltip>
            <IconButton  onClick={() => setModalShow(true)}>
              <Button
                class="btn bg-transparent"
              >

                Review Choices
              </Button>
            </IconButton>
          </Tooltip>
          <BasicModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        </div>
      </Toolbar>
    </Box>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};



export default function AddOnTab({showModal,setShowModal}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("EnrollFee");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedValue, setSelectedValue] = React.useState();
  const [modalShow, setModalShow] = React.useState(false);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeCheckboxs = (id) => {
    setSelected((prev) => {
      return prev.map((item) => {
        if (item.id == id) {
          return { ...item, check: !item.check };
        } else {
          return { ...item };
        }
      });
    });
  };

  const handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setSelectedValue(
      event.target.value
    );}

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.planInfo);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, planInfo) => {
    const selectedIndex = selected.indexOf(planInfo);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [planInfo];
    }

    setSelected(newSelected);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (planInfo) => selected.indexOf(planInfo) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            {/* <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            /> */}
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.planInfo);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.planInfo)}
                      role="radio"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.planInfo}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                      <Radio
        checked={isItemSelected}
        onChange={handleChange}
        value={row.planInfo }
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.planInfo}
                      </TableCell>
                      <TableCell align="right">
                        <CommonDropDwn />
                      </TableCell>
                      <TableCell align="right">
                        <span
                          style={{
                            color: "#00c389",
                            fontWeight: 650,
                            fontSize: "25px",
                          }}
                        >
                          {row.cost}
                        </span>
                        /Month
                      </TableCell>
                      <TableCell align="right">
                        <Button style={{ border: "none", fontWeight: 600 }}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
      </Paper>
    </Box>
  );
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 740,
  height:300,
  bgcolor: 'background.paper',
 
  boxShadow: 24,
 p:4
};
export function BasicModal(props) {
  
  // const handleOpen = (value) => setModalShow(value);
  // const handleClose = () => setModalShow(false);

  return (
    
      <Modal
        open={props.show}
        onClose={props.onHide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        

        
        <Box  sx={style}>
      <Box>  <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },

            bgcolor: '#e3e3e3'
        
        }}
        className = 'modal-header'
      >
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
         component="div">Review Choices</Typography>
         <IconButton onClick={props.onHide}>
                          <CloseIcon />
                    </IconButton>
         </Toolbar>
         </Box>
          <Box><CommonTable /></Box>
        </Box>
      </Modal>
    
  );
}