import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import MapIcon from '@material-ui/icons/LocationCity';
import CardGiftcard from '@material-ui/icons/CardMembershipSharp';
import PropTypes from 'prop-types';
import React from 'react';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import useStyles from './index.style';

const UserDetailView = ({ open, onCloseDialog, user }) => {
  const classes = useStyles();

  const { name, email, phone, address, avatar, cmnd } = user;

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <Box className={classes.userInfoRoot}>
        <Box mr={3} display="flex" alignItems="center">
          <Box className={classes.avatarView} mr={{ xs: 4, md: 6 }}>
            <CmtAvatar size={70} src={avatar} alt={name} />
          </Box>

          <Box mt={-2}>
            <Box display="flex" alignItems="center">
              <Typography className={classes.titleRoot}>{name}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box px={12} py={5}>
        <Box mb={5} component="p" color="common.dark">
          <Typography className={classes.titleRoot}>Thông tin tài khoản</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <EmailIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {email}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <PhoneIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {phone || 'Chưa cập nhật'}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <MapIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {address || 'Chưa cập nhật'}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <CardGiftcard />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {cmnd || 'Chưa cập nhật'}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default UserDetailView;

UserDetailView.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
