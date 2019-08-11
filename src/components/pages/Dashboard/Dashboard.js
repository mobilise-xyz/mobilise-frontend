import React from 'react';
import Layout from '../../Layout';
import MyContributions from './MyContributions';
import HallOfFame from './HallOfFame';
import MyActivity from './MyActivity';
import MyFiles from './MyFiles';

const Dashboard = () => {
  const { isAdmin } = JSON.parse(localStorage.getItem('user'));
  return (
    <Layout heading="Dashboard">
      {!isAdmin ? <MyContributions /> : null}
      <hr />
      <MyFiles isAdmin={isAdmin} />
      <hr />
      <HallOfFame />
      <hr />
      <MyActivity />
    </Layout>
  );
};

export default Dashboard;
