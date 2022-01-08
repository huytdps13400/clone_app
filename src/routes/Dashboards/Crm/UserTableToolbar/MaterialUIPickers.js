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
        disableToolbar
        variant="inline"
        format="DD-MM-YYYY"
        margin="normal"
        id="date-picker-inline"
        label="Chọn ngày"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </GridContainer>
  );
}
