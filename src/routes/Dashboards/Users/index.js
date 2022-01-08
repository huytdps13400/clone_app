import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { database } from '../../../services/auth/firebase/config';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import UserDetailView from './UserDetailView';
import UserListRow from './UserListRow';
import UserTableHead from './UserTableHead';
import UserTableToolbar from './UserTableToolbar';

const UsersModule = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const classes = useStyles();
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [users, setUsers] = React.useState([]);
  const [viewUser, setViewUser] = React.useState({});

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (authUser?.id) {
      const users = database.ref('Users/');
      users
        .once('value')
        .then(snapshot => {
          const datas = Object.values(snapshot.val());
          if (snapshot.val()) {
            setUsers(datas);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [authUser?.id]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = users.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUserView = user => {
    setViewUser(user);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <UserTableToolbar selected={selected} setSelected={setSelected} />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <UserTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {!!users.length ? (
                stableSort(users, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => <UserListRow key={index} row={row} onUserView={handleUserView} />)
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    <NoRecordFound>Dữ liệu trống</NoRecordFound>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
      {openViewDialog && <UserDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} user={viewUser} />}
    </div>
  );
};

export default UsersModule;
