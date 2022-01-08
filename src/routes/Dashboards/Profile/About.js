import { useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CakeIcon from '@material-ui/icons/Cake';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SchoolIcon from '@material-ui/icons/School';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    '& .Cmt-header-root': {
      paddingTop: 3,
      paddingBottom: 0,
    },
  },
  tabsList: {
    position: 'relative',
    minHeight: 60,
    '& .MuiTabs-indicator': {
      backgroundColor: alpha(theme.palette.primary.main, 0.8),
    },
  },
  tabItem: {
    maxWidth: 'none',
    minWidth: 10,
    minHeight: 60,
    padding: '5px 10px',
    textTransform: 'capitalize',
    color: theme.palette.text.primary,
    fontSize: 14,
    fontWeight: theme.typography.fontWeightRegular,
  },
  columnRoot: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.5px',
  },
}));

const About = ({ userDetail }) => {
  const theme = useTheme();

  const { birthday, nativeProvincial, address } = userDetail;
  const classes = useStyles();

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        className={classes.tabsList}
        separator={{
          color: theme.palette.borderColor.dark,
        }}
        title="Thông tin"
      />
      <CmtCardContent>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <CakeIcon />
          <Box ml={2}>
            <Box fontSize={12} color="text.secondary">
              {'Ngày sinh'}
            </Box>
            <Box className={classes.columnRoot}>{birthday ? moment(birthday).format('DD/MM/YYYY') : 'Chưa cập nhật'}</Box>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <SchoolIcon />
          <Box ml={2}>
            <Box fontSize={12} color="text.secondary">
              {'Nơi công tác'}
            </Box>
            <Box className={classes.columnRoot}>{nativeProvincial || 'Chưa cập nhật'}</Box>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <LocationOnIcon />
          <Box ml={2}>
            <Box fontSize={12} color="text.secondary">
              {'Địa chỉ'}
            </Box>
            <Box className={classes.columnRoot}>{address || 'Chưa cập nhật'}</Box>
          </Box>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default About;

About.prototype = {
  userDetail: PropTypes.object.isRequired,
};
