import React, { useEffect, useState } from "react";
import { FileData } from "../../../interfaces/IContentManagementPage";
import { CustomTable, PageLoading } from "../../../components";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

const BotContentCreation: React.FC = () => {
  const {logout} =   useAuth();
  const [content, setContent] = useState<FileData[]>([]);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const [tableRowsSelected, setTableRowsSelected] = useState<FileData[]>([]);
  const [batchName, setBatchName] = useState("");

  // Handles checkbox state change
  const handleCheckboxChange = (tableRow: FileData) => {
    setTableRowsSelected((prevSelected) => {
      if (prevSelected.some((row) => row.name === tableRow.name)) {
        return prevSelected.filter((row) => row.name !== tableRow.name);
      } else {
        return [...prevSelected, tableRow];
      }
    });
  };

  const handleBatchCreation = async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
  
    if (!userId) {
      logout();
      return;
    }
  
    try {
        setTableRowsSelected([]);
        setBatchName("");
        toast.info('Creating Batch...');
      // Reference to the user's document
      const userDocRef = doc(db, "users", userId);
  
      // Reference to the batches subcollection within the user's document
      const batchesCollectionRef = collection(userDocRef, "batches");
  
      // Create a new batch document in the batches subcollection
      await addDoc(batchesCollectionRef, {
        batchName: batchName,
        files: tableRowsSelected.map(file => ({
          name: file.name,
          url: file.url,
          type: file.type,
          updatedAt: file.updatedAt || new Date(),
        })),
        createdAt: new Date(),  // Timestamp for batch creation
      });
      toast.success('Batch Created Successfully');

    } catch (error) {
        toast.error('Error while creating batch: ' + error);
    }
  };

  // Define columns for the CustomTable
  const columns = [
    {
      Header: "Actions",
      accessor: "select",
      render: (tableRow: FileData) => (
        <div className="flex space-x-2">
          <input
            id={`checkbox-${tableRow.name}`}
            type="checkbox"
            checked={tableRowsSelected.some(
              (row) => row.name === tableRow.name
            )}
            onChange={() => handleCheckboxChange(tableRow)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      ),
    },
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
  ];

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const q = query(collection(db, "content"), where("uid", "==", userId));
        const querySnapshot = await getDocs(q);
        const contentList = querySnapshot.docs.map(
          (doc) => doc.data() as FileData
        );
        setContent(contentList);
      } catch (error) {
        console.error("Error fetching content: ", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="">
      <CustomTable
        columns={columns}
        data={content}
        title="Uploaded Files"
        description="Give the name of the batch so that you can choose that batch to train bot with these selected files."
      />
  <div className="flex items-center my-4 mx-4">
    <input
      type="text"
      value={batchName}
      onChange={(e) => setBatchName(e.target.value)}
      placeholder="Enter batch name"
      className={`mr-4 px-3 py-2 border rounded-md ${tableRowsSelected.length === 0 ? 'bg-gray-200' : 'bg-white'}`}
      disabled={tableRowsSelected.length === 0}
    />
    <button
      onClick={handleBatchCreation}
      type="button"
      className={`rounded-md border border-black px-4 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
        tableRowsSelected.length === 0 ? 'text-gray-400 border-gray-400 cursor-not-allowed' : 'text-black'
      }`}
      disabled={tableRowsSelected.length === 0}
    >
      Create Batch
    </button>
  </div>

    </div>
  );
};

export default BotContentCreation;
