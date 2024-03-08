import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PhoneOutlined, RocketOutlined } from '@ant-design/icons';

// Assuming useFetchModules is the custom hook you've created
import useFetchModules from 'hooks/useFetchModules';

const icons = { PhoneOutlined, RocketOutlined };

// Component to generate dynamic modules menu
const DynamicModulesMenu = () => {
  const modulesData = useFetchModules(); // Fetch modules data

  // Dynamically construct children based on fetched modules data
  const children = modulesData.map(module => ({
    id: module.moduleNo, // Assuming each module has a unique 'code'
    title: <FormattedMessage id={module.moduleNo} defaultMessage={module.moduleNo} />, // Using module code as id and module name as default message
    type: 'item',
    url: `/moduleNo/academicyear/projects`, // Construct URL based on module code
    target: true
  }));

  // Construct the modules object
  const modules = {
    id: 'group-pages',
    title: <FormattedMessage id="modules" defaultMessage="Modules" />,
    type: 'group',
    children
  };

  return modules; // This example returns the object, but in a real scenario, you might want to use this data in a component directly
};

export default DynamicModulesMenu;