import React, { Suspense } from 'react';

const AdminCalendarPage = React.lazy(() => import('./AdminCalendarPage'));
const VolunteerCalendarPage = React.lazy(() =>
  import('./VolunteerCalendarPage')
);

const CalendarPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user.isAdmin) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminCalendarPage />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VolunteerCalendarPage />
    </Suspense>
  );
};

export default CalendarPage;
