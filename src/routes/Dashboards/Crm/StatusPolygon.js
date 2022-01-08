import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment';
import React, { useState } from 'react';
import ConfirmDialog from '../../../@jumbo/components/Common/ConfirmDialog';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import UserListRow from './UserListRow';
import UserTableHead from './UserTableHead';
import UserTableToolbar from './UserTableToolbar';

const StatusPolygon = ({ location, project, selectedDate, setSelectedDate, user, setUser }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ name: '' });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleConfirmDelete = () => {};

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <UserTableToolbar
          selected={selected}
          setSelected={setSelected}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          user={user}
          setUser={setUser}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <UserTableHead classes={classes} />
            <TableBody>
              {!!location.filter(
                item => moment(item.time).format('DD/MM/YYYY') === moment(selectedDate).format('DD/MM/YYYY'),
              ).length ? (
                location
                  .filter(item => moment(item.time).format('DD/MM/YYYY') === moment(selectedDate).format('DD/MM/YYYY'))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => <UserListRow key={index} row={row} project={project} />)
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    <NoRecordFound>Không có dữ liệu.</NoRecordFound>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={
            location.filter(item => moment(item.time).format('DD/MM/YYYY') === moment(selectedDate).format('DD/MM/YYYY'))
              .length || 0
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      <ConfirmDialog
        open={openConfirmDialog}
        title={`Confirm delete ${selectedUser.name}`}
        content={'Are you sure, you want to  delete this user?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default StatusPolygon;
