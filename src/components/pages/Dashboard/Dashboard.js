import React from 'react';
import Layout from '../../Layout';
import MyContributions from './MyContributions';
import HallOfFame from './HallOfFame';
import MyActivity from './MyActivity';

const Dashboard = () => {
  return (
    <Layout heading="Dashboard">
      <MyContributions />
      <hr />
      <HallOfFame />
      <hr />
      <MyActivity />
    </Layout>
  );
};

export default Dashboard;
