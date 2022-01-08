import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import React from 'react';
import useStyles from '../index.style';

const CheckedListHeader = ({ checkedContacts, handleHeaderCheckBox, contactsList, handleUpdateUser }) => {
  const classes = useStyles();

  return (
    <Box className={classes.appContentHeader}>
      <Checkbox
        color="primary"
        indeterminate={checkedContacts.length > 0 && checkedContacts.length < contactsList.length}
        checked={checkedContacts.length > 0 && checkedContacts.length === contactsList.length}
        onChange={e => handleHeaderCheckBox(e.target.checked, contactsList)}
      />
      <Box ml="auto" display="flex" alignItems="center">
        <Button variant="outlined" color="primary" onClick={handleUpdateUser}>
          Cập nhật
        </Button>
      </Box>
    </Box>
  );
};

export default CheckedListHeader;

CheckedListHeader.prototype = {
  checkedContacts: PropTypes.array.isRequired,
  handleHeaderCheckBox: PropTypes.func,
  updateCheckedContacts: PropTypes.func,
};
