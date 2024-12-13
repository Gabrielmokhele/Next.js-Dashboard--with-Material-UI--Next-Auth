import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import { useDemoData } from '@mui/x-data-grid-generator';

const CustomLoadingOverlay = () => {
  return <LinearProgress style={{ width: '100%' }} />;
};

const Analytics = () => {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 500,
    maxColumns: 15,
  });

  return (
    <>
      <h1 style={{ marginTop: '100px' }}>Analytics</h1>
      <div style={{ height: '650px', width: '100%' }}>
        <DataGrid
          slots={{
            loadingOverlay: CustomLoadingOverlay,  
          }}
          loading={!data} 
          {...data}
        />
      </div>
    </>
  );
};

export default Analytics;
