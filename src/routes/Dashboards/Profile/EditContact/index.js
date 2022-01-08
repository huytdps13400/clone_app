import { UPDATE_USER } from '@jumbo/constants/ActionTypes';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import { database } from '../../../../services/auth/firebase/config';
import MaterialUIPickers from './MaterialUIPickers';
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
  progress: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
}));

const EditContact = ({ open, handleDialog }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState(authUser ? authUser?.name : '');
  const [company, setCompany] = useState(authUser ? authUser?.nativeProvincial : '');
  const [address, setAddress] = useState(authUser ? authUser?.address : '');
  const [phones, setPhones] = useState(authUser ? authUser?.phone : '');
  const [cmnd, setCmnd] = useState(authUser ? authUser?.cmnd : '');
  const [selectedDate, setSelectedDate] = useState(authUser.birthday ? new Date(authUser.birthday) : new Date());
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    database
      .ref(`/Users/` + authUser?.id)
      .update({
        name: name,
        nativeProvincial: company,
        address: address,
        phone: phones,
        cmnd: cmnd,
        birthday: selectedDate,
      })
      .then(async res => {
        await dispatch({
          type: UPDATE_USER,
          payload: {
            name: name,
            cmnd: cmnd,
            phone: phones,
            address: address,
            nativeProvincial: company,
            birthday: selectedDate,
          },
        });

        setLoading(false);
        handleDialog();
      })
      .catch(async e => {
        setLoading(false);
        handleDialog();
      });
  };

  const _targetDate = e => {
    setSelectedDate(new Date(e).getTime());
    // console.log('date---', new Date(e).getTime());
  };

  return (
    <Dialog maxWidth="md" open={open} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>Cập nhật thông tin</DialogTitle>
      <DialogContent dividers>
        <GridContainer style={{ marginBottom: 12, position: 'relative' }}>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Họ & tên"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Nơi công tác"
              value={company}
              onChange={e => setCompany(e.target.value)}
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
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Số điện thoại"
              value={phones}
              onChange={e => setPhones(e.target.valueber)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput fullWidth variant="outlined" label="CMND" value={cmnd} onChange={e => setCmnd(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MaterialUIPickers selectedDate={selectedDate} setSelectedDate={_targetDate} />
          </Grid>
          {loading && (
            <Box className={classes.progress}>
              <CircularProgress />
            </Box>
          )}
        </GridContainer>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button disabled={loading} onClick={handleDialog}>
            Thoát
          </Button>
          <Box ml={2}>
            <Button disabled={loading} variant="contained" color="primary" onClick={handleSubmit}>
              Cập nhật
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditContact;

EditContact.prototype = {
  open: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func,
  selectedContact: PropTypes.object,
};

EditContact.defaultProps = {
  selectedContact: null,
};
