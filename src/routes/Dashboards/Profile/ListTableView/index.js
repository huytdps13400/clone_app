import React from 'react';
import ListHeader from './ListHeader';
import Table from '@material-ui/core/Table';
import { useSelector } from 'react-redux';
import TableBody from '@material-ui/core/TableBody';
import ContactCell from './ContactCell';
import CheckedListHeader from './CheckedListHeader';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const ListTableView = ({
  checkedContacts,
  handleCellCheckBox,
  handleHeaderCheckBox,
  onClickEditContact,
  contactsList,
  handleUpdateUser,
}) => {
  return (
    <React.Fragment>
      {checkedContacts.length > 0 && (
        <CheckedListHeader
          checkedContacts={checkedContacts}
          handleHeaderCheckBox={handleHeaderCheckBox}
          contactsList={contactsList}
          handleUpdateUser={handleUpdateUser}
        />
      )}
      <Box className="Cmt-table-responsive">
        <Table>
          {checkedContacts.length === 0 && (
            <ListHeader
              contactsList={contactsList}
              checkedContacts={checkedContacts}
              handleHeaderCheckBox={handleHeaderCheckBox}
            />
          )}
          <TableBody>
            {contactsList.map((contact, index) => (
              <ContactCell
                key={index}
                contact={contact}
                checkedContacts={checkedContacts}
                handleCellCheckBox={handleCellCheckBox}
                onClickEditContact={onClickEditContact}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </React.Fragment>
  );
};

export default ListTableView;

ListTableView.prototype = {
  checkedContacts: PropTypes.array,
  handleCellCheckBox: PropTypes.func,
  handleHeaderCheckBox: PropTypes.func,
  updateCheckedContacts: PropTypes.func,
  onClickEditContact: PropTypes.func,
};

ListTableView.defaultProps = {
  checkedContacts: [],
};
