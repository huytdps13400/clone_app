import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GridContainer from '../../../@jumbo/components/GridContainer';
import { database } from '../../../services/auth/firebase/config';
import AddProject from './AddProject';
import EditProject from './EditProject';
import Events from './Events';
import ScrollDialog from './ScrollDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Dialog } from '@material-ui/core';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

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

const Project = () => {
  const classes = useStyles();
  const { authUser } = useSelector(({ auth }) => auth);
  const [project, setProject] = useState([]);
  const [open, setOpen] = useState(false);
  const [obProject, setObProject] = useState(null);
  const [listUsers, setListUsers] = useState([]);
  const [isEditProject, setIsEditProject] = useState(false);
  const [isAddProject, setIsAddProject] = useState(false);

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
        const filterProject = Object.values(snapshot.val());
        setProject(filterProject);
      } else {
        setProject([]);
      }
    });

    return () => {
      database.ref(`/Users`).off('value', fetchListUser);
      database.ref(`/Projects`).off('value', fetchProject);
    };
  }, [authUser.id]);

  const _handleOpen = async item => {
    setObProject(item);
    setOpen(true);
  };

  const _handleCloseEditProject = () => setIsEditProject(false);
  const _handleEditProject = () => setIsEditProject(true);
  const _handleClose = () => setOpen(false);
  const _handleAddProject = () => setIsAddProject(true);
  const _handleCloseAddProject = () => setIsAddProject(false);
  return (
    <React.Fragment>
      {authUser && (
        <Box className={classes.pageFull}>
          <GridContainer>
            <Grid item xs={12} lg={12} className={classes.profileMainContent}>
              <Events events={project} onOpen={_handleOpen} addProject={_handleAddProject} />
            </Grid>
          </GridContainer>

          <ScrollDialog
            open={open}
            uid={authUser?.id}
            setOpen={setOpen}
            project={obProject}
            name={authUser?.name}
            users={listUsers}
            handleEdit={_handleEditProject}
          />
          <EditProject
            open={isEditProject}
            handleDialog={_handleCloseEditProject}
            projects={obProject}
            closeProject={_handleClose}
          />
          <AddProject
            open={isAddProject}
            handleDialog={_handleCloseAddProject}
            users={listUsers}
            // setLoading={setIsLoading}
          />
          {/* <Dialog open={true} className={classes.dialogRoot}>
            {true && (
              <Box className={classes.progress}>
                <CircularProgress />
              </Box>
            )}
          </Dialog> */}
        </Box>
      )}

      <ToastContainer />
    </React.Fragment>
  );
};

export default Project;
