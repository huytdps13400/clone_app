import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import ListTableView from '../ListTableView';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontSize: 18,
      color: theme.palette.common.dark,
    },
  },
  inBuildAppMainContent: {
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  perfectScrollbarContactCon: {
    height: props => `calc(100vh - ${props.height}px)`,
  },
}));

const AddUser = ({ open, handleDialog, users, onPressAdd }) => {
  const classes = useStyles();
  const [checkedContacts, setCheckedContacts] = useState([]);

  const handleCellCheckBox = (isChecked, id) => {
    if (isChecked) {
      setCheckedContacts(checkedContacts.concat(id));
    } else {
      setCheckedContacts(checkedContacts.filter(contactId => contactId !== id));
    }
  };

  const handleHeaderCheckBox = isChecked => {
    if (isChecked) {
      const ids = users.map(contact => contact.id);
      updateCheckedContacts(ids);
    } else {
      updateCheckedContacts([]);
    }
  };
  const updateCheckedContacts = contactIds => {
    setCheckedContacts(contactIds);
  };

  const handleSubmit = () => {
    onPressAdd(checkedContacts);
    handleDialog();
  };

  const handleClose = () => {
    handleDialog();
    setCheckedContacts([]);
  };

  return (
    <Dialog maxWidth="lg" open={open} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>Thêm người dùng</DialogTitle>
      <DialogContent dividers>
        <GridContainer style={{ marginBottom: 12 }}>
          <Box className={classes.inBuildAppMainContent}>
            <PerfectScrollbar className={classes.perfectScrollbarContactCon}>
              <ListTableView
                contactsList={users}
                checkedContacts={checkedContacts}
                handleCellCheckBox={handleCellCheckBox}
                handleHeaderCheckBox={handleHeaderCheckBox}
                handleUpdateUser={handleSubmit}
              />
            </PerfectScrollbar>
          </Box>
        </GridContainer>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={handleClose}>Thoát</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;

AddUser.prototype = {
  open: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func,
  selectedContact: PropTypes.object,
};

AddUser.defaultProps = {
  selectedContact: null,
};
