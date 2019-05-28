import React from 'react';
import WizardLayout from '../WizardLayout';
import TitleForm from '../forms/new-shift-forms/TitleForm';
import TimeDateForm from '../forms/new-shift-forms/TimeDateForm';
import RolesForm from '../forms/new-shift-forms/RolesForm';

const NewShiftPage = () => (
  <WizardLayout heading="New Shift">
    <TitleForm key={1} title="Provide Title and Description" />
    <TimeDateForm key={2} title="Select Date and Time" />
    <RolesForm key={3} title="Specify Roles and Location" />
  </WizardLayout>
);

export default NewShiftPage;
