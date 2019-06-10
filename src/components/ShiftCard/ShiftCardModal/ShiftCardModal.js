import React from 'react';
import '../ShiftCard.css';
import VolunteerShiftCardModal from './VolunteerShiftCardModal/index';
import AdminShiftCardModal from './AdminShiftCardModal/index';

const ShiftCardModal = ({
  shiftData,
  onHide,
  show,
  handleSelect,
  selected,
  handleDelete,
  handleBook,
  booked,
  isAdmin,
  type
}) => {
  const passthroughProps = {
    shiftData,
    onHide,
    show,
    selected,
    handleSelect,
    handleBook,
    handleDelete,
    booked,
    type
  };

  return isAdmin ? (
    <AdminShiftCardModal {...passthroughProps} />
  ) : (
    <VolunteerShiftCardModal {...passthroughProps} />
  );
};

export default ShiftCardModal;
