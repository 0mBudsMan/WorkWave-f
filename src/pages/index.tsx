import React from "react";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Dashboard = () => {
  return <div>index</div>;
};

Dashboard.getLayout = (page) => (
  <DashboardLayout isMinimised={false}>{page}</DashboardLayout>
);

export default Dashboard;
