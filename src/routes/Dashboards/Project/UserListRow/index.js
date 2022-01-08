import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import React from 'react';
import CmtAvatar from '../../../../@coremat/CmtAvatar';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    color: theme.palette.common.dark,
  },
}));

const UserListRow = ({ row, filterUser }) => {
  const classes = useStyles();

  const labelId = `enhanced-table-checkbox-${row.id}`;

  const renderUser = id => {
    const checkName = filterUser.filter(v => v.id === id);
    return checkName[0];
  };
  return (
    <TableRow hover tabIndex={-1} key={row.id}>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={renderUser(row.id).avatar} alt={renderUser(row.id).name} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {renderUser(row.id).name}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{renderUser(row.id).email}</TableCell>
      <TableCell>{moment(row.time).format('DD/MM/YYY')}</TableCell>
      <TableCell>{renderUser(row.id).phone || 'Chưa cập nhật'}</TableCell>
    </TableRow>
  );
};

export default React.memo(UserListRow);
