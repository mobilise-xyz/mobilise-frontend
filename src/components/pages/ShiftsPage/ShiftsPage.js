import React, { Suspense } from 'react';

const AdminShiftsPage = React.lazy(() => import('./AdminShiftsPage'));
const VolunteerShiftsPage = React.lazy(() => import('./VolunteerShiftsPage'));

const ShiftsPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user.isAdmin) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminShiftsPage />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VolunteerShiftsPage />
    </Suspense>
  );
};

export default ShiftsPage;
