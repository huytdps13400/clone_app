import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import { database } from '../../../../services/auth/firebase/config';
import ListTableView from '../ListTableView';
import { useSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  progress: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
}));

const AddUser = ({ open, handleDialog, users, idProject, closeProject }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { authUser } = useSelector(({ auth }) => auth);
  const classes = useStyles();
  const [checkedContacts, setCheckedContacts] = useState([]);
  const [loading, setLoading] = useState(false);

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
    if (!checkedContacts.length > 0) {
      enqueueSnackbar('Thêm tối thiểu 3 vị trí!', { variant: 'error' });
      return;
    }
    let newData = checkedContacts.map(val => ({
      addedBy: authUser?.id,
      id: val,
      status: {
        editBy: authUser?.id,
        enable: true,
        time: new Date(),
      },
      time: new Date(),
    }));

    let result = newData.reduce((acc, cur) => ((acc[cur.id] = cur), acc), {});
    setLoading(true);
    database
      .ref(`/Projects/` + idProject + '/' + 'workers')
      .update(result)
      .then(async res => {
        setLoading(false);
        handleDialog();
        setTimeout(() => {
          closeProject();
        }, 500);
      })
      .catch(async e => {
        setLoading(false);
        handleDialog();
        setTimeout(() => {
          closeProject();
        }, 500);
      });
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
      {loading && (
        <Box className={classes.progress}>
          <CircularProgress />
        </Box>
      )}
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
