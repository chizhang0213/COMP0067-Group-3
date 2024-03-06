'use client';

import React, { useState, useEffect } from 'react';

// material-ui
import {
  Accordion,AccordionSummary, AccordionDetails,
  Button,
  Chip,
  Collapse,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Typography
} from '@mui/material';
import { useParams } from 'next/navigation';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { fetchProjectByTeamNo } from 'db/queries/teamNo-project';
import { fetchStudentsByUCLId } from 'db/queries/teamMember-students';
import { fetchLeaderByUCLId } from 'db/queries/uclId-leader';

// assets
import { UserOutlined, ReadOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import ScrollX from 'components/ScrollX';

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const TabProfile = () => {
  const [showMainCard, setShowMainCard] = useState(true);
  const [project, setProject] = useState({});
  const [team, setTeam] = useState([]);
  const [leader, setLeader] = useState({});
  const { moduleNo, academicYear, teamNo } = useParams();
  const academicYearInt = parseInt(academicYear);
  const teamNoInt = parseInt(teamNo);

  useEffect(() => {
    const fetchModuleTitle = async () => {
      try {
        const fetchedProject = await fetchProjectByTeamNo(moduleNo, academicYearInt, teamNoInt);
        setProject(fetchedProject);
        const fetchedTeam = await fetchStudentsByUCLId(fetchedProject.teamMember);
        setTeam(fetchedTeam);
        const fetchedLeader = await fetchLeaderByUCLId(fetchedProject.leader);
        setLeader(fetchedLeader);
      } catch (error) {
        console.error('Error while fetching module title:', error);
      }
    };

    fetchModuleTitle();
  }, [moduleNo, academicYearInt, teamNoInt]);

  const handleDisplayButtonClick = () => {
    setShowMainCard((prevShowMainCard) => !prevShowMainCard);
  };

  return (
    <Grid container spacing={1}>
      <Stack direction="row" justifyContent="flex-end" sx={{ width: '100%', padding: 1.5 }}>
        <Button variant="contained" onClick={handleDisplayButtonClick}>
          {showMainCard ? 'Hide' : 'Show'} Members
        </Button>
      </Stack>
      <ScrollX item xs={12}>
        <Collapse in={showMainCard} timeout="auto" unmountOnExit>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MainCard
                style={{
                  margin: 'auto',
                  border: 'none',
                  backgroundColor: '#f5f5f5',
                  boxShadow: 'none'
                }}
              >
                <Grid item xs={3}>
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginTop: 'auto', marginBottom: '10px' }}>
                    <UserOutlined style={{ marginRight: '8px' }} />
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                      Profile
                    </Typography>
                  </div>
                </Grid>
                <Grid container spacing={3} justifyContent="center">
                  {team.map((member, index) => (
                    <Grid item xs={3} key={index}>
                      <MainCard
                        style={{
                          margin: 'auto',
                          border: 'none',
                          boxShadow: 'none',
                          borderRadius: '10px'
                        }}
                      >
                        <Grid container>
                          <Grid item xs={12}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt="Avatar" size="xl" src="/assets/images/users/default.png" />
                              <Stack spacing={0.5}>
                                <Typography>
                                  <strong>Name:</strong> {`${member.firstName} ${member.lastName}`}
                                </Typography>
                                <Typography noWrap>
                                  <strong>Email:</strong> {member.email}
                                </Typography>
                                <Typography>
                                  <strong>Student ID:</strong> {member.uclId}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>
                      </MainCard>
                    </Grid>
                  ))}
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Collapse>
      </ScrollX>
      <Grid item xs={12}>
      <Accordion
            style={{
              margin: 'auto',
              border: 'none',
              backgroundColor: '#f5f5f5',
              boxShadow: 'none'
            }}
          >
            <AccordionSummary
              expandIcon={<ReadOutlined />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{alignItems: 'center'}} // 确保内容在同一行垂直居中
            >
              <ReadOutlined style={{ marginRight: '8px' }} />
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Assessment
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                在这里可以放置考核内容或其他相关信息。
              </Typography>
            </AccordionDetails>
          </Accordion>
      </Grid>
    </Grid>
  );
};

export default TabProfile;
