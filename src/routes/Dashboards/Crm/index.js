import { Grid } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { useSelector } from 'react-redux';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { database } from '../../../services/auth/firebase/config';
import ProjectCounterCard from './ProjectCounterCard';
import StatusPolygon from './StatusPolygon';
import TeamsCounterCard from './TeamsCounterCard';

const useStyles = makeStyles(theme => ({
  orderLg2: {
    [theme.breakpoints.up('lg')]: {
      order: 2,
    },
  },
  orderLg1: {
    [theme.breakpoints.up('lg')]: {
      order: 1,
    },
  },
}));

const CrmDashboard = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const classes = useStyles();
  const [location, setLocation] = React.useState([]);
  const [project, setProject] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [idUser, setIddUser] = React.useState(authUser?.id);

  React.useEffect(() => {
    if (authUser?.id) {
      const users = database.ref('Users/');
      users
        .once('value')
        .then(snapshot => {
          const datas = Object.values(snapshot.val());
          if (snapshot.val()) {
            setUsers(datas);
          }
        })
        .catch(error => {
          console.log(error);
        });
      const projects = database.ref('Projects/');
      projects
        .once('value')
        .then(snapshot => {
          const datas = Object.values(snapshot.val());
          if (snapshot.val()) {
            setProject(datas);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  React.useEffect(() => {
    const onValueChange = database.ref(`/Locations/${idUser}`).on('value', snapshot => {
      if (snapshot.val()) {
        const datas = Object.values(snapshot.val());
        setLocation(datas);
      } else {
        setLocation([]);
      }
    });

    return () => database.ref(`/Locations/${idUser}`).off('value', onValueChange);
  }, [idUser]);

  const _handleFilterLocation = async date => {
    setSelectedDate(date);
  };

  const _handleChangeUser = id => {
    setIddUser(id);
  };

  return (
    <PageContainer heading="Trang chủ">
      <GridContainer>
        <Grid item xs={12} xl={12} className={classes.orderLg1}>
          <GridContainer>
            <Grid item xs={12} sm={6} md={6}>
              <ProjectCounterCard project={project} />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TeamsCounterCard user={users} />
            </Grid>

            <Grid item xs={12}>
              <StatusPolygon
                location={location}
                project={project}
                user={users}
                setUser={_handleChangeUser}
                selectedDate={selectedDate}
                setSelectedDate={_handleFilterLocation}
              />
            </Grid>
          </GridContainer>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default CrmDashboard;
