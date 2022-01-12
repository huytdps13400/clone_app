import { Box, Dialog, Table, TableContainer, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { database } from '../../../../services/auth/firebase/config';
import { useSelector } from 'react-redux';
import UserTableHead from '../UserTableHead';
import MultipleSelect from '../MultipleSelect';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    color: theme.palette.common.dark,
  },
  dialogRoot: {
    position: 'relative',
  },
  table: {
    minWidth: 750,
  },
  container: {
    maxHeight: 415,
    margin: '10px',
  },
}));

const dataMonth = [
  {
    name: '1',
    id: 0,
  },
  {
    name: '2',
    id: 1,
  },
  {
    name: '3',
    id: 2,
  },
  {
    name: '4',
    id: 3,
  },
  {
    name: '5',
    id: 4,
  },
  {
    name: '6',
    id: 5,
  },
  {
    name: '7',
    id: 6,
  },
  {
    name: '8',
    id: 7,
  },
  {
    name: '9',
    id: 8,
  },
  {
    name: '10',
    id: 9,
  },
  {
    name: '11',
    id: 10,
  },
  {
    name: '12',
    id: 11,
  },
];
const dataYear = [
  {
    name: '2018',
    id: 2018,
  },
  {
    name: '2019',
    id: 2019,
  },
  {
    name: '2020',
    id: 2020,
  },
  {
    name: '2021',
    id: 2021,
  },
  {
    name: '2022',
    id: 2022,
  },
  {
    name: '2023',
    id: 2023,
  },
];
const UserListRow = ({ row, filterUser, productID, selectedDate }) => {
  const { authUser } = useSelector(({ auth }) => auth);

  const classes = useStyles();
  const [listLocation, setListLocation] = useState([]);
  const [listLocationDetail, setListLocationDetail] = useState([]);

  const [open, setOpen] = useState(false);
  const [idUser, setIdUser] = useState('');
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());

  const labelId = `enhanced-table-checkbox-${row.id}`;

  var lastday = function(y, m) {
    return new Date(y, m + 1, 0).getDate();
  };
  useEffect(() => {
    const fetchLocationUser = database
      .ref(`/Locations/${row.id}`)
      .orderByChild('projectId')
      .equalTo(productID)
      .on('value', snapshot => {
        if (snapshot.val()) {
          let locations = Object.values(snapshot.val());
          locations = locations.map(location => {
            return { ...location, id: row.id };
          });
          setListLocation(locations);
        } else {
          setListLocation([]);
        }
      });
    return () => {
      database
        .ref(`/Locations/${row.id}`)
        .orderByChild('projectId')
        .equalTo(productID)
        .off('value', fetchLocationUser);
    };
  }, [authUser.id, row.id]);

  useEffect(() => {
    let fetchLocationUserDetail;
    if (open && idUser) {
      fetchLocationUserDetail = database
        .ref(`/Locations/${idUser}`)
        .orderByChild('projectId')
        .equalTo(productID)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let locations = Object.values(snapshot.val());
            locations = locations.map(location => {
              return { ...location, id: row.id };
            });
            let array = [];
            const checkName = filterUser.filter(v => v.id === idUser);

            array = locations.map(value => {
              for (let item of checkName) {
                if (value.id === item.id) {
                  return { ...value, ...item };
                }
              }

              return value;
            });
            setListLocationDetail(array);
          } else {
            setListLocationDetail([]);
          }
        });
    }

    return () => {
      database
        .ref(`/Locations/${idUser}`)
        .orderByChild('projectId')
        .equalTo(productID)
        // eslint-disable-next-line no-undef
        .off('value', fetchLocationUserDetail);
    };
  }, [authUser.id, idUser, open]);
  const renderUser = id => {
    let array = [];
    const checkName = filterUser.filter(v => v.id === id);

    array = listLocation.map(value => {
      for (let item of checkName) {
        if (value.id === item.id) {
          return { ...value, ...item };
        }
      }

      return value;
    });
    return array.concat(checkName);
  };

  const onPressModal = value => {
    setOpen(true);
    setIdUser(value);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {renderUser(row.id)
        .filter(v => moment(v.time).format('DD/MM/YYYY') === moment(selectedDate).format('DD/MM/YYYY'))
        .map((item, index) => {
          return (
            <TableRow hover tabIndex={-1} key={index}>
              <TableCell component="th" id={labelId} scope="row" padding="none" onClick={() => onPressModal(item.id)}>
                <Box display="flex" alignItems="center">
                  <Box mr={{ xs: 4, md: 5 }}>
                    <CmtAvatar size={40} src={item.avatar} alt={item.name} />
                  </Box>
                  <div>
                    <Typography className={classes.titleRoot} component="div" variant="h4">
                      {item.name}
                    </Typography>
                  </div>
                </Box>
              </TableCell>
              <TableCell onClick={() => onPressModal(item.id)}>{item.email}</TableCell>
              <TableCell onClick={() => onPressModal(item.id)}>{moment(item.time).format('DD/MM/YYYY')}</TableCell>
              <TableCell onClick={() => onPressModal(item.id)}>{item.phone || 'Chưa cập nhật'}</TableCell>
              <TableCell onClick={() => onPressModal(item.id)}>
                {item.insideArea ? 'Có' : item.insideArea === false ? 'Không' : 'Chưa cập nhật'}
              </TableCell>
              <TableCell onClick={() => onPressModal(item.id)}>
                {item.insideDanger ? 'Có' : item.insideDanger === false ? 'Không' : 'Chưa cập nhật'}
              </TableCell>
              <TableCell onClick={() => onPressModal(item.id)}>{'Chưa cập nhật'}</TableCell>
            </TableRow>
          );
        })}
      <Dialog
        maxWidth="lg"
        open={open}
        className={classes.dialogRoot}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        onClose={onClose}>
        <Box display="flex" flexDirection={'row'} alignItems={'center'}>
          <MultipleSelect label={'Tháng'} user={dataMonth} setUser={setMonth} />
          <MultipleSelect label={'Năm'} user={dataYear} year setUser={setYear} />
        </Box>

        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <UserTableHead classes={classes} />

            {listLocationDetail
              .filter(
                v =>
                  v.time >=
                    new Date(
                      `01/${month + 1}/${year}`.split('/')[2],
                      `01/${month + 1}/${year}`.split('/')[1] - 1,
                      `01/${month + 1}/${year}`.split('/')[0],
                    ).getTime() &&
                  v.time <=
                    new Date(
                      `${lastday(2020, month)}/${month + 1}/${year}`.split('/')[2],
                      `${lastday(2020, month)}/${month + 1}/${year}`.split('/')[1] - 1,
                      `${lastday(2020, month)}/${month + 1}/${year}`.split('/')[0],
                    ).getTime(),
              )
              .map((item, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell component="th" id={labelId} scope="row" padding="none" onClick={() => console.log('hihi')}>
                      <Box display="flex" alignItems="center">
                        <Box mr={{ xs: 4, md: 5 }}>
                          <CmtAvatar size={40} src={item.avatar} alt={item.name} />
                        </Box>
                        <div>
                          <Typography className={classes.titleRoot} component="div" variant="h4">
                            {item.name}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell onClick={onPressModal}>{item.email}</TableCell>
                    <TableCell onClick={onPressModal}>{moment(item.time).format('DD/MM/YYYY')}</TableCell>
                    <TableCell onClick={onPressModal}>{item.phone || 'Chưa cập nhật'}</TableCell>
                    <TableCell onClick={onPressModal}>
                      {item.insideArea ? 'Có' : item.insideArea === false ? 'Không' : 'Chưa cập nhật'}
                    </TableCell>
                    <TableCell onClick={onPressModal}>
                      {item.insideDanger ? 'Có' : item.insideDanger === false ? 'Không' : 'Chưa cập nhật'}
                    </TableCell>
                    <TableCell onClick={onPressModal}>{'Chưa cập nhật'}</TableCell>
                  </TableRow>
                );
              })}
          </Table>
        </TableContainer>
      </Dialog>
    </>
  );
};

export default React.memo(UserListRow);
