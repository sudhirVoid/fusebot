import React from "react";
import { DragDrop } from "../../components";
import { getStorage, ref } from "firebase/storage";
import { uploadFileToFirebaseStorage } from "../../utils";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

function BotStudio() {
  // const auth = getAuth();
  // const userId = auth.currentUser?.uid;
  // const handleOnDrop = async (files: File[]) => {
  //   const uploadResult = await Promise.all(files.map(file => {
  //     toast.info(`Uploading File: ${file.name}`);
  //     const storageRef = ref(getStorage(), `${userId}/${file.name}`);
  //     return uploadFileToFirebaseStorage(file, storageRef);
  //   }
  //   ));
  //   //process the result
  //   uploadResult.forEach(data => {
  //     if(data.success){
  //       toast.success(`Uploaded File: ${data.name}`);
  //     }
  //     else{
  //       toast.error(`Failed to upload file: ${data.name}, Error: ${data.error}`);
  //     }
  //   })

  // };

  return (
    <>
    {/* <div className="mt-10 hidden w-full flex-col justify-between space-y-4 md:flex md:flex-row">
          <div className="flex w-full items-end border-b border-gray-300">
            {['Content Dashboard', 'File Management', 'Link Management', 'Bot Content Creation'].map(
              (filter, index) => (
                <div
                  className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black"
                  key={filter}
                >
                  {filter}
                </div>
              )
            )}
          </div>
        </div>
      <DragDrop
        onDrop={handleOnDrop}
        maxSize={10000000} // Example: 10 MB
        accept=".pdf,.doc,.docx,.txt" // Accept PDFs, DOC, DOCX, and TXT files
        maxFiles={5} // Example: Allow up to 5 files
      /> */}
    </>
  );
}

export default BotStudio;
