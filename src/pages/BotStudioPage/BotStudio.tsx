/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { LANGUAGES } from "../../consts/Languages";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
interface BotStudioFormData {
  botName: string;
  botDescription: string;
  greetingMessage: string;
  language: string;
  personalityTone: string;
  selectedBatch: {
    id: string,
    name: string,
    files: any
  }
}

interface AllBatchData {
  fileName: string;
}
[];

const BotStudio: React.FC = () => {
  const [botName, setBotName] = useState<string>("");
  const [botDescription, setBotDescription] = useState<string>("");
  const [greetingMessage, setGreetingMessage] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [personalityTone, setPersonalityTone] = useState<string>("");
  const [selectedBatch, setSelectedBatch] = useState<{
    id: string;
    name: string;
    files: any;
  }>();
  const [isLanguageDropDownOpen, setIsLanguageDropDownOpen] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<{
    [key in keyof BotStudioFormData]?: string;
  }>({});

  const [batches, setBatches] = useState<
    { id: string; name: string; files: any }[]
  >([]);
  const [allBatchData, setAllBatchData] = useState<AllBatchData[]>([]);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid ?? "";
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const batchCollectionRef = collection(
          doc(db, "users", currentUserId),
          "batches"
        );
        const batchesSnapshot = await getDocs(batchCollectionRef);
        console.log(batchesSnapshot);

        // Create both lists in a single pass
        const batchList: { id: string; name: string; files: any[] }[] = [];
        const allBatchDataList: any = [];

        batchesSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          batchList.push({
            id: doc.id,
            name: data.batchName, // Adjust this based on your data structure
            files: data.files,
          });
          allBatchDataList.push({
            fileName: data.files[0].name, // Extract the `files` key from each document
          });
        });

        setBatches(batchList);
        setAllBatchData(allBatchDataList);
        console.log(allBatchDataList);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    if (currentUserId) {
      fetchBatches();
    }
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
    setIsLanguageDropDownOpen(false); // Close dropdown on selection

    // Remove error if value is selected
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, language: undefined }));
    }
  };
  const handleBatchSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBatchName = event.target.value;
    const batch = batches.find((batch) => batch.name === selectedBatchName);
  
    if (batch) {
      setSelectedBatch(batch);
      // Clear any existing error when a batch is selected
      setErrors((prevErrors) => ({ ...prevErrors, selectedBatch: undefined }));
    } else {
      // If no valid batch is selected, set an error
      setErrors((prevErrors) => ({ ...prevErrors, selectedBatch: "Batch is required." }));
    }
  };
  

  const handleInputChange =
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      fieldName: keyof BotStudioFormData
    ) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);

      // Remove error if field is filled
      if (event.target.value) {
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: undefined }));
      }
    };

  const toggleDropdown = () => setIsLanguageDropDownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { [key in keyof BotStudioFormData]?: string } = {};
  
    if (!botName) newErrors.botName = "Bot Name is required.";
    if (!botDescription) newErrors.botDescription = "Description is required.";
    if (!greetingMessage) newErrors.greetingMessage = "Greeting Message is required.";
    if (!selectedLanguage) newErrors.language = "Language is required.";
    if (!personalityTone) newErrors.personalityTone = "Personality/Tone is required.";
    if (!selectedBatch?.id) newErrors.selectedBatch = "Batch is required.";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const formData: BotStudioFormData = {
      botName,
      botDescription,
      greetingMessage,
      language: selectedLanguage,
      personalityTone,
      selectedBatch,
    };
  
    try {
      const auth = getAuth();
      const currentUserId = auth.currentUser?.uid;
      if (!currentUserId) {
        toast.error('Cannot create bot please refresh.');
        return;
      } 
      const userDocRef = doc(db, "bots", currentUserId);
      const newBotDocRef = doc(collection(userDocRef, "userBots"));
      await setDoc(newBotDocRef, formData);
      toast.success(`Bot created successfully.`);
    } catch (error) {
      console.error("Error creating bot:", error);
    }
  };

  return (
    <form
      className="w-full max-w-lg grid grid-cols-1 gap-6 p-6 bg-white shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center px-2">
        <div className="pr-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="bot-name"
          >
            Bot Name
          </label>
          <input
            className={`appearance-none block w-full bg-gray-100 text-gray-700 border ${
              errors.botName ? "border-red-500" : "border-gray-300"
            } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500`}
            id="bot-name"
            type="text"
            placeholder="SalesBot"
            value={botName}
            onChange={handleInputChange(setBotName, "botName")}
          />
          {errors.botName && (
            <p className="text-red-500 text-xs italic">{errors.botName}</p>
          )}
        </div>

        <div className="w-72">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="bot-description"
          >
            Description
          </label>
          <textarea
            className={`appearance-none block w-full bg-gray-100 text-gray-700 border ${
              errors.botDescription ? "border-red-500" : "border-gray-300"
            } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500`}
            id="bot-description"
            placeholder="Describe the bot's purpose and capabilities..."
            value={botDescription}
            onChange={handleInputChange(setBotDescription, "botDescription")}
          />
          {errors.botDescription && (
            <p className="text-red-500 text-xs italic">
              {errors.botDescription}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="greeting-message"
        >
          Greeting Message
        </label>
        <input
          className={`appearance-none block w-full bg-gray-100 text-gray-700 border ${
            errors.greetingMessage ? "border-red-500" : "border-gray-300"
          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500`}
          id="greeting-message"
          type="text"
          placeholder="Hi there! How can I assist you today?"
          value={greetingMessage}
          onChange={handleInputChange(setGreetingMessage, "greetingMessage")}
        />
        {errors.greetingMessage && (
          <p className="text-red-500 text-xs italic">
            {errors.greetingMessage}
          </p>
        )}
      </div>

      <div>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="language"
        >
          Language
        </label>
        <div className="relative">
          <select
            className={`appearance-none block w-full bg-gray-100 text-gray-700 border ${
              errors.language ? "border-red-500" : "border-gray-300"
            } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500`}
            id="language"
            value={selectedLanguage}
            onChange={handleChange}
            ref={selectRef}
          >
            <option value="">Select Language</option>
            {LANGUAGES.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            {isLanguageDropDownOpen ? (
              <ChevronUpIcon className="h-4 w-4 text-gray-700" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-gray-700" />
            )}
          </div>
        </div>
        {errors.language && (
          <p className="text-red-500 text-xs italic">{errors.language}</p>
        )}
      </div>

      <div>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="personality-tone"
        >
          Personality/Tone
        </label>
        <input
          className={`appearance-none block w-full bg-gray-100 text-gray-700 border ${
            errors.personalityTone ? "border-red-500" : "border-gray-300"
          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500`}
          id="personality-tone"
          type="text"
          placeholder="Friendly"
          value={personalityTone}
          onChange={handleInputChange(setPersonalityTone, "personalityTone")}
        />
        {errors.personalityTone && (
          <p className="text-red-500 text-xs italic">
            {errors.personalityTone}
          </p>
        )}
      </div>

      <div>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="knowledge-base"
        >
          Select File Batch
        </label>
        <div className="relative">
          <select
            className={`appearance-none block w-full bg-gray-100 text-gray-700 border ${
              errors.selectedBatch ? "border-red-500" : "border-gray-300"
            } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500`}
            id="knowledge-base"
            value={selectedBatch?.files.name}
            onChange={handleBatchSelection}
            ref={selectRef}
          >
            <option value="">Select File Batch</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.name}>
                {batch.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            {isLanguageDropDownOpen ? (
              <ChevronUpIcon className="h-4 w-4 text-gray-700" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-gray-700" />
            )}
          </div> 
        </div>
        <div className="flex flex-row gap-2 pt-2">
          {selectedBatch?.files.map((data: any) => (
            <kbd
              key={uuidv4()} // Use a unique identifier or fallback to index
              className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
            >
              {data.name}
            </kbd>
          ))}
        </div>

        {errors.selectedBatch && (
          <p className="text-red-500 text-xs italic">{errors.selectedBatch}</p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Submit
      </button>
    </form>
  );
};

export default BotStudio;
