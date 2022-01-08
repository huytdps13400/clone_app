import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { alpha, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import Firebase from 'services/auth/firebase';
import CmtImage from '../../../../@coremat/CmtImage';
import { AuhMethods } from '../../../../services/auth';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import IntlMessages from '../../../utils/IntlMessages';
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
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
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
  textCapital: {
    textTransform: 'capitalize',
  },
  textAcc: {
    textAlign: 'center',
    '& a': {
      marginLeft: 4,
    },
  },
  alrTextRoot: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
}));

//variant = 'default', 'standard', 'bgColor'
const SignUp = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const history = useHistory();
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo#123');
  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const onSubmit = () => {
    dispatch(Firebase.onRegister({ name, email, password, history }));
  };

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src={'/images/auth/sign-up-img.png'} />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
          <CmtImage src={'/images/logo_horizonal.png'} />
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Đăng ký tài khoản
        </Typography>
        <form>
          <Box mb={2}>
            <TextField
              label={'Họ & tên'}
              fullWidth
              onChange={event => setName(event.target.value)}
              defaultValue={name}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label={'Email'}
              fullWidth
              onChange={event => setEmail(event.target.value)}
              defaultValue={email}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label={'Mật khẩu'}
              fullWidth
              onChange={event => setPassword(event.target.value)}
              defaultValue={password}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent={{ sm: 'space-between' }}
            mb={3}>
            <Box mb={{ xs: 2, sm: 0 }}>
              <Button onClick={onSubmit} variant="contained" color="primary">
                <Typography>Đăng ký</Typography>
              </Button>
            </Box>

            {/* <Typography className={classes.alrTextRoot}>
              <NavLink to="/signin">
                <Typography>Đăng ký</Typography>
              </NavLink>
            </Typography> */}
          </Box>
        </form>

        <Box mb={3}>{dispatch(AuhMethods[method].getSocialMediaIcons())}</Box>

        <Typography className={classes.textAcc}>
          Bạn đã có tài khoản?
          <NavLink to="/signin">Đăng nhập</NavLink>
        </Typography>
        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default SignUp;
