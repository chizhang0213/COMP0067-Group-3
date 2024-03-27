'use client';

import React, { useState, useEffect } from 'react';

// material-ui
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
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

  return (
    <Grid container spacing={1}>
      <ScrollX item xs={12} style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Accordion
              style={{
                margin: 'auto',
                border: 'none',
                backgroundColor: '#f5f5f5',
                boxShadow: 'none'
              }}
            >
              <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" style={{ alignItems: 'center' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  <UserOutlined style={{ marginRight: '8px' }} />
                  Profile
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
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
                        <Typography variant="subtitle1" style={{ marginBottom: '16px' }}>
                          {leader.uclId === member.uclId ? 'Leader / ' : ''}Student {index + 1}
                        </Typography>
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
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </ScrollX>
      <Grid item xs={12} style={{ height: '10px' }}></Grid>
      <ScrollX item xs={12} style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <MainCard
          style={{
            margin: 'auto',
            border: 'none',
            backgroundColor: '#f5f5f5',
            boxShadow: 'none'
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
            <Grid item>
              <Typography variant="h6" style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <ReadOutlined style={{ marginRight: '8px' }} />
                Assessment
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" style={{ marginRight: '15px' }}>
                Save
              </Button>
              <Button variant="contained" color="primary">
                Edit
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      </ScrollX>
    </Grid>
  );
};
export default TabProfile;
