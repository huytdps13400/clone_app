import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import useStyles from './ContactCell.style';

const ContactCell = ({ contact, checkedContacts, handleCellCheckBox, onShowContactDetail }) => {
  const classes = useStyles();
  const { id, name, email, phone, nativeProvincial, avatar } = contact;
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell className={classes.tableCellRoot}>
        <Box display="flex" alignItems="center">
          <Box component="span" mr={2} onClick={e => e.stopPropagation()}>
            <Checkbox
              color="primary"
              checked={checkedContacts.includes(id)}
              onChange={event => handleCellCheckBox(event.target.checked, id)}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Box mr={{ xs: 4, md: 5 }}>
              <CmtAvatar size={40} src={avatar} alt={name} />
            </Box>

            <Box>
              <Typography className={classes.titleRoot} component="div" variant="h4">
                {name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell className={classes.tableCellRoot}>{email}</TableCell>
      <TableCell className={classes.tableCellRoot}>{phone}</TableCell>
      <TableCell className={classes.tableCellRoot}>{nativeProvincial}</TableCell>
    </TableRow>
  );
};

export default ContactCell;

ContactCell.prototype = {
  contact: PropTypes.object.isRequired,
  checkedContacts: PropTypes.array,
  handleCellCheckBox: PropTypes.func,
  onShowContactDetail: PropTypes.func,
  onClickEditContact: PropTypes.func,
};

ContactCell.defaultProps = {
  checkedContacts: [],
};
