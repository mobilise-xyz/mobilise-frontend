import React from 'react';
import Layout from '../../Layout';
import MyContributions from './MyContributions';
import HallOfFame from './HallOfFame';
import MyActivity from './MyActivity';

const Dashboard = () => {
  const { isAdmin } = JSON.parse(localStorage.getItem('user'));
  return (
    <Layout heading="Dashboard">
      {!isAdmin ? <MyContributions /> : null}
      <hr />
      <HallOfFame />
      <hr />
      <MyActivity />
    </Layout>
  );
};

export default Dashboard;
