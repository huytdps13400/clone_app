import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ConfirmDialog from '../../../../@jumbo/components/Common/ConfirmDialog';
import useStyles from './index.style';

const UserTableToolbar = ({ selected, setSelected }) => {
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
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          Danh sách tài khoản
        </Typography>
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
