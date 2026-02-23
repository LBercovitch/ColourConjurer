import { useEffect, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";

import UploadImage from "../icons/UploadImage";

interface FileWithPreview extends File {
  preview: string;
}

function ImageDropzone() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  // Initialize the dropzone
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  // Clear files
  const removeImage = () => {
    setFiles([]);
  };

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <img
        src={file.preview}
        className="block w-auto max-h-150"
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="flex justify-center">
      <div
        {...getRootProps()}
        className={`
          ${files.length == 0 ? "flex" : "hidden"}
          flex-col items-center justify-center p-5 border-2 border-dashed
          rounded-2xl bg-gray-50 text-gray-400 transition-colors duration-200
          text-center m-5 w-full min-h-100
          ${isFocused ? "border-blue-500" : "border-gray-300"}
          ${isDragAccept ? "border-green-400" : ""}
          ${isDragReject ? "border-red-500 bg-red-500/10" : ""}
        `}
      >
        {/* The dropzone input */}
        <input {...getInputProps()} />

        {/* Error message for rejected files */}
        {(fileRejections.length > 0 || isDragReject) && (
          <em className="text-xl font-semibold">
            Only *.png, *.jpg, *.jpeg, *.gif, and *.webp files are accepted.
          </em>
        )}

        {/* Dropzone Content */}
        <div className="w-30 my-10">
          <UploadImage />
        </div>
        <p className="text-xl">Drop an image to begin</p>
        <p className="text-sm">or click to browser files</p>
      </div>
      <div
        className={`${files.length == 0 ? "hidden" : "block"} border-2 border-gray-300 rounded-2xl relative w-fit`}
      >
        <button
          onClick={removeImage}
          className="absolute z-10 right-5 top-5 cursor-pointer border-2 rounded-full text-4xl pb-2 w-13 bg-neutral-50"
        >
          &times;
        </button>
        {thumbs}
      </div>
    </section>
  );
}

export default ImageDropzone;
