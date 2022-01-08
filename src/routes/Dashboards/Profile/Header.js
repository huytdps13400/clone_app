import Box from '@material-ui/core/Box';
import { alpha } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import CmtAvatar from '../../../@coremat/CmtAvatar';
import CmtImage from '../../../@coremat/CmtImage';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
  headerRoot: {
    position: 'relative',
    margin: '-30px -15px 0 -15px',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 30,
    paddingBottom: 20,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 56,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: -50,
      marginRight: -50,
      paddingLeft: 50,
      paddingRight: 50,
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: -65,
      marginRight: -65,
      paddingLeft: 65,
      paddingRight: 65,
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: -88,
      marginRight: -88,
      paddingLeft: 88,
      paddingRight: 88,
    },
  },
  headerBgImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    minHeight: 370,
    zIndex: 0,
    [theme.breakpoints.up('sm')]: {
      minHeight: 270,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#14284A',
    },
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  headerContent: {
    position: 'relative',
    zIndex: 3,
  },
  titleRoot: {
    color: theme.palette.common.white,
    marginBottom: 4,
  },
  subTitleRoot: {
    color: alpha(theme.palette.common.white, 0.74),
  },

  camera: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    borderRadius: 100,
    width: 25,
    height: 25,
  },
  icon: {
    alignSelf: 'center',
  },
  boxEdit: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: 30,
  },
}));

const Header = ({ userDetail, changeAvatar, onPressEdit }) => {
  const classes = useStyles();

  const _handleEdit = () => {
    onPressEdit && onPressEdit();
  };

  return (
    <Box className={classes.headerRoot}>
      <Box className={classes.headerBgImg}></Box>
      <Box className={classes.headerContent}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" mb={4}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center">
            <Box position="relative" mr={{ sm: 4, md: 5, lg: 6 }} mb={{ xs: 3, sm: 0 }} onClick={changeAvatar}>
              <CmtAvatar size={80} src={userDetail?.avatar} alt={'Avatar'} />
              <PhotoCamera color="error" className={classes.camera} />
            </Box>
            <Box>
              <Typography className={classes.titleRoot} component="div" variant="h1">
                {userDetail?.name}
              </Typography>
              <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                <Typography className={classes.subTitleRoot}>{userDetail?.email}</Typography>
                <Box className={classes.boxEdit} onClick={_handleEdit}>
                  <Typography>Cập nhật</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

Header.prototype = {
  userDetail: PropTypes.object.isRequired,
  tabValue: PropTypes.string.isRequired,
  handleTabChange: PropTypes.func,
};
