import React, { Suspense } from 'react';
import '../ShiftCard.css';

const VolunteerShiftCardModal = React.lazy(() =>
  import('./VolunteerShiftCardModal')
);
const AdminShiftCardModal = React.lazy(() => import('./AdminShiftCardModal'));

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

  const toRender = isAdmin ? (
    <AdminShiftCardModal {...passthroughProps} />
  ) : (
    <VolunteerShiftCardModal {...passthroughProps} />
  );

  return <Suspense fallback={<div />}>{toRender}</Suspense>;
};

export default ShiftCardModal;
