import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';
import { setAuthUser, updateLoadUser } from '../../../redux/actions/Auth';
import { auth, database, facebookAuthProvider, githubAuthProvider, googleAuthProvider, twitterAuthProvider } from './config';

const useStyles = makeStyles(theme => ({
  iconBtn: {
    '&:hover, &:focus': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 6,
    },
  },
}));

const SocialMediaIcons = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const signInUserWithGoogle = () => {
    dispatch(fetchStart());
    try {
      auth
        .signInWithPopup(googleAuthProvider)
        .then(data => {
          dispatch(fetchSuccess());
          dispatch(setAuthUser(data.user));
        })
        .catch(error => {
          dispatch(fetchError(error.message));
        });
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };

  const signInUserWithGithub = () => {
    dispatch(fetchStart());
    try {
      auth
        .signInWithPopup(githubAuthProvider)
        .then(data => {
          dispatch(fetchSuccess());
          dispatch(setAuthUser(data.user));
        })
        .catch(error => {
          dispatch(fetchError(error.message));
        });
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };

  const signInUserWithFacebook = () => {
    dispatch(fetchStart());
    try {
      auth
        .signInWithPopup(facebookAuthProvider)
        .then(data => {
          dispatch(fetchSuccess());
          dispatch(setAuthUser(data.user));
        })
        .catch(error => {
          dispatch(fetchError(error.message));
        });
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };

  const signInUserWithTwitter = () => {
    dispatch(fetchStart());
    try {
      auth
        .signInWithPopup(twitterAuthProvider)
        .then(data => {
          dispatch(fetchSuccess());
          dispatch(setAuthUser(data.user));
        })
        .catch(error => {
          dispatch(fetchError(error.message));
        });
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton className={classes.iconBtn} onClick={signInUserWithFacebook}>
        <FacebookIcon />
      </IconButton>
      <IconButton className={classes.iconBtn} onClick={signInUserWithTwitter}>
        <TwitterIcon />
      </IconButton>
      <IconButton className={classes.iconBtn} onClick={signInUserWithGoogle}>
        <FacebookIcon />
      </IconButton>
      <IconButton className={classes.iconBtn} onClick={signInUserWithGithub}>
        <GitHubIcon />
      </IconButton>
    </Box>
  );
};

const Firebase = {
  onRegister: ({ name, email, password, history }) => {
    return dispatch => {
      dispatch(fetchStart());
      try {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(data => {
            database
              .ref('Users/' + data?.user?.uid)
              .set({
                name: name,
                email: email,
                id: data?.user?.uid,
                address: '',
                phone: '',
                birthday: '',
                nativeProvincial: '',
                avatar: '',
                cmnd: '',
              })
              .then(() => {
                dispatch(fetchSuccess('????ng k?? th??nh c??ng'));
                dispatch(
                  setAuthUser({
                    name: name || email,
                    email: email,
                    id: data?.user?.uid,
                  }),
                );
                history.push('./signin');
              })
              .catch(error => {
                if (error?.code === 'auth/weak-password') {
                  dispatch(fetchError('M???t kh???u ph???i nhi???u h??n 6 k?? t???'));
                } else if (error?.code === 'auth/email-already-in-use') {
                  dispatch(fetchError('T??i kho???n ???? t???n t???i'));
                } else if (error?.code === 'auth/invalid-email') {
                  dispatch(fetchError('Email kh??ng ????ng ?????nh d???ng'));
                } else {
                  dispatch(fetchError('L???i h??? th???ng'));
                }
              });
          })
          .catch(error => {
            if (error?.code === 'auth/weak-password') {
              dispatch(fetchError('M???t kh???u ph???i nhi???u h??n 6 k?? t???'));
            } else if (error?.code === 'auth/email-already-in-use') {
              dispatch(fetchError('T??i kho???n ???? t???n t???i'));
            } else if (error?.code === 'auth/invalid-email') {
              dispatch(fetchError('Email kh??ng ????ng ?????nh d???ng'));
            } else {
              dispatch(fetchError('L???i h??? th???ng'));
            }
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },

  onLogin: ({ email, password }) => {
    return dispatch => {
      try {
        dispatch(fetchStart());
        auth
          .signInWithEmailAndPassword(email, password)
          .then(data => {
            const user = database.ref('Users/' + data?.user?.uid);
            user.on('value', snapshot => {
              const datas = snapshot.val();
              dispatch(fetchSuccess('????ng nh???p th??nh c??ng'));
              dispatch(setAuthUser(datas));
              localStorage.setItem('user', JSON.stringify(datas));
            });
          })
          .catch(error => {
            console.error('errorr1', error);
            if (error?.code === 'auth/user-not-found') {
              dispatch(fetchError('Ng?????i d??ng kh??ng t???n t???i!'));
            } else if (error?.code === 'auth/wrong-password') {
              dispatch(fetchError('Vui l??ng ki???m tra l???i m???t kh???u'));
            } else if (error?.code === 'auth/invalid-email') {
              dispatch(fetchError('Email kh??ng ????ng ?????nh d???ng'));
            } else {
              dispatch(fetchError('L???i h??? th???ng'));
            }
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },

  onLogout: () => {
    return dispatch => {
      dispatch(fetchStart());
      try {
        auth
          .signOut()
          .then(data => {
            dispatch(fetchSuccess());
            dispatch(setAuthUser(null));
          })
          .catch(error => {
            dispatch(fetchError(error.message));
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },

  getAuthUser: () => {
    return dispatch => {
      dispatch(fetchStart());
      dispatch(updateLoadUser(false));
      try {
        auth.onAuthStateChanged(authUser => {
          dispatch(fetchSuccess());
          if (authUser) {
            dispatch(
              setAuthUser({
                uid: authUser.uid,
                displayName: authUser.displayName,
                email: authUser.email,
                photoURL: authUser.photoURL,
                token: authUser.refreshToken,
              }),
            );
          } else {
            dispatch(updateLoadUser(true));
            dispatch(updateLoadUser(true));
          }
        });
      } catch (error) {
        dispatch(updateLoadUser(true));
        dispatch(fetchError(error.message));
      }
    };
  },

  onForgotPassword: (email, history) => {
    return dispatch => {
      try {
        dispatch(fetchStart());
        auth
          .sendPasswordResetEmail(email)
          .then(() => {
            dispatch(fetchSuccess('Vui l??ng ki???m tra ???????ng d???n trong h???p th?? trong email c???a b???n'));
            history.push('./signin');
          })
          .catch(error => {
            console.error('errorr1', error);
            if (error?.code === 'auth/user-not-found') {
              dispatch(fetchError('Ng?????i d??ng kh??ng t???n t???i!'));
            } else if (error?.code === 'auth/invalid-email') {
              dispatch(fetchError('Email kh??ng ????ng ?????nh d???ng'));
            } else {
              dispatch(fetchError('L???i h??? th???ng'));
            }
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },

  getSocialMediaIcons: () => {
    return (
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box component="p" fontSize={{ xs: 13, sm: 16 }}>
          Or Login with
        </Box>
        <SocialMediaIcons />
      </Box>
    );
  },
};

export default Firebase;
