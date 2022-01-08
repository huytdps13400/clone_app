import { Box } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MyLocation from '@material-ui/icons/MyLocation';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import { geValidUrl } from '../../../@jumbo/utils/commonHelper';

const useStyles = makeStyles(theme => ({
  iconView: {
    backgroundColor: alpha(blue['500'], 0.1),
    color: blue['500'],
    padding: 8,
    borderRadius: 4,
    '& .MuiSvgIcon-root': {
      display: 'block',
    },
    '&.web': {
      backgroundColor: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main,
    },
    '&.phone': {
      backgroundColor: alpha(theme.palette.success.main, 0.15),
      color: theme.palette.success.dark,
    },
  },
  wordAddress: {
    wordBreak: 'break-all',
    cursor: 'pointer',
  },
}));

const Contact = ({ userDetail }) => {
  // const { email, website, phone, address } = userDetail;
  const classes = useStyles();
  return (
    <CmtCard>
      <CmtCardHeader title="Liên hệ" />
      <CmtCardContent>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <Box className={classes.iconView}>
            <MailOutlineIcon />
          </Box>
          <Box ml={5}>
            <Box component="span" fontSize={12} color="text.secondary">
              Email
            </Box>
            <Box component="p" className={classes.wordAddress} fontSize={16}>
              <Box>{userDetail?.email || 'Chưa cập nhật'}</Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
          <Box className={clsx(classes.iconView, 'web')}>
            <MyLocation />
          </Box>
          <Box ml={5}>
            <Box component="span" fontSize={12} color="text.secondary">
              Địa chỉ
            </Box>
            <Box component="p" className={classes.wordAddress} fontSize={16}>
              <Box>{userDetail?.address || 'Chưa cập nhật'}</Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box className={clsx(classes.iconView, 'phone')}>
            <LocalPhoneIcon />
          </Box>
          <Box ml={5}>
            <Box component="span" fontSize={12} color="text.secondary">
              Phone
            </Box>
            <Box component="p" className={classes.wordAddress} fontSize={16} color="text.primary">
              {userDetail?.phone || 'Chưa cập nhật'}
            </Box>
          </Box>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default Contact;

Contact.prototype = {
  userDetail: PropTypes.object.isRequired,
};
