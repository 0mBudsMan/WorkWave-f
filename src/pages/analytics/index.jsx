// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.


import 'react-app-polyfill/ie11';	// For IE compatibility
import 'react-app-polyfill/stable';	// For IE compatibility
import React from 'react';
import ReactDOM from 'react-dom';
import DemoApp from './DemoApp.jsx';
import { Layout as DashboardLayout } from "../../layouts/dashboard/layout";


import dynamic from 'next/dynamic';
import { NextPage } from 'next';

const Page=  () => {
  const DynamicDashboard = dynamic(() =>
    import('./DemoApp.jsx'),{
      ssr: false,
    }
  );

  return (
    <>
        <DynamicDashboard />
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
