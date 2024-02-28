import db from '../index.js';

export async function fetchTitleByModuleNo({ moduleNo }) {
  const course = await db.modules.findUnique({
    where: {
      moduleNo: moduleNo
    },
    select: {
      title: true
    }
  });

  console.log(course);

  return course?.title;
}
