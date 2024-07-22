import React, { useEffect, useState } from "react";
import { Delete, Download, FileX } from "lucide-react";
import { CustomTable, PageLoading } from "../../components";
import { FileData } from "../../interfaces/IContentManagementPage";
import { getAuth } from "firebase/auth";
import { query, collection, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getStorage, ref } from "firebase/storage";
import { deleteFileToFirebaseStorage } from "../../utils/firebaseStorageHandlers";
import { toast } from "react-toastify";

interface FileContentTableProps {
  newFileUploaded: boolean;
}



const handleDownload = async (tableRow: FileData) => {
  try {
    const response = await fetch(tableRow.url);
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = tableRow.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    toast.error(`Failed to download file: ${error}`);
  }
}


const FileContentTable: React.FC<FileContentTableProps> = (newFileUploaded) => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const [content, setContent] = useState([]);
  const [isTableDataLoaded, setisTableDataLoaded] = useState(false);
  const [isFileDeletedCompleted, setisFileDeletedCompleted] = useState(false);

  const columns = [
    {
      Header: "FileName",
      accessor: "name",
    },
    {
      Header: "FileType",
      accessor: "type",
    },
    {
      Header: "Updated At",
      accessor: "updatedAt",
    },
    {
      Header: "Actions",
      accessor: "actions",
      render: (tableRow: FileData) => (
        <div className="flex space-x-2">
          <button
            className="text-red-600 hover:text-red-800"
            //onClick={() => console.log(tableRow)}
            onClick={() => {             
              handleOnDelete(tableRow);
            }}
          >
            <FileX />
          </button>
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => handleDownload(tableRow)}
          >
            <Download />
          </button>
        </div>
      ),
    },
  ];

  const handleOnDelete = async (tableRow: FileData) => {
    // setisFileDeletedCompleted(false);
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const storage = getStorage();
    const fileRef = ref(storage, userId + "/" + tableRow.name);
    deleteFileToFirebaseStorage(fileRef)
      .then(async (res) => {
        if (res.success) {
          const contentRef = collection(db, 'content');
          const q = query(contentRef, where('uid', '==', userId), where('name', '==', tableRow.name));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (docSnapshot) => {
            const docRef = doc(db, 'content', docSnapshot.id);
            await deleteDoc(docRef);
          let contentList=content.filter((item) => item.name !== tableRow.name);
          setContent(contentList);
            toast.success(`Deleted File: ${tableRow.name}`);
        });
          //setisFileDeletedCompleted(true);
        } else {
          toast.error(
            `Failed to delete file: ${tableRow.name}, Error: ${res.msg}`
          );
        }
      })
      .catch((err) => {
        toast.error(`Failed to delete file: ${tableRow.name}, Error: ${err}`);
      });
  };
  //fetch file related data of a particular user.
  useEffect(() => {
    setisTableDataLoaded(false);
    const fetchData = async () => {
      if (!userId) return;
      try {
        const q = query(collection(db, 'content'), where("uid", "==", userId));
        const querySnapshot = await getDocs(q);

        const contentList = querySnapshot.docs.map((doc) => doc.data());

        setContent(contentList);
        setisTableDataLoaded(true);
      } catch (error) {
        console.error("Error fetching content: ", error);
      }
    };

    fetchData();
  }, [newFileUploaded, userId, isFileDeletedCompleted , content.length]);

  return isTableDataLoaded === true ? (
    <CustomTable
      columns={columns}
      data={content}
      title="Files"
      description="Your Files to train bots."
    />
  ) : (
    <PageLoading />
  );
};

export default FileContentTable;
