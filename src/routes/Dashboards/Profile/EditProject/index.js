import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import { database } from '../../../../services/auth/firebase/config';

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
}));

const EditProject = ({ open, handleDialog, projects, closeProject }) => {
  const classes = useStyles();
  const [name, setName] = useState(projects?.name);
  const [address, setAddress] = useState(projects?.address);
  const [description, setDescription] = useState(projects?.description);

  const handleSubmit = () => {
    database
      .ref(`/Projects/` + projects?.id)
      .update({
        name: name,
        address: address,
        description: description,
      })
      .then(async res => {
        handleDialog();
        setTimeout(() => {
          closeProject();
        }, 1000);
      })
      .catch(async e => {
        handleDialog();
        setTimeout(() => {
          closeProject();
        }, 1000);
      });
  };

  return (
    <Dialog maxWidth="md" open={open} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>Cập nhật thông tin dự án</DialogTitle>
      <DialogContent dividers>
        <GridContainer style={{ marginBottom: 12 }}>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Tên dự án"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Địa chỉ"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Mô tả"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>
        </GridContainer>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={handleDialog}>Thoát</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Cập nhật
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditProject;

EditProject.prototype = {
  open: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func,
  selectedContact: PropTypes.object,
};

EditProject.defaultProps = {
  selectedContact: null,
};
