'use server';

import db from 'db/index';

export async function insertStudentData(jsonString, moduleNo, academicYear) {
    const course = await db.modules.findFirst({
        where: {
          moduleNo: moduleNo,
          academicYear: academicYear
        }
    });

    const data = JSON.parse(jsonString);
    // console.log(data);
    
    let moduleStudents = [];
    await Promise.all(data.map( async (student) => {
        // console.log(student['Student Number']);
        try {
            const existingStudent = await db.students.findFirst({
                where: {
                    uclId: student['Student Number']
                }
            });

            // Check if an existing student was found
            if (existingStudent) {
                // If an existing student was found, update the student record
                await db.students.update({
                    where: {
                        id: existingStudent.id
                    },
                    data: {
                        // Update the student record with the new data
                        firstName: student.Forename,
                        lastName: student.Surname,
                        email: student.Email
                    }
                });
            } else {
                // If no existing student was found, create a new student record
                await db.students.create({
                    data: {
                        uclId: student['Student Number'],
                        firstName: student.Forename,
                        lastName: student.Surname,
                        email: student.Email
                    }
                });
            }
            moduleStudents.push(student['Student Number']);
        } catch (error) {
            console.error('Error upserting students:', error);
        }
    }));
    // console.log(moduleStudents);
    try {
        const updateModule = await db.modules.update({
            where: { id: course.id },
            data: {
                students: moduleStudents
            }
        });
    } catch (error) {
        console.error('Error while updating student info for the module:', error);
        throw error;
    }
}
