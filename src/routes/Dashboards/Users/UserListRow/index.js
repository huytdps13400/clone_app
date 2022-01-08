import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { MoreHoriz, Visibility } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    color: theme.palette.common.dark,
  },
}));

const getUserActions = user => {
  const actions = [{ action: 'view', label: 'View', icon: <Visibility /> }];
  return actions;
};

const UserListRow = ({ row, onUserView }) => {
  const classes = useStyles();

  const onUserMenuClick = menu => {
    if (menu.action === 'view') {
      onUserView(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const userActions = getUserActions(row);

  return (
    <TableRow hoverBorderColor tabIndex={-1} key={row.id}>
      <TableCell component="th" id={labelId} scope="row" padding="normal">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={row.avatar} alt={row.name} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.name}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{moment(row.time).format('DD/MM/YYYY')}</TableCell>
      <TableCell>{row.phone || 'Chưa cập nhật'}</TableCell>
      <TableCell align="right" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={userActions} onItemClick={onUserMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(UserListRow);
