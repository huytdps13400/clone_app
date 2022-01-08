import GridContainer from '@jumbo/components/GridContainer';
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import MapWidget from './MapWidget';
import OurOffice from './OurOffice';
import NoRecordFound from './NoRecordFound';
import UserTableHead from './UserTableHead';
import AddLocation from './AddLocation';
import AddUser from './AddUser';
import EditImgProject from './EditImgProject';
import UserListRow from './UserListRow';

const useStyles = makeStyles(theme => ({
  content: {
    height: '600px',
  },
  left: {
    marginLeft: '10px',
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 415,
    marginTop: '10px',
  },
  table: {
    minWidth: 750,
  },
  titleRoot: {
    marginTop: 20,
  },
  point: {
    paddingLeft: 20,
  },
  boxEdit: {
    display: 'flex',
    backgroundColor: '#14284A',
    borderRadius: 100,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  title: {
    color: 'white',
  },
  location: {
    margin: 2,
    padding: 2,
  },
  top: {
    paddingTop: 5,
    backgroundColor: `${'#00000010'}`,
    marginBottom: 10,
    borderRadius: 12,
    paddingLeft: 10,
  },
}));

export default function ScrollDialog({ open, setOpen, data, name, users, handleEdit }) {
  const classes = useStyles();
  const [scroll] = React.useState('paper');
  const [isAdd, setIsAdd] = React.useState(false);
  const [titleLocation, setTitleLocation] = React.useState('');
  const [pointLocation, setPointLocation] = React.useState(0);
  const [idProjection, setIdProjection] = React.useState();
  const [region, setRegion] = React.useState('');
  const [isAddUser, setIsAddUser] = React.useState(false);
  const [isImgProject, setIsImgProject] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAdd = () => {
    setIsAdd(false);
  };
  const handleOpenApp = (val, data, id, regions) => {
    if (data && data.length > 0) {
      setPointLocation(data.length);
    } else {
      setPointLocation(0);
    }
    setRegion(regions);
    setIdProjection(id);
    setTitleLocation(val);
    setIsAdd(true);
  };

  const handleCloseProject = () => {
    setOpen(false);
  };
  const _handleCloseAddUser = () => {
    setIsAddUser(false);
  };

  const _openAddUser = () => {
    setIsAddUser(true);
  };

  const changeImgProject = () => {
    setIsImgProject(true);
  };

  const _handleCloesImgProject = () => {
    setIsImgProject(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      fullScreen={true}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description">
      <DialogTitle id="scroll-dialog-title">Dự áns</DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <GridContainer>
          <Grid xs={12} md={6} xl={4}>
            <OurOffice
              image={data?.url}
              title={data?.name}
              description={data?.description}
              address={data?.address}
              date={data?.date}
              name={name}
              handleEdit={handleEdit}
              changeImgProject={changeImgProject}
            />
          </Grid>
          <Grid xs={12} md={6} xl={8} className={classes.content}>
            <MapWidget area={data?.area} danger={data?.danger} />
          </Grid>
          <Grid xs={12} md={12} xl={6}>
            <Box display="flex" alignItems="center" marginTop={2} flexDirection={{ xs: 'column', sm: 'row' }}>
              <Typography component="div" variant="h4">
                Danh sách công nhân
              </Typography>
              <Box className={classes.boxEdit} onClick={_openAddUser}>
                <Typography className={classes.title}>+</Typography>
              </Box>
            </Box>
            <TableContainer className={classes.container}>
              <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
                <UserTableHead classes={classes} rowCount={!!data?.workers ? Object.values(data?.workers) : 0} />
                <TableBody>
                  {!!data?.workers ? (
                    Object.values(data?.workers).map((row, index) => (
                      <UserListRow key={index} row={row} filterUser={users} />
                    ))
                  ) : (
                    <TableRow style={{ height: 53 * 6 }}>
                      <TableCell colSpan={7} rowSpan={10}>
                        <NoRecordFound>Dữ liệu trống!</NoRecordFound>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid xs={12} md={12} xl={6} className={classes.point}>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              Thêm vị trí
            </Typography>
            <GridContainer>
              <Grid item xs={12} lg={6} className={classes.content}>
                <Box display="flex" alignItems="center" marginBottom={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                  <Typography component="div" variant="h4">
                    Vùng an toàn
                  </Typography>
                  <Box
                    className={classes.boxEdit}
                    onClick={() => handleOpenApp('Thêm vùng an toàn', data?.area, data?.id, 'area')}>
                    <Typography className={classes.title}>+</Typography>
                  </Box>
                </Box>
                {data?.area &&
                  Object.values(data?.area)?.map((val, i) => (
                    <Box className={classes.top}>
                      <Typography component="div" variant="h4">
                        Vùng {i + 1}
                      </Typography>
                      <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                        <Grid item xs={12} lg={6}>
                          <Typography fullWidth component="div" variant="h4" className={classes.location}>
                            Vĩ độ
                          </Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Typography fullWidth component="div" variant="h4" className={classes.location}>
                            Kinh độ
                          </Typography>
                        </Grid>
                      </Box>
                      {val?.map((item, index) => (
                        <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                          <Grid item xs={12} lg={6}>
                            <Typography fullWidth component="div" variant="h4" className={classes.location}>
                              {item?.latitude}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} lg={6}>
                            <Typography fullWidth component="div" variant="h4" className={classes.location}>
                              {item?.longitude}
                            </Typography>
                          </Grid>
                        </Box>
                      ))}
                    </Box>
                  ))}
              </Grid>
              <Grid item xs={12} lg={6} className={classes.content}>
                <Box display="flex" alignItems="center" marginBottom={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                  <Typography component="div" variant="h4">
                    Vùng nguy hiểm
                  </Typography>
                  <Box
                    className={classes.boxEdit}
                    onClick={() => handleOpenApp('Thêm vùng nguy hiểm', data?.danger, data?.id, 'danger')}>
                    <Typography className={classes.title}>+</Typography>
                  </Box>
                </Box>
                {data?.danger &&
                  Object.values(data?.danger)?.map((val, i) => (
                    <Box className={classes.top}>
                      <Typography component="div" variant="h4">
                        Vùng {i + 1}
                      </Typography>
                      <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                        <Grid item xs={12} lg={6}>
                          <Typography fullWidth component="div" variant="h4" className={classes.location}>
                            Vĩ độ
                          </Typography>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Typography fullWidth component="div" variant="h4" className={classes.location}>
                            Kinh độ
                          </Typography>
                        </Grid>
                      </Box>
                      {val?.map((item, index) => (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          flexDirection={{ xs: 'column', sm: 'row' }}>
                          <Grid item xs={12} lg={6}>
                            <Typography fullWidth component="div" variant="h4" className={classes.location}>
                              {item?.latitude}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} lg={6}>
                            <Typography fullWidth component="div" variant="h4" className={classes.location}>
                              {item?.longitude}
                            </Typography>
                          </Grid>
                        </Box>
                      ))}
                    </Box>
                  ))}
              </Grid>
            </GridContainer>
          </Grid>
        </GridContainer>
        <AddLocation
          points={pointLocation}
          title={titleLocation}
          open={isAdd}
          handleDialog={handleCloseAdd}
          id={idProjection}
          region={region}
          closeProject={handleCloseProject}
        />
        <AddUser
          open={isAddUser}
          handleDialog={_handleCloseAddUser}
          users={users}
          idProject={idProjection}
          closeProject={handleCloseProject}
        />

        <EditImgProject
          open={isImgProject}
          handleDialog={_handleCloesImgProject}
          project={data}
          closeProject={handleCloseProject}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Thoát
        </Button>
      </DialogActions>
    </Dialog>
  );
}
