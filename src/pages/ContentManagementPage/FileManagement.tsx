import { DragDrop } from "../../components";
import { getStorage, ref } from "firebase/storage";
import { uploadFileToFirebaseStorage } from "../../utils";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import FileContentTable from "./FileContentTable";
import { useState } from "react";

function FileManagement() {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const db = getFirestore();
  const [isFileUploaded, setisFileUploaded] = useState(false);
  // when someone drag and drop the file we will call this function
  const handleOnDrop = async (files: File[]) => {
    const uploadResult = await Promise.all(
      files.map((file) => {
        toast.info(`Uploading File: ${file.name}`);
        const storageRef = ref(getStorage(), `${userId}/${file.name}`);
        return uploadFileToFirebaseStorage(file, storageRef);
      })
    );
    uploadResult.forEach(async (data) => {
      if (data.success) {
        // we will try 3 times to add the document refrence in DB. If it fails, we will give up.
        const maxRetries = 3;
        let attempt = 0;
        let added = false;

        while (attempt < maxRetries && !added) {
          try {
            await addDoc(collection(db, "content"), {
              uid: userId,
              name: data.name,
              url: data.url,
              type: "file",
              fileType: data.type,
            });
            toast.success(`Uploaded File: ${data.name}`);
            added = true;
          } catch (error) {
            attempt++;
            if (attempt < maxRetries) {
              toast.warning(
                `Retrying to add document: Attempt ${attempt} for file ${data.name}`
              );
            } else {
              toast.error(
                `Failed to upload file: ${data.name} after ${maxRetries} attempts`
              );
            }
          }
        }
      } else {
        toast.error(
          `Failed to upload file: ${data.name}, Error: ${data.error}`
        );
      }
      setisFileUploaded(true);
    });
  };

      
  return (
    <>
      <DragDrop
        onDrop={handleOnDrop}
        maxSize={10000000} // Example: 10 MB
        accept=".pdf,.doc,.docx,.txt" // Accept PDFs, DOC, DOCX, and TXT files
        maxFiles={5} // Example: Allow up to 5 files
      />
      <FileContentTable newFileUploaded={isFileUploaded}/>
    </>
  );
}

export default FileManagement;
