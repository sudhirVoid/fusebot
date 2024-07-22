import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

interface DragDropProps {
  onDrop: (files: File[]) => void;
  accept?: string; // Optional file types to accept
  maxSize: number; // Maximum file size in bytes
  maxFiles?: number; // Maximum number of files allowed (default: 1)
}

const DragDrop: React.FC<DragDropProps> = ({
  onDrop,
  accept = '.pdf,.doc,.docx,.txt', // Default accepted file types
  maxSize,
  maxFiles = 1,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default browser handling of drop
    setIsDragActive(false); // Reset drag state

    const acceptedTypes = accept.split(',').map(type => type.trim());
    const acceptedFiles = Array.from(event.dataTransfer.files).filter(
      (file) => file.size <= maxSize && acceptedTypes.includes(file.name.split('.').pop() || '')
    );

    if (acceptedFiles.length > maxFiles) {
      console.error(`Maximum ${maxFiles} files allowed.`);
      return;
    }

    setFiles(acceptedFiles);
    onDrop(acceptedFiles); // Pass accepted files to parent component
  };

  // Handle drag enter
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default browser handling of drag enter
    setIsDragActive(true);
  };

  // Handle drag leave
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default browser handling of drag leave
    setIsDragActive(false);
  };

  // Handle file input change (click-to-upload)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    const acceptedTypes = accept.split(',').map(type => type.trim().split('.')[1]);

    if (newFiles && newFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed.`);
      return;
    }

    const acceptedFiles = Array.from(newFiles || []).filter(
      (file) => {
        if(file.size > maxSize) toast.error(`${file.name} is more than 10 MB.`);
        return file.size <= maxSize && acceptedTypes.includes(file.name.split('.')[1] || '')
      }
    );
    setFiles(acceptedFiles);
    onDrop(acceptedFiles); // Pass accepted files to parent component
  };

  // Trigger file input click
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ${
        isDragActive ? 'bg-gray-200 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick} // Add click handler
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {accept ? `Supported formats: ${accept.replace(/\./g, '').toUpperCase()}` : 'PDF, DOC, DOCX, TXT'} (MAX.
          {maxSize} bytes)
        </p>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          multiple={maxFiles > 1}
          accept={accept}
          onChange={handleInputChange}
          ref={fileInputRef} // Attach ref
        />
      </div>
    </div>
  );
};

export default DragDrop;
