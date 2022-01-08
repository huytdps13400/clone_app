import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';

const headCells = [
  {
    id: 'time',
    numeric: false,
    disablePadding: false,
    label: 'Thời gian',
  },
  { id: 'area', numeric: false, disablePadding: false, label: 'Trong vùng dự án' },
  { id: 'danger', numeric: false, disablePadding: false, label: 'Vào vùng nguy hiểm' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Đồ bảo hộ' },
  { id: 'project', numeric: false, disablePadding: false, label: 'Dự án' },
];

function UserTableHead({ classes }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align="center"
            className={classes.rowHeader}
            padding={headCell.disablePadding ? 'none' : 'normal'}>
            <TableSortLabel>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

UserTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default React.memo(UserTableHead);
