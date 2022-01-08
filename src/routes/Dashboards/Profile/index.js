import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GridContainer from '../../../@jumbo/components/GridContainer';
import { database } from '../../../services/auth/firebase/config';
import About from './About';
import Contact from './Contact';
import CreateContact from './CreateContact';
import EditContact from './EditContact';
import EditProject from './EditProject';
import Events from './Events';
import Header from './Header';
import ScrollDialog from './ScrollDialog';

const useStyles = makeStyles(() => ({
  pageFull: {
    width: '100%',
  },
  profileSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  profileMainContent: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { authUser } = useSelector(({ auth }) => auth);
  const [project, setProject] = useState([]);
  const [open, setOpen] = useState(false);
  const [obProject, setObProject] = useState(null);
  const [listUsers, setListUsers] = useState([]);
  const [isContact, setIsContact] = useState(false);
  const [isEditContact, setIsEditContact] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);

  React.useEffect(() => {
    const fetchListUser = database.ref(`/Users`).on('value', snapshot => {
      if (snapshot.val()) {
        setListUsers(Object.values(snapshot.val()));
      } else {
        setListUsers([]);
      }
    });

    const fetchProject = database.ref(`/Projects`).on('value', snapshot => {
      if (snapshot.val()) {
        const filterProject = Object.values(snapshot.val())?.filter(el => el.creator === authUser?.id);
        setProject(filterProject);
      } else {
        setProject([]);
      }
    });

    return () => {
      database.ref(`/Users`).off('value', fetchListUser);
      database.ref(`/Projects`).off('value', fetchProject);
    };
  }, []);

  const _handleOpen = async item => {
    setObProject(item);
    setOpen(true);
  };

  const _handleCloseContact = () => {
    setIsContact(false);
  };

  const _handleOpenContact = () => {
    setIsContact(true);
  };

  const _onPressEdit = () => {
    setIsEditContact(true);
  };

  const _handleCloseEditContact = () => {
    setIsEditContact(false);
  };

  const _handleCloseEditProject = () => {
    setIsEditProject(false);
  };

  const _handleEditProject = () => {
    setIsEditProject(true);
  };

  const _handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {authUser && (
        <Box className={classes.pageFull}>
          <Header classes={classes} userDetail={authUser} changeAvatar={_handleOpenContact} onPressEdit={_onPressEdit} />
          <GridContainer>
            <Grid item xs={12} lg={4} className={classes.profileSidebar}>
              <Box mb={6}>
                <Contact userDetail={authUser} />
              </Box>
              <Box mb={6}>
                <About userDetail={authUser} />
              </Box>
            </Grid>
            <Grid item xs={12} lg={8} className={classes.profileMainContent}>
              <Events events={project} onOpen={_handleOpen} />
            </Grid>
          </GridContainer>

          <ScrollDialog
            open={open}
            setOpen={setOpen}
            data={obProject}
            name={authUser?.name}
            users={listUsers}
            handleEdit={_handleEditProject}
          />
          <CreateContact open={isContact} handleDialog={_handleCloseContact} />
          <EditContact open={isEditContact} handleDialog={_handleCloseEditContact} />
          <EditProject
            open={isEditProject}
            handleDialog={_handleCloseEditProject}
            projects={obProject}
            closeProject={_handleClose}
          />
        </Box>
      )}
      <ToastContainer />
    </React.Fragment>
  );
};

export default Profile;
