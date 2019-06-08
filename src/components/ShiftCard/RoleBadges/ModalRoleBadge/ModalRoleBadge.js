import React from 'react';
import AdminRoleBadge from '../AdminRoleBadge/AdminRoleBadge';
import VolunteerRoleBadge from '../VolunteerRoleBadge/VolunteerRoleBadge';

const ModalRoleBadge = ({
  isAdmin,
  name,
  number,
  handleUpdate,
  handleSelect,
  selected,
  onModal = false,
  colour = 'info'
}) => {
  const passthroughProps = {
    name,
    number,
    handleUpdate,
    handleSelect,
    selected,
    onModal,
    colour
  };
  return isAdmin ? (
    <AdminRoleBadge {...passthroughProps} />
  ) : (
    <VolunteerRoleBadge {...passthroughProps} />
  );
};

export default ModalRoleBadge;
