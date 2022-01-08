import CmtList from '@coremat/CmtList';
import { CardMedia, DialogActions, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import { database, storage } from '../../../../services/auth/firebase/config';
import AddLocation from '../AddLocation';
import AddUser from '../AddUser';
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
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  boxEdit: {
    display: 'flex',
    backgroundColor: '#14284A',
    borderRadius: 100,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  chipRoot: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    marginRight: 10,
    marginBottom: 12,
    height: 26,
    fontSize: 14,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    paddingTop: '4px',
    paddingBottom: '4px',
  },
  location: {
    margin: 2,
    padding: 2,
  },
  top: {
    paddingTop: 5,
    backgroundColor: `${'#00000010'}`,
    marginBottom: 10,
    borderRadius: 12,
    paddingLeft: 10,
  },
  progress: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 10000,
  },
}));

const AddProject = ({ open, handleDialog, users }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { authUser } = useSelector(({ auth }) => auth);
  const classes = useStyles();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [profile_pic, setProfile_pic] = useState('https://via.placeholder.com/1500x1000');
  const [img, setImg] = useState(null);
  const [isAddUser, setIsAddUser] = React.useState(false);
  const [arrUser, setArrUser] = React.useState([]);
  const [titleLocation, setTitleLocation] = useState('');
  const [isAddLocation, setIsAddLocation] = React.useState(false);
  const [areaData, setAreaData] = React.useState({});
  const [dangerData, setDangerData] = React.useState({});
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
      setImg(acceptedFiles[0]);
    },
  });

  const handleSubmit = () => {
    if (!img) {
      enqueueSnackbar('Vui lòng chọn ảnh dự án', { variant: 'error' });
      return;
    }
    if (!name) {
      enqueueSnackbar('Nhập tên dự án!', { variant: 'error' });
      return;
    }
    if (!description) {
      enqueueSnackbar('Nhập mô tả dự án!', { variant: 'error' });
      return;
    }
    if (!address) {
      enqueueSnackbar('Nhập địa chỉ tả dự án!', { variant: 'error' });
      return;
    }
    let resultArea =
      Object.values(areaData).length > 0 &&
      Object.values(areaData).reduce(
        (acc, cur, i) => ((acc[i] = cur.reduce((ac, cu, j) => ((ac[j] = cu), ac), {})), acc),
        {},
      );
    let resultDanger =
      Object.values(dangerData).length > 0 &&
      Object.values(areaData).reduce(
        (acc, cur, i) => ((acc[i] = cur.reduce((ac, cu, j) => ((ac[j] = cu), ac), {})), acc),
        {},
      );

    let newData = arrUser.map(val => ({
      addedBy: authUser?.id,
      id: val,
      status: {
        editBy: authUser?.id,
        enable: true,
        time: new Date(),
      },
      time: new Date(),
    }));

    let resultWorkder = newData.reduce((acc, cur) => ((acc[cur.id] = cur), acc), {});

    const newReference = database.ref('/Projects').push();
    const refId = newReference.key;

    let data = {
      address: address,
      name: name,
      creator: authUser?.id,
      description: description,
      date: new Date().getTime(),
      url: '',
      id: refId,
      area: resultArea ? resultArea : {},
      danger: resultDanger ? resultDanger : {},
      workers: resultWorkder,
    };
    setLoading(true);
    storage
      .ref('/project')
      .child(refId)
      .put(img)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          newReference
            .set({
              ...data,
              url: url,
            })
            .then(() => {
              setName('');
              setDescription('');
              setAddress('');
              setProfile_pic('https://via.placeholder.com/1500x1000');
              setArrUser([]);
              setAreaData({});
              setDangerData({});
              setImg(null);
              handleDialog();
              setLoading(false);
            })
            .catch(error => {
              setName('');
              setDescription('');
              setAddress('');
              setProfile_pic('https://via.placeholder.com/1500x1000');
              setArrUser([]);
              setAreaData({});
              setDangerData({});
              setLoading(false);
              handleDialog();
            });
        });
      });
  };

  const _handleClose = () => {
    handleDialog();
    setName('');
    setDescription('');
    setAddress('');
    setProfile_pic('https://via.placeholder.com/1500x1000');
    setArrUser([]);
    setAreaData({});
    setDangerData({});
  };

  const _handleCloseAddUser = () => {
    setIsAddUser(false);
  };

  const _openAddUser = () => {
    setIsAddUser(true);
  };

  const _handleCallUser = val => setArrUser(val);

  const _handleAddLocation = val => {
    setIsAddLocation(true);
    setTitleLocation(val);
  };

  const handleCloseAddLocation = () => setIsAddLocation(false);

  const _renderLocation = data => {
    return (
      <>
        {data &&
          data?.map((val, i) => (
            <Box className={classes.top}>
              <Typography component="div" variant="h4">
                Vùng {i + 1}
              </Typography>
              <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                <Grid item xs={12} lg={6}>
                  <Typography fullWidth component="div" variant="h4" className={classes.location}>
                    Vĩ độ
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Typography fullWidth component="div" variant="h4" className={classes.location}>
                    Kinh độ
                  </Typography>
                </Grid>
              </Box>
              {val?.map((item, index) => (
                <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                  <Grid item xs={12} lg={6}>
                    <Typography fullWidth component="div" variant="h4" className={classes.location}>
                      {item?.latitude}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography fullWidth component="div" variant="h4" className={classes.location}>
                      {item?.longitude}
                    </Typography>
                  </Grid>
                </Box>
              ))}
            </Box>
          ))}
      </>
    );
  };
  const _handleArea = val => {
    let point = Object.keys(areaData).length;
    setAreaData(pre => ({
      ...pre,
      [point]: val,
    }));
  };

  const _handleDanger = val => {
    let point = Object.keys(dangerData).length;
    setDangerData(pre => ({
      ...pre,
      [point]: val,
    }));
  };

  return (
    <Dialog
      maxWidth="md"
      open={open}
      // onClose={handleDialog}
      className={classes.dialogRoot}
      scroll={'paper'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description">
      <DialogTitle className={classes.dialogTitleRoot}>Thêm thông tin dự án</DialogTitle>
      <DialogContent dividers>
        <Box xs={12} sm={12} className={classes.avatar}>
          <Box {...getRootProps()} className="pointer" position="relative">
            <input {...getInputProps()} />
            <CardMedia component="img" alt="Img Project" height="300" image={profile_pic} style={{ borderRadius: 20 }} />
          </Box>
        </Box>
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
          <Grid item xs={12} sm={12}>
            <Box display="flex" alignItems="center" marginTop={2} flexDirection={{ xs: 'column', sm: 'row' }}>
              <Typography component="div" variant="h4">
                Thêm người dùng
              </Typography>
              <Box className={classes.boxEdit} onClick={_openAddUser}>
                <Typography style={{ color: 'white' }}>+</Typography>
              </Box>
            </Box>
            <Box style={{ marginTop: '10px' }}>
              <CmtList
                data={arrUser}
                renderRow={(item, index) => {
                  const renderLabel = users.find(user => user.id === item);
                  return <Chip className={classes.chipRoot} key={index} label={renderLabel.name || ''} />;
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              alignItems="center"
              marginTop={2}
              marginBottom={5}
              flexDirection={{ xs: 'column', sm: 'row' }}>
              <Typography component="div" variant="h4">
                Thêm vùng an toàn
              </Typography>
              <Box className={classes.boxEdit} onClick={() => _handleAddLocation('area')}>
                <Typography style={{ color: 'white' }}>+</Typography>
              </Box>
            </Box>
            {_renderLocation(Object.values(areaData))}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              alignItems="center"
              marginTop={2}
              marginBottom={5}
              flexDirection={{ xs: 'column', sm: 'row' }}>
              <Typography component="div" variant="h4">
                Thêm vùng nguy hiểm
              </Typography>
              <Box className={classes.boxEdit} onClick={() => _handleAddLocation('danger')}>
                <Typography style={{ color: 'white' }}>+</Typography>
              </Box>
            </Box>
            {_renderLocation(Object.values(dangerData))}
          </Grid>
        </GridContainer>
        <AddUser open={isAddUser} handleDialog={_handleCloseAddUser} users={users} onPressAdd={_handleCallUser} />

        <AddLocation
          title={titleLocation}
          open={isAddLocation}
          handleDialog={handleCloseAddLocation}
          pushLocationArea={_handleArea}
          pushLocationDanger={_handleDanger}
        />
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="flex-end" mb={2} mt={2} mr={4}>
          <Button onClick={_handleClose}>Thoát</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Tạo dự án
            </Button>
          </Box>
        </Box>
      </DialogActions>

      {loading && (
        <Box className={classes.progress}>
          <CircularProgress />
        </Box>
      )}
    </Dialog>
  );
};

export default AddProject;

AddProject.prototype = {
  open: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func,
  selectedContact: PropTypes.object,
};

AddProject.defaultProps = {
  selectedContact: null,
};
