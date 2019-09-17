import React from 'react';
import Layout from '../../Layout';
import MyContributions from './MyContributions';
import HallOfFame from './HallOfFame';
import MyActivity from './MyActivity';
import MyFiles from './MyFiles';
import QuickLinks from './QuickLinks/QuickLinks';

const Dashboard = () => {
  const { isAdmin } = JSON.parse(localStorage.getItem('user'));
  return (
    <Layout heading="Dashboard">
      {!isAdmin ? (
        <>
          <MyContributions />
          <hr />
        </>
      ) : null}
      <MyFiles isAdmin={isAdmin} />
      <QuickLinks isAdmin={isAdmin} />
      <hr />
      {isAdmin ? (
        <>
          <HallOfFame />
          <hr />
        </>
      ) : null}
      <MyActivity />
    </Layout>
  );
};

export default Dashboard;
