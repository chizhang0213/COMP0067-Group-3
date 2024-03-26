'use server';

import db from 'db/index';

export async function insertTAData(jsonString, moduleNo, academicYear) {
    const course = await db.modules.findFirst({
        where: {
          moduleNo: moduleNo,
          academicYear: academicYear
        }
    });

    const data = JSON.parse(jsonString);
    let moduleTAs = [];
    // console.log(data);

    await Promise.all(data.map( async (ta) => {
        // console.log(ta.Email);
        try {
            const existingTA = await db.staff.findFirst({
                where: {
                    email: ta.Email
                }
            });

            // Check if an existing TA was found
            if (existingTA) {
                // If an existing TA was found, update the TA record
                await db.staff.update({
                    where: {
                        id: existingTA.id
                    },
                    data: {
                        // Update the TA record with the new data
                        firstName: ta.Forename,
                        lastName: ta.Surname,
                        userType: 'TA', 
                        isActive: true
                    }
                });
                moduleTAs.push(existingTA.id);
                // console.log(moduleTAs);
            } else {
                // If no existing TA was found, create a new TA record
                await db.staff.create({
                    data: {
                        firstName: ta.Forename,
                        lastName: ta.Surname,
                        userType: 'TA', 
                        isActive: true,
                        email: ta.Email
                    }
                });
                const newTA = await db.staff.findFirst({
                    where: {
                        email: ta.Email
                    }
                });
                moduleTAs.push(newTA.id);
                // console.log('new');
                // console.log(moduleTAs);
            }
        } catch (error) {
            console.error('Error upserting TAs:', error);
        }
    }));

    try {
        const updateModule = await db.modules.update({
            where: { id: course.id },
            data: {
                TAs: moduleTAs
            }
        });
    } catch (error) {
        console.error('Error while updating TA info for the module:', error);
        throw error;
    }

}
