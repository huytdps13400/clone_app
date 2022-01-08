import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import CmtList from '../../../../@coremat/CmtList';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import { database } from '../../../../services/auth/firebase/config';
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
function NumberFormatCustom({ onChange, value, ...other }) {
  const [phoneNo, setPhone] = useState('');

  useEffect(() => {
    if (!phoneNo && value) {
      setTimeout(() => {
        setPhone(value);
      }, 300);
    }
  }, [phoneNo, value]);

  const onNumberChange = number => {
    setPhone(number.formattedValue);
    onChange(number.formattedValue);
  };

  return <NumberFormat {...other} onValueChange={onNumberChange} value={phoneNo} />;
}

const EditLocation = ({ open, handleDialog, title, points, id, region, closeProject }) => {
  const classes = useStyles();
  const [point, setPoint] = useState([{ longitude: '', latitude: '' }]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const onAddPhoneRow = () => {
    setPoint(point.concat({ longitude: '', latitude: '' }));
  };

  const onRemovePhoneRow = index => {
    const updatedList = [...point];
    updatedList.splice(index, 1);
    setPoint(updatedList);
  };

  const onAddLong = (number, index) => {
    const updatedList = [...point];
    updatedList[index].longitude = Number.parseFloat(number);
    setPoint(updatedList);
  };
  const onAddLat = (number, index) => {
    const updatedList = [...point];
    updatedList[index].latitude = Number.parseFloat(number);
    setPoint(updatedList);
  };

  const isPhonesMultiple = point.length > 1;

  const checkValidations = () => {
    var obj = point.reduce(function(acc, cur, i) {
      acc[i] = cur;
      return acc;
    }, {});
    let check = false;
    if (point && point.length < 3) {
      enqueueSnackbar('Thêm tối thiểu 3 vị trí!', { variant: 'error' });
      return;
    }
    for (let i = 0; i < point.length; i++) {
      if (!point[i].latitude || !point[i].longitude) {
        check = true;
      } else if (!point[i].latitude) {
        check = true;
      } else if (!point[i].longitude) {
        check = true;
      }
    }

    if (check) {
      enqueueSnackbar('Không để trống vị trí!', { variant: 'error' });
      return;
    }
    setLoading(true);
    database
      .ref(`/Projects/` + id + '/' + region + '/' + points)
      .set(obj)
      .then(async res => {
        setLoading(false);
        handleDialog();
        setTimeout(() => {
          closeProject();
        }, 500);
      })
      .catch(async e => {
        setLoading(false);
        handleDialog();
      });
  };

  return (
    <Dialog maxWidth="lg" open={open} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography>Vùng {points + 1}</Typography>
        <CmtList
          data={point}
          renderRow={(item, index) => (
            <GridContainer style={{ marginBottom: 12 }} key={index}>
              <Grid item xs={12} sm={5}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Kinh độ"
                  value={item.longitude}
                  onChange={number => onAddLong(number, index)}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Vĩ độ"
                  value={item.latitude}
                  onChange={number => onAddLat(number, index)}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
              {isPhonesMultiple && (
                <Grid item xs={2} sm={2}>
                  <IconButton onClick={() => onRemovePhoneRow(index)}>
                    <CancelIcon />
                  </IconButton>
                </Grid>
              )}
            </GridContainer>
          )}
        />
        <Box
          mb={{ xs: 6, md: 5 }}
          display="flex"
          alignItems="center"
          onClick={onAddPhoneRow}
          className="pointer"
          color="primary.main">
          <AddCircleOutlineIcon />
          <Box ml={2}>Add More</Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button disabled={loading} onClick={handleDialog}>
            Cancel
          </Button>
          <Box ml={2}>
            <Button disabled={loading} variant="contained" color="primary" onClick={checkValidations}>
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
      {loading && (
        <Box className={classes.progress}>
          <CircularProgress />
        </Box>
      )}
    </Dialog>
  );
};

export default EditLocation;

EditLocation.prototype = {
  open: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func,
  selectedContact: PropTypes.object,
};

EditLocation.defaultProps = {
  selectedContact: null,
};
