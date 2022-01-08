import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  errorNumber: {
    color: '#00000070',
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: 30,
    // textShadow: '10px 6px 8px hsla(0,0%,45.9%,.8)',
  },
}));

const Error404 = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box fontSize={{ xs: 100, sm: 160 }} className={classes.errorNumber}>
        404
      </Box>
      <Box fontSize={{ xs: 16, sm: 24 }} mb={8} color="grey.500">
        <Typography style={{ fontSize: 20 }}>Không có phản hồi!</Typography>
      </Box>
    </Box>
  );
};

export default Error404;
