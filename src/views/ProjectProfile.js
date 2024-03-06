'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// next
import { useRouter, pathname } from 'next/navigation';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import TabProjectTeamNo from 'sections/moduleCode/TabProject_teamNo';
import TabInformation from 'sections/moduleCode/TabInformation';
import TabDesign from 'sections/moduleCode/TabDesign';
import TabGradesSummary from 'sections/moduleCode/TabGradesSummary';
import TabGradesInsight from 'sections/moduleCode/TabGradesInsight';
import TabStudents from 'sections/moduleCode/TabStudents';
import TabTAs from 'sections/moduleCode/TabTAs';
import TabUpload from 'sections/moduleCode/TabUpload';

import { APP_DEFAULT_PATH } from 'config';
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

// assets
import {
  ProfileOutlined,
  InfoCircleOutlined,
  HighlightOutlined,
  BarChartOutlined,
  HourglassOutlined,
  TeamOutlined,
  UserOutlined,
  CloudUploadOutlined
} from '@ant-design/icons';

// ==============================|| Module - ModuleNo ||============================== //;

const ProjectProfile = ({ tab, moduleNo, moduleTitle, academicYear, projectTitle }) => {
  const router = useRouter();
  const { menuMaster } = useGetMenuMaster();

  let breadcrumbTitle = '';
  let breadcrumbHeading = `${moduleTitle}`;

  switch (tab) {
    case 'projects':
      breadcrumbTitle = `${projectTitle}`;
      breadcrumbHeading = `${projectTitle}`;
      break;
    case 'information':
      breadcrumbTitle = 'Information';
      breadcrumbHeading = 'Information';
      break;
    case 'design':
      breadcrumbTitle = 'Design';
      breadcrumbHeading = 'Design';
      break;
    case 'grades-summary':
      breadcrumbTitle = 'Grades Summary';
      breadcrumbHeading = 'Grade Summary';
      break;
    case 'grades-insight':
      breadcrumbTitle = 'Grade Insight';
      breadcrumbHeading = 'Grade Insight';
      break;
    case 'students':
      breadcrumbTitle = 'Students';
      breadcrumbHeading = 'Students';
      break;
    case 'tas':
      breadcrumbTitle = 'TAs';
      breadcrumbHeading = 'TAs';
      break;
    case 'upload-files':
      breadcrumbTitle = 'Upload Files';
      breadcrumbHeading = 'Upload Files';
      break;
    case 'basic':
    default:
      breadcrumbTitle = moduleNo;
      breadcrumbHeading = moduleTitle;
  }

  const [value, setValue] = useState(tab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.replace(`/home/${moduleNo}/${academicYear}/${newValue}`);
  };

  let breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: `${moduleNo}`, to: `/home/${moduleNo}/${academicYear}/projects` },
    { title: 'Projects', to: `/home/${moduleNo}/${academicYear}/projects` },
    { title: breadcrumbTitle }
  ];
  if (tab === 'basic') {
    breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Module No' }];
  }

  useEffect(() => {
    if (menuMaster.openedItem !== 'module-code') handlerActiveItem('module-code');
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <Breadcrumbs custom heading={breadcrumbHeading} links={breadcrumbLinks} />
      <MainCard border={false} boxShadow>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="module tab">
            <Tab label="Projects" icon={<ProfileOutlined />} value="projects" iconPosition="start" />
            <Tab label="Information" icon={<InfoCircleOutlined />} value="information" iconPosition="start" />
            <Tab label="Design" icon={<HighlightOutlined />} value="design" iconPosition="start" />
            <Tab label="Grades Summary" icon={<BarChartOutlined />} value="grades-summary" iconPosition="start" />
            <Tab label="Grades Insight" icon={<HourglassOutlined />} value="grades-insight" iconPosition="start" />
            <Tab label="Students" icon={<TeamOutlined />} value="students" iconPosition="start" />
            <Tab label="TAs" icon={<UserOutlined />} value="tas" iconPosition="start" />
            <Tab label="Upload Files" icon={<CloudUploadOutlined />} value="upload-files" iconPosition="start" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          {tab === 'projects' && <TabProjectTeamNo />}
          {tab === 'information' && <TabInformation />}
          {tab === 'design' && <TabDesign />}
          {tab === 'grades-summary' && <TabGradesSummary />}
          {tab === 'grades-insight' && <TabGradesInsight />}
          {tab === 'students' && <TabStudents />}
          {tab === 'tas' && <TabTAs />}
          {tab === 'upload-files' && <TabUpload />}
        </Box>
      </MainCard>
    </>
  );
};

ProjectProfile.propTypes = {
  tab: PropTypes.string,
  moduleTitle: PropTypes.string,
  moduleNo: PropTypes.string
};

export default ProjectProfile;
