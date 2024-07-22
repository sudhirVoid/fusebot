import {  deleteObject, getDownloadURL, StorageReference, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

const uploadFileToFirebaseStorage = (file: File, storageRef: StorageReference) => {
    return new Promise<{ name: string, type: string, url?: string, error?: string, success: boolean }>((resolve) => {
    const metadata = {
      contentType: file.type
    };

    uploadBytes(storageRef, file, metadata)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);       
      })
      .then((downloadURL) => {
        return resolve({
          name: file.name,
          type: file.type,
          url: downloadURL,
          success: true
        });
      })
      .catch((error) => {
        return resolve({
          name: file.name,
          type: file.type,
          error: error.message,
          success: false
        });
      });
  });
};

const deleteFileToFirebaseStorage = (storageRef: StorageReference) => {
  return new Promise<{success: boolean, msg: string}>((resolve) => {
    deleteObject(storageRef).then(() => {
      resolve({success: true, msg: "Deletion completed successfully"});
    }).catch((error) => {
      resolve({success: false, msg: error.message});
    });
  });
  
}
export { uploadFileToFirebaseStorage, deleteFileToFirebaseStorage}
