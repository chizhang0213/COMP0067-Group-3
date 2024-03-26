'use server';

import db from 'db/index';

export async function insertStudentPhoto(photo, uclID) {
    // console.log(photo);
    // console.log(uclID);

    try {
        const student = await db.students.findFirst({
            where: {
                uclId: uclID
            }
        });

        // Check if a student was found
        if (student) {
            await db.students.update({
                where: {
                    id: student.id
                },
                data: {
                    photo: photo
                }
            });
        } else {
            // If no existing student was found, create a new student record
            // There might still be some errors here.
            await db.students.create({
                data: {
                    uclId: uclID,
                    photo: photo
                }
            });
        }
    } catch (error) {
        console.error('Error while updating student photo:', error);
        throw error;
    }
}
