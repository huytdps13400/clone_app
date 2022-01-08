import { UPDATE_AVATAR_USER } from '@jumbo/constants/ActionTypes';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { database, storage } from '../../../../services/auth/firebase/config';
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
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  progress: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const CreateContact = ({ open, handleDialog, notify }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(({ auth }) => auth);
  const classes = useStyles();
  const [profile_pic, setProfile_pic] = useState(authUser?.avatar ? authUser?.avatar : '');
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
      setImg(acceptedFiles[0]);
    },
  });

  const checkValidations = () => {
    setLoading(true);
    storage
      .ref('/avatar')
      .child(img.name)
      .put(img)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          database
            .ref(`/Users/` + authUser?.id)
            .update({
              avatar: url,
            })
            .then(async res => {
              await dispatch({ type: UPDATE_AVATAR_USER, payload: url });
              setLoading(false);
            })
            .catch(async e => {
              setLoading(false);
            });
        });
      });
  };

  return (
    <Dialog open={open} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>Cập nhật ảnh đại diện</DialogTitle>
      <DialogContent dividers>
        <Box xs={12} sm={12} className={classes.avatar}>
          <Box {...getRootProps()} className="pointer" position="relative">
            {!loading && <input {...getInputProps()} />}
            <CmtAvatar size={300} src={profile_pic} />
          </Box>
          {loading && (
            <Box className={classes.progress}>
              <CircularProgress />
            </Box>
          )}
        </Box>

        {!loading && (
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button onClick={handleDialog}>Thoát</Button>
            <Box ml={2}>
              <Button variant="contained" color="primary" onClick={checkValidations}>
                Cập nhật
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateContact;

CreateContact.prototype = {
  open: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func,
  selectedContact: PropTypes.object,
};

CreateContact.defaultProps = {
  selectedContact: null,
};
