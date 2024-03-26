import { json } from '../../../node_modules/react-router-dom/dist/index';
import { insertProjectInfo } from './insert-project-info';
import { insertStudentData } from './insert-student-data';
import { insertTAData } from './insert-ta-data';

const xlsx = require('xlsx');

// Function to process XLSX files
export default async function processXlsxFile(files, moduleNo, academicYear) {
  
  files.forEach(file => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = event.target.result;
      const workbook = xlsx.read(data, { type: 'binary' });

      const sheetNames = workbook.SheetNames;
      for (const sheetName of sheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        const jsonString = JSON.stringify(jsonData);
        console.log(sheetName);
        // console.log(typeof jsonString);
        // await processSheetData(sheetName, jsonData);
        if (sheetName === 'projects') {
          await insertProjectInfo(jsonString, moduleNo, academicYear);
        } else if (sheetName === 'students') {
          await insertStudentData(jsonString, moduleNo, academicYear);
        } else if (sheetName === 'tas') {
          await insertTAData(jsonString, moduleNo, academicYear);
        } else {
          console.error('Unsupported sheet:', sheetName);
        }
      }
    };
    reader.readAsBinaryString(file);
    
  });

}

// Function to process data for each sheet
async function processSheetData(sheetName, data) {
  // Prisma model name for each sheet
  let modelName = '';
  if (sheetName === 'Sheet1') {
    modelName = 'Sheet1Model';
  } else if (sheetName === 'Sheet2') {
    modelName = 'Sheet2Model';
  } else {
    console.error('Unsupported sheet:', sheetName);
    return;
  }

  // // Insert data into corresponding Prisma model
  // try {
  //   await prisma[modelName].createMany({
  //     data: data.map((row) => {
  //       return {
  //         // Map each row data here according to your Prisma model
  //       };
  //     }),
  //   });
  //   console.log(`Data inserted into ${modelName} collection.`);
  // } catch (error) {
  //   console.error(`Error inserting data into ${modelName} collection:`, error);
  // }
}

// // Function to process data for each sheet
// async function processSheetData(sheetName, data) {
//   // Prisma model name for each sheet
//   let modelName = '';
//   if (sheetName === 'Sheet1') {
//     modelName = 'Sheet1Model';
//   } else if (sheetName === 'Sheet2') {
//     modelName = 'Sheet2Model';
//   } else {
//     console.error('Unsupported sheet:', sheetName);
//     return;
//   }

//   // Insert data into corresponding Prisma model
//   try {
//     await prisma[modelName].createMany({
//       data: data.map((row) => {
//         return {
//           // Map each row data here according to your Prisma model
//         };
//       }),
//     });
//     console.log(`Data inserted into ${modelName} collection.`);
//   } catch (error) {
//     console.error(`Error inserting data into ${modelName} collection:`, error);
//   }
// }

// // Usage example
// const filePath = 'data.xlsx'; // Path to your Excel file
// if (filePath.endsWith('.xlsx')) {
//   processXlsxFile(filePath).finally(() => {
//     prisma.$disconnect();
//   });
// } else {
//   console.error('Unsupported file format. Please provide a valid XLSX file.');
// }
