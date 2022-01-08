import { Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { alpha } from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Firebase from 'services/auth/firebase';
import CmtImage from '../../../../@coremat/CmtImage';
import { fetchError } from '../../../../redux/actions';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import ContentLoader from '../../ContentLoader';
import AuthWrapper from './AuthWrapper';

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    [theme.breakpoints.up('md')]: {
      order: 1,
      width: props => (props.variant === 'default' ? '50%' : '100%'),
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  alertRoot: {
    marginBottom: 10,
  },
}));

const ForgotPassword = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles({ variant });
  const history = useHistory();

  const onSubmit = () => {
    if (!email) {
      dispatch(fetchError('Không để trống email!'));
      return;
    }
    dispatch(Firebase.onForgotPassword(email, history));
  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <div className={classes.authThumb}>
          <CmtImage src={'/images/auth/forgot-img.png'} />
        </div>
      ) : null}
      <div className={classes.authContent}>
        <div className={'mb-7'}>
          <CmtImage src={'/images/logo_horizonal.png'} />
        </div>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Quên mật khẩu
        </Typography>
        <form>
          <div className={'mb-5'}>
            <TextField
              label={'Email'}
              fullWidth
              onChange={event => setEmail(event.target.value)}
              defaultValue={email}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </div>
          <div className={'mb-5'}>
            <Button onClick={onSubmit} variant="contained" color="primary">
              <Typography>Xác nhận</Typography>
            </Button>
          </div>

          <div>
            <Typography>
              Tổng đài hỗ trợ
              <span className={'ml-2'}>
                <Link href="#">1900 0000</Link>
              </span>
            </Typography>
          </div>
        </form>
        <ContentLoader />
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
