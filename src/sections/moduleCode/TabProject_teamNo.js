'use client';

import React, { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';

// material-ui
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Box,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { useParams } from 'next/navigation';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { fetchProjectByTeamNo } from 'db/queries/teamNo-project';
import { fetchStudentsByUCLId } from 'db/queries/teamMember-students';
import { fetchLeaderByUCLId } from 'db/queries/uclId-leader';
import { fetchSchemeByModuleId } from 'db/queries/moduleId-scheme';
import { fetchGradeByModuleId } from 'db/queries/moduleId-grade';
import { changeStatus } from 'actions/change-status';

// assets
import { UserOutlined, ReadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ScrollX from 'components/ScrollX';
import { fetchModuleByModuleNo } from 'db/queries/moduleNo-module';
import { changeGrade } from 'actions/change-grade';

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const TabProfile = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [project, setProject] = useState({});
  const [team, setTeam] = useState([]);
  const [leader, setLeader] = useState({});
  const [scheme, setScheme] = useState([]);
  const [module, setModule] = useState({});
  const [inputScores, setInputScores] = useState([]);
  const [moduleTotals, setModuleTotals] = useState([]);
  const [peerReviews, setPeerReviews] = useState([]);
  const [individualScores, setIndividualScores] = useState([]);
  const [individualContributions, setIndividualContributions] = useState([]);
  const [finalScores, setFinalScores] = useState([]);
  const [moduleInputs, setModuleInputs] = useState({});
  const { moduleNo, academicYear, teamNo } = useParams();
  const academicYearInt = parseInt(academicYear);
  const teamNoInt = parseInt(teamNo);
  const score = ['Group Score', 'Individual Score', 'Final Score'];

  const totalSum = moduleTotals.reduce((acc, curr) => acc + curr.total, 0);

  const weightSum = moduleTotals.reduce((acc, curr) => acc + curr.weight, 0);

  const groupScore = weightSum > 0 ? ((totalSum / weightSum) * 100).toFixed(2) : '0.00';

  useEffect(() => {
    const newModuleTotals = [];
    scheme.forEach((component, componentIndex) => {
      let total = 0;
      if (component.isDistributed) {
        component.questions.forEach((question, questionIndex) => {
          if (question.qType === 'percentage' && question.detail && question.detail.percentage) {
            const key = `${componentIndex}-${questionIndex}`;
            const input = inputScores.find((input) => input.key === key);
            if (input) {
              const score = parseFloat(input.value || 0);
              const weight = parseFloat(question.detail.percentage) / 100;
              total += score * weight;
            }
          }
        });
      } else if (!component.isDistributed) {
        const inputScore = parseFloat(moduleInputs[componentIndex] || 0);
        total = inputScore * (component.weight / 100);
      }
      if (component.type === 'Group') {
        newModuleTotals.push({ key: componentIndex, total, weight: component.weight });
      }
    });
    setModuleTotals(newModuleTotals);
  }, [inputScores, moduleInputs, scheme]);

  useEffect(() => {
    const fetchModuleTitle = async () => {
      try {
        const fetchedModule = await fetchModuleByModuleNo(moduleNo, academicYearInt);
        setModule(fetchedModule);

        const fetchedProject = await fetchProjectByTeamNo(moduleNo, academicYearInt, teamNoInt);
        setProject(fetchedProject);

        const fetchedTeam = await fetchStudentsByUCLId(fetchedProject.teamMember);
        setTeam(fetchedTeam);

        const fetchedLeader = await fetchLeaderByUCLId(fetchedProject.leader);
        setLeader(fetchedLeader);

        const fetchedScheme = await fetchSchemeByModuleId(fetchedModule.id);
        setScheme(fetchedScheme);
      } catch (error) {
        console.error('Error while fetching module title:', error);
      }
    };

    fetchModuleTitle();
  }, [moduleNo, academicYearInt, teamNoInt]);

  useEffect(() => {
    const fetchGradeAndInitializeStates = async () => {
      try {
        const fetchedGrade = await fetchGradeByModuleId(module.id, teamNoInt);

        const initialInputScores = Object.values(fetchedGrade.TAMark).map((item) => ({
          key: item.key,
          value: item.value,
          qType: item.qType,
          title: item.title
        }));

        setInputScores(initialInputScores);

        const initialModuleTotals = Object.values(fetchedGrade.TAMarkComponent).map((item) => ({
          key: item.key,
          total: item.total,
          weight: item.weight || 0
        }));

        setModuleTotals(initialModuleTotals);

        const peerReviewsData = fetchedGrade.peerReview;
        const peerReviewsArray = Object.keys(peerReviewsData).map((key) => peerReviewsData[key]);

        setPeerReviews(peerReviewsArray);

        const initialIndividualContributions = Object.values(fetchedGrade.TAMarkIndividual).map((item) => ({
          studentId: item.studentId,
          contribution: item.contribution
        }));

        setIndividualContributions(initialIndividualContributions);

        const initialIndividualScores = Object.values(fetchedGrade.TAMarkIndividual).map((item) => ({
          studentId: item.studentId,
          score: item.score
        }));

        setIndividualScores(initialIndividualScores);

        const initialModuleInputs = initialModuleTotals.reduce((acc, current) => {
          acc[current.key] = (current.total * 100) / current.weight;
          return acc;
        }, {});

        setModuleInputs(initialModuleInputs);
      } catch (error) {
        console.error('Error fetching grade:', error);
      }
    };

    fetchGradeAndInitializeStates();
  }, []);

  console.log('个人贡献', individualContributions);
  console.log('个人得分', individualScores);

  useEffect(() => {
    if (groupScore && individualScores.length > 0) {
      const newFinalScores = individualScores.map((score) => ({
        studentId: score.studentId,
        score: parseFloat(((parseFloat(score.score) * (100 - weightSum) + parseFloat(groupScore) * weightSum) / 100).toFixed(2))
      }));
      setFinalScores(newFinalScores);
    }
  }, [groupScore, individualScores, weightSum]);

  const handleInputChange = (event, componentIndex, questionIndex, qType, title) => {
    const newValue = event.target.value;
    const key = `${componentIndex}-${questionIndex}`;

    const existingIndex = inputScores.findIndex((input) => input.key === key);

    if (existingIndex >= 0) {
      const newInputScores = [...inputScores];
      newInputScores[existingIndex] = { ...newInputScores[existingIndex], value: newValue };
      setInputScores(newInputScores);
    } else {
      setInputScores([...inputScores, { key, value: newValue, qType, title }]);
    }
  };

  const handleModuleInputChange = (event, componentIndex) => {
    const newValue = parseFloat(event.target.value);
    if (newValue >= 0 && newValue <= 100) {
      setModuleInputs((prevInputs) => ({
        ...prevInputs,
        [componentIndex]: newValue
      }));

      setModuleTotals((prevTotals) => {
        return prevTotals.map((total) => {
          if (total.key === componentIndex) {
            return { ...total, total: newValue * (total.weight / 100) };
          }
          return total;
        });
      });
    }
  };

  const handleIndividualScoreChange = (studentId, score) => {
    const updatedScores = individualScores.some((s) => s.studentId === studentId)
      ? individualScores.map((s) => (s.studentId === studentId ? { studentId, score } : s))
      : [...individualScores, { studentId, score }];

    setIndividualScores(updatedScores);
  };

  const handlePeerReviewChange = (reviewerId, revieweeId, score) => {
    const newPeerReviews = [...peerReviews];
    const index = newPeerReviews.findIndex((pr) => pr.reviewer === reviewerId && pr.reviewee === revieweeId);
    if (index !== -1) {
      newPeerReviews[index].score = score;
    } else {
      newPeerReviews.push({ reviewer: reviewerId, reviewee: revieweeId, score });
    }
    setPeerReviews(newPeerReviews);
  };

  const handleIndividualContributionChange = (studentId, newContribution) => {
    setIndividualContributions((prevContributions) => {
      const updatedContributions = [...prevContributions];
      const index = updatedContributions.findIndex((contribution) => contribution.studentId === studentId);
      if (index !== -1) {
        updatedContributions[index].contribution = newContribution;
      } else {
        updatedContributions.push({ studentId, contribution: newContribution });
      }
      return updatedContributions;
    });
  };

  const handleSave = async () => {
    try {
      changeGrade(module.id, teamNo, inputScores, moduleTotals, individualScores, individualContributions, finalScores, peerReviews);
      console.log('Saving data');
      setSnackbarMessage('Save successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      setSnackbarMessage('Save failed');
    }
    setOpenSnackbar(true);
  };

  const handleFinalise = () => {
    let allFilled = true;
    scheme.forEach((component, componentIndex) => {
      component.questions.forEach((question, questionIndex) => {
        if (!question.isOptional || question.qType === 'percentage') {
          const key = `${componentIndex}-${questionIndex}`; // 使用索引构建 key
          const inputRecord = inputScores.find((input) => input.key === key);
          if (!inputRecord || inputRecord.value === '') {
            console.log(`Empty required field: ${key}`);
            allFilled = false;
          }
        }
      });
    });
    if (allFilled) {
      changeStatus(module.id, teamNo, 'Finished');
      setSnackbarMessage('Finalise successfully');
    } else {
      setSnackbarMessage('Finalise failed: Some required fields are empty');
    }
    setOpenSnackbar(true);
  };

  const findInputValue = (key) => {
    const inputRecord = inputScores.find((input) => input.key === key);
    return inputRecord ? inputRecord.value.toString() : '';
  };

  const findModuleValue = (key) => {
    const inputModule = moduleTotals.find((input) => input.key === key);
    if (inputModule && inputModule.weight > 0) {
      return (inputModule.total * 100) / inputModule.weight;
    }
    return '';
  };

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
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                  <UserOutlined style={{ marginRight: '8px' }} />
                  Group Members
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
              <Typography variant="h5" style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <ReadOutlined style={{ marginRight: '8px' }} />
                Assessment
              </Typography>
            </Grid>
            <Grid item>
              <div>
                <Button variant="contained" color="primary" style={{ marginRight: '15px' }} onClick={handleSave}>
                  Save
                </Button>
                <Button variant="contained" color="warning" style={{ marginRight: '15px' }} onClick={handleFinalise}>
                  Finalise
                </Button>
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} message={snackbarMessage} />
              </div>
            </Grid>
          </Grid>
          {scheme.map((component, componentIndex) => (
            component.type === 'Group' ? (
              <ScrollX
                key={componentIndex}
                container
                spacing={2}
                style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '12px' }}
              >
                <Grid item xs={12}>
                  <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                    {componentIndex + 1}. {component.name}
                    {<strong>{` (${component.weight}%): `}</strong>}
                  </Typography>
                  {component.questions.map((question, questionIndex) => (
                    <Grid container key={questionIndex} alignItems="center" spacing={2}>
                      <Grid item xs={5} style={{ textAlign: 'left', paddingLeft: '10%', paddingTop: '3%' }}>
                        <Typography variant="h5" style={{ fontWeight: 'normal' }}>
                          {(!question.isOptional || question.qType === 'percentage') && (
                            <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                          )}
                          {question.title}
                          {question.qType === 'percentage' && <strong>{` (${question.detail.percentage}%)`}</strong>}
                          {': '}
                          {question.description !== null && question.description !== '' && (
                            <Tooltip title={question.description}>
                              <QuestionCircleOutlined style={{ color: 'rgb(210,209,209)' }} />
                            </Tooltip>
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs={7} style={{ textAlign: 'left', padding: '40px 0 0 0' }}>
                        {question.qType === 'dropdown' ? (
                          <Select
                            labelId={`select-label-${componentIndex}-${questionIndex}`}
                            id={`select-${componentIndex}-${questionIndex}`}
                            value={findInputValue(`${componentIndex}-${questionIndex}`)}
                            onChange={(event) => handleInputChange(event, componentIndex, questionIndex, question.qType, question.title)}
                            style={{ width: '90%' }}
                          >
                            {question.detail.dropdown.map((option, optionIndex) => (
                              <MenuItem key={optionIndex} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : question.qType === 'short-answer' ? (
                          <TextField
                            id={`input-${questionIndex}`}
                            type={question.detail.shortAns === 'float' ? 'number' : 'text'}
                            placeholder={question.placeholder}
                            variant="outlined"
                            value={findInputValue(`${componentIndex}-${questionIndex}`)}
                            onChange={(event) => handleInputChange(event, componentIndex, questionIndex, question.qType, question.title)}
                            style={{ width: '90%' }}
                          />
                        ) : question.qType === 'paragraph' ? (
                          <TextField
                            id={`paragraph-${questionIndex}`}
                            multiline
                            rows={4}
                            variant="outlined"
                            style={{ width: '90%' }}
                            value={findInputValue(`${componentIndex}-${questionIndex}`)}
                            onChange={(event) => handleInputChange(event, componentIndex, questionIndex, question.qType, question.title)}
                          />
                        ) : question.qType === 'percentage' ? (
                          <TextField
                            id={`input-score-${componentIndex}-${questionIndex}`}
                            type="number"
                            placeholder={question.placeholder}
                            variant="outlined"
                            value={findInputValue(`${componentIndex}-${questionIndex}`)}
                            onChange={(event) => handleInputChange(event, componentIndex, questionIndex, question.qType, question.title)}
                            style={{ width: '90%' }}
                          />
                        ) : null}
                      </Grid>
                    </Grid>
                  ))}
                  <Box style={{ paddingLeft: '10%', paddingTop: '8px', paddingBottom: '8px' }}>
                    <Grid item xs={12} style={{ textAlign: 'right', paddingRight: '6%', paddingTop: '5%' }}>
                      {component.isDistributed ? (
                        <Typography variant="h4">Module Total: {moduleTotals[componentIndex]?.total.toFixed(2) || '0'} </Typography>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                          <Typography variant="h4" style={{ fontWeight: 'bold', marginRight: '8px' }}>
                            Module Total is
                          </Typography>
                          <TextField
                            id={`input-${componentIndex}`}
                            type="number"
                            variant="outlined"
                            value={findModuleValue(componentIndex)}
                            onChange={(event) => handleModuleInputChange(event, componentIndex)}
                            style={{ width: '20%', marginRight: '8px' }}
                          />
                          <Typography variant="h4">, which should be {moduleTotals[componentIndex]?.total.toFixed(2) || '0'}</Typography>
                        </div>
                      )}
                    </Grid>
                  </Box>
                </Grid>
              </ScrollX>
            ) : component.type === 'Individual' ? (
              <ScrollX
                key={componentIndex}
                container
                spacing={2}
                style={{ marginTop: '20px', backgroundColor: '#f5f5f5', borderRadius: '12px' }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <MainCard
                      style={{
                        margin: 'auto',
                        border: 'none',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: 'none',
                        height: '100%'
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h5" style={{ marginBottom: '20px' }}>
                            Individual Contribution
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={9}>
                              <Typography variant="h5" align="center">
                                Overall % of contribution from demo slide
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        {team.map((member, index) => (
                          <Grid item xs={12} key={index}>
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item xs={3}>
                                <Typography variant="h5">{'Student ' + (index + 1)}</Typography>
                              </Grid>
                              <Grid item xs={9}>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  value={individualContributions.find((s) => s.studentId === member.uclId)?.contribution || ''}
                                  onChange={(e) => handleIndividualContributionChange(member.uclId, e.target.value)}
                                  placeholder="Enter number of percentage"
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </MainCard>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <MainCard
                      style={{
                        margin: 'auto',
                        border: 'none',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: 'none',
                        height: '100%'
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                            Peer Review
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2} justifyContent="left">
                            <Grid item xs={3}>
                              <Typography align="center" style={{ fontWeight: 'bold' }}>
                                Reviewer\Reviewee
                              </Typography>
                            </Grid>
                            {team.map((member, index) => (
                              <Grid item xs={2} key={index}>
                                <Typography align="center">{'Student ' + (index + 1)}</Typography>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                        {team.map((reviewer, reviewerIndex) => (
                          <Grid item xs={12} key={reviewerIndex}>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={3}>
                                <Typography variant="h6" align="center">
                                  {'Student ' + (reviewerIndex + 1)}
                                </Typography>
                              </Grid>
                              {team.map((reviewee, revieweeIndex) => (
                                <Grid item xs={2} key={revieweeIndex}>
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={
                                      peerReviews.find((pr) => pr.reviewer === reviewer.uclId && pr.reviewee === reviewee.uclId)?.score ||
                                      ''
                                    }
                                    onChange={(e) => handlePeerReviewChange(reviewer.uclId, reviewee.uclId, e.target.value)}
                                    placeholder={'Score'}
                                    InputLabelProps={{
                                      shrink: true
                                    }}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </MainCard>
                  </Grid>
                </Grid>
              </ScrollX>
            ) : null
          ))}
          <ScrollX item xs={12} style={{ borderRadius: '12px', overflow: 'hidden', marginTop: '20px' }}>
            <MainCard style={{ margin: 'auto', border: 'none', backgroundColor: 'white', borderRadius: '12px', boxShadow: 'none' }}>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h5" style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '20px' }}>
                    Final Score
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {/* Title */}
                    <Grid item xs={12}>
                      <Grid container spacing={2} justifyContent="left">
                        <Grid item xs={3}></Grid>
                        {/* Student */}
                        {team.map((member, index) => (
                          <Grid item xs={2} key={index}>
                            <Typography variant="h5" align="center">
                              {'Student ' + (index + 1)}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                    {score.map((section, sectionIndex) => (
                      <Grid item xs={12} key={sectionIndex}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={3}>
                            <Typography variant="h5" align="center">
                              {section}
                            </Typography>
                          </Grid>
                          {team.map((mark, markIndex) => (
                            <Grid item xs={2} key={markIndex}>
                              {sectionIndex === 0 ? (
                                <Typography align="center">{groupScore}</Typography>
                              ) : sectionIndex === 2 ? (
                                <Typography align="center">
                                  {finalScores.find((s) => s.studentId === mark.uclId)?.score || '0.00'}
                                </Typography>
                              ) : (
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  value={individualScores.find((s) => s.studentId === mark.uclId)?.score || ''}
                                  onChange={(e) => handleIndividualScoreChange(mark.uclId, e.target.value)}
                                  placeholder={'hhh'}
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                />
                              )}
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </ScrollX>
        </MainCard>
      </ScrollX>
    </Grid>
  );
};
export default TabProfile;
