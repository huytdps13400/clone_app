import { Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(6),
  },
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ user, setUser }) {
  const { authUser } = useSelector(({ auth }) => auth);
  const classes = useStyles();
  const theme = useTheme();
  const [users, setUsers] = React.useState(authUser?.id);

  const handleChange = event => {
    setUsers(event.target.value);
    setUser(event.target.value);
  };
  return (
    <Box>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Tài khoản
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={users}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}>
          <MenuItem disabled value="">
            <em>None</em>
          </MenuItem>
          {user &&
            user?.map((item, index) => (
              <MenuItem key={index} value={item?.id} name={item?.id} style={getStyles(item?.name, users, theme)}>
                {item?.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
