import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmDialog from '../../../../@jumbo/components/Common/ConfirmDialog';
import MultipleSelect from '../MultipleSelect';
import useStyles from './index.style';
import MaterialUIPickers from './MaterialUIPickers';

const UserTableToolbar = ({ selected, setSelected, selectedDate, setSelectedDate, user, setUser }) => {
  const classes = useStyles();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const numSelected = selected.length;

  return (
    <React.Fragment>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}>
        <div className={classes.date}>
          <MaterialUIPickers selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <div className={classes.date}>
          <MultipleSelect user={user} setUser={setUser} />
        </div>
      </Toolbar>

      <ConfirmDialog
        open={openConfirmDialog}
        title={`Confirm delete users`}
        content={'Are you sure, you want to  delete selected users?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </React.Fragment>
  );
};

UserTableToolbar.propTypes = {
  selected: PropTypes.array,
  setSelected: PropTypes.func,
  filterOptions: PropTypes.array,
  setFilterOptions: PropTypes.func,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  onUserAdd: PropTypes.func,
};

export default React.memo(UserTableToolbar);
