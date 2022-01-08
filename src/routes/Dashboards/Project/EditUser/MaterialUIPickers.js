import { KeyboardDatePicker } from '@material-ui/pickers';
import React from 'react';
import GridContainer from '../../../../@jumbo/components/GridContainer';

export default function MaterialUIPickers({ selectedDate, setSelectedDate }) {
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <GridContainer>
      <KeyboardDatePicker
        fullWidth
        disableToolbar
        variant="inline"
        format="DD-MM-YYYY"
        margin="dense"
        id="date-picker-inline"
        label="Chọn ngày sinh"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </GridContainer>
  );
}
