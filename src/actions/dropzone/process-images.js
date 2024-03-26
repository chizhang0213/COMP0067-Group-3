import { insertStudentPhoto } from './insert-student-photo';

// Function to process image files
export default async function processImages(files) {
  
  files.forEach(file => {
    const reader = new FileReader();

    reader.onload = async () => {

        // console.log("File name:", file.name);
        const filenameWithoutExtension = file.name.slice(0, file.name.lastIndexOf("."));
        const uclID = parseInt(filenameWithoutExtension);

        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

        await insertStudentPhoto(base64String, uclID);

    };
    reader.readAsDataURL(file);
    
  });

}


