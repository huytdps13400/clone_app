import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import React from 'react';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    color: theme.palette.common.dark,
  },
}));

const UserListRow = ({ row, project }) => {
  const classes = useStyles();
  const labelId = `enhanced-table-checkbox-${row.time}`;

  const formatTime = date => {
    let time = moment(date).format('DD/MM/YYYY HH:mm:ss');
    return time;
  };

  const renderProject = () => {
    const renderName = project?.filter(v => v.id === row.projectId);
    return renderName[0]?.name;
  };

  return (
    <TableRow hover tabIndex={-1} key={row.time}>
      <TableCell align="center" id={labelId}>
        <Typography className={classes.titleRoot} component="div" variant="h4">
          {formatTime(row.time)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Checkbox checked={row.insideArea} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell align="center">
        <Checkbox checked={row.insideDanger} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell align="center">
        <Checkbox checked={row.hasPPE} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell align="center" id={labelId}>
        <Typography className={classes.titleRoot} component="div" variant="h4">
          {renderProject()}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default React.memo(UserListRow);
