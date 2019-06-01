import React from 'react';
import '../ShiftCard.css';
import VolunteerShiftCardModal from './VolunteerShiftCardModal/index';
import AdminShiftCardModal from './AdminShiftCardModal/index';

const ShiftCardModal = ({
  shiftData,
  onHide,
  show,
  handleBook,
  selected,
  handleDelete,
  isAdmin
}) => {
  const passthroughProps = {
    shiftData,
    onHide,
    show,
    selected,
    handleBook,
    handleDelete
  };

  return isAdmin ? (
    <AdminShiftCardModal {...passthroughProps} />
  ) : (
    <VolunteerShiftCardModal {...passthroughProps} />
  );
};

export default ShiftCardModal;
