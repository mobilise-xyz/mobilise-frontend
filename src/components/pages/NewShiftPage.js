import React from 'react';
import WizardLayout from '../WizardLayout';
import TitleForm from '../forms/new-shift-forms/TitleForm';
import TimeDateForm from '../forms/new-shift-forms/TimeDateForm';

const NewShiftPage = () => (
  <WizardLayout heading="New Shift">
    <TitleForm description="Select Title and Location" />
    <TimeDateForm description="Select Date and Time" />
  </WizardLayout>
);

export default NewShiftPage;
