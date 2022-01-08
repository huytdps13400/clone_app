import { CardMedia } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { database, storage } from '../../../../services/auth/firebase/config';

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

const EditImgProject = ({ open, handleDialog, project, closeProject }) => {
  const classes = useStyles();
  const [profile_pic, setProfile_pic] = useState(project?.url ? project?.url : 'https://via.placeholder.com/1500x1000');
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
      .ref('/project')
      .child(project?.id)
      .put(img)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          database
            .ref(`/Projects/` + project?.id)
            .update({
              url: url,
            })
            .then(async res => {
              handleDialog();
              setTimeout(() => {
                closeProject();
              }, 1000);
              setLoading(false);
            })
            .catch(async e => {
              setLoading(false);
              handleDialog();
              setTimeout(() => {
                closeProject();
              }, 1000);
            });
        });
      });
  };

  return (
    <Dialog open={open} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>Cập nhật ảnh dự án</DialogTitle>
      <DialogContent dividers>
        <Box xs={12} sm={12} className={classes.avatar}>
          <Box {...getRootProps()} className="pointer" position="relative">
            {!loading && <input {...getInputProps()} />}
            <CardMedia component="img" alt="Img Project" height="300" image={profile_pic} />
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

export default EditImgProject;

EditImgProject.prototype = {
  open: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func,
  selectedContact: PropTypes.object,
};

EditImgProject.defaultProps = {
  selectedContact: null,
};
