import { insertStudentPhoto } from './insert-student-photo';

// Function to process image files
export default async function processImages(files) {
  
    for (const file of files) {
        const reader = new FileReader();

        reader.onload = async () => {

            // console.log("File name:", file.name);
            const filenameWithoutExtension = file.name.slice(0, file.name.lastIndexOf("."));

            // To check if the filename only contains digits
            const isDigitsOnly = /^\d+$/.test(filenameWithoutExtension);
            if (!isDigitsOnly) {
                const errorMessage = 'Failed to parse UCL ID from filename';
                // Display error message using a dialogue
                // alert(errorMessage);
                throw new Error(errorMessage);
            }
            const uclID = parseInt(filenameWithoutExtension);

            // console.log('continue');
            const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

            await insertStudentPhoto(base64String, uclID);

        };
        reader.readAsDataURL(file); // starts reading the contents of the file
    };

}


