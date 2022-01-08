import { Button, CardMedia } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { blue, pink } from '@material-ui/core/colors';
import { alpha, makeStyles } from '@material-ui/core/styles';
import DateRangeOutlined from '@material-ui/icons/DateRangeOutlined';
import LocationCityOutlined from '@material-ui/icons/LocationCityOutlined';
import PersonAdd from '@material-ui/icons/PersonAdd';
import React from 'react';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    height: '100%',
  },
  selectBoxRoot: {
    marginBottom: 6,
    display: 'inline-block',
    '& .MuiInput-underline:before, & .MuiInput-underline:after': {
      display: 'none',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
    '& .MuiInputBase-root': {
      fontSize: 14,
      color: theme.palette.text.secondary,
    },
  },
  addressTitle: {
    fontWeight: theme.typography.fontWeightRegular,
    [theme.breakpoints.up('lg')]: {
      fontSize: 18,
    },
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: -8,
    marginRight: -8,
  },
  socialLinkCol: {
    paddingLeft: 8,
    paddingRight: 8,
    '& .btn': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
      padding: 6,
      '& .MuiSvgIcon-root': {
        fontSize: 20,
      },
      '&.twitter': {
        backgroundColor: alpha(blue[500], 0.1),
        color: blue[500],
      },
      '&.instagram': {
        backgroundColor: alpha(pink[500], 0.1),
        color: pink[500],
      },
      '&.linkedin': {
        backgroundColor: alpha(blue[500], 0.1),
        color: blue[500],
      },
    },
  },
  contactRoot: {
    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
  },
  camera: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 100,
    width: 25,
    height: 25,
  },
}));

const OurOffice = ({ image, title, description, address, date, name, handleEdit, changeImgProject }) => {
  const classes = useStyles();

  return (
    <CmtCard className={classes.cardRoot}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="300"
        image={image ? image : 'https://via.placeholder.com/1500x1000'}
        title="Contemplative Reptile"
      />
      <Box onClick={changeImgProject}>
        <PhotoCamera className={classes.camera} />
      </Box>
      <CmtCardHeader title={title} subTitle={description} />

      <CmtCardContent>
        <Box className={classes.contactRoot} mb={6}>
          <Box display="flex" alignItems="center" mb={3} color="text.secondary">
            <DateRangeOutlined />
            <Box ml={3}>{date}</Box>
          </Box>
          <Box display="flex" alignItems="center" mb={3} color="text.secondary">
            <LocationCityOutlined />
            <Box ml={3}>{address}</Box>
          </Box>
          <Box display="flex" alignItems="center" mb={3} color="text.secondary">
            <PersonAdd />
            <Box ml={3}>{name}</Box>
          </Box>
          <Box display="flex" alignItems="center" mb={3}>
            <Button variant="outlined" color="primary" onClick={handleEdit}>
              Chỉnh sửa
            </Button>
          </Box>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default OurOffice;
