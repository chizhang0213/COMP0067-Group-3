'use server';

import db from 'db/index';

export async function insertProjectInfo(jsonString, moduleNo, academicYear) {
    const course = await db.modules.findFirst({
        where: {
          moduleNo: moduleNo,
          academicYear: academicYear
        }
    });

    const moduleProjects = await db.projects.findFirst({
        where: {
          moduleId: course.id
        }
    });

    const data = JSON.parse(jsonString);
    // let moduleTAs = [];
    // console.log(data);
    let projectInfo = [];

    for (const project of data) {
        try {
            let taID;
            if (project['TA Email']) {
                taID = await TAID(project['TA Email']); 
            } else {
                taID = '';
            }

            let teamMembers = [];
            if (project['Leader ID']){
                teamMembers.push(project['Leader ID']);
            }
            if (project['Second Member ID']){
                teamMembers.push(project['Second Member ID']);
            }
            if (project['Third Member ID']){
                teamMembers.push(project['Third Member ID']);
            }
            if (project['Fourth Member ID']){
                teamMembers.push(project['Fourth Member ID']);
            }
            if (project['Fifth Member ID']){
                teamMembers.push(project['Fifth Member ID']);
            }
            if (project['Sixth Member ID']){
                teamMembers.push(project['Sixth Member ID']);
            }

            let codeLink;
            if (project['Code Link']) {
                codeLink = project['Code Link'];
            } else {
                codeLink = '';
            }
            
            // console.log(teamMembers);
            let newProject = {
                teamNo: project['Team Number'],
                TAId: taID,
                projectTitle: project['Project Title'],
                leader: project['Leader ID'],
                teamMember: teamMembers,
                codeLink: codeLink
            }
            projectInfo.push(newProject);
            
        } catch (error) {
            console.error('Error updating project info:', error);
        }
    };
    // console.log(projectInfo);

    try {
        const updateProjects = await db.projects.update({
            where: { id: moduleProjects.id },
            data: {
                projects: projectInfo
            }
        });
    } catch (error) {
        console.error('Error while reseting module projects:', error);
        throw error;
    }

}

const TAID = async (email) => {
    const existingTA = await db.staff.findFirst({
        where: {
            email: email
        }
    });

    // Check if an existing TA was found
    if (existingTA) {
        // If an existing TA was found, return the TA ID
        // console.log('existing');
        return existingTA.id;
    } else {
        // If no existing TA was found, create a new TA record
        await db.staff.create({
            data: {
                userType: 'TA', 
                isActive: true,
                email: email
            }
        });
        const newTA = await db.staff.findFirst({
            where: {
                email: email
            }
        });
        // console.log('new');
        return newTA.id;
    }

}