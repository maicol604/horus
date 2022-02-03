import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({tabs=[], children, onChange, option}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    if(onChange)
        onChange(newValue)
    setValue(newValue);
  };

  React.useEffect(()=>{
    setValue(option)
  },[option]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {
              tabs.map((data, index)=>
                <Tab key={index} label={data.name} {...a11yProps(index)} />
              )
          }
        </Tabs>
      </Box>
      {
          tabs.map((data, index)=>
            <TabPanel key={index} value={value} index={index}>
                {children}
            </TabPanel>
          )
      }
    </Box>
  );
}
