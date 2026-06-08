import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useColour } from './ColourContext';

import UploadImage from "../icons/UploadImage";
import InteractiveCanvas from "./InteractiveCanvas";

interface FileWithPreview extends File {
  preview: string;
}

function ImageDropzone() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { colourHex, setColourHex } = useColour();

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
      "image/bmp": [".bmp"],
      "image/gif": [".gif"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"]
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
    setColourHex([]);
  };

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <InteractiveCanvas file={file} />
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
          flex-col items-center justify-center p-5 mx-5 w-100 h-100
          border-10 rounded-2xl text-center
          ${isDragAccept ? "text-amber-100 border-amber-600 bg-amber-100/10" :
            "text-indigo-300 border-indigo-600 bg-indigo-600/10" }
          ${isDragReject ? "text-red-400 border-red-500 bg-red-500/10" : ""}
        `}
      >
        {/* The dropzone input */}
        <input {...getInputProps()} />

        {/* Error message for rejected files */}
        {(fileRejections.length > 0 || isDragReject) && (
          <em className="text-xl font-semibold">
            Only the following image formats are accepted:
            *.bmp, *.gif, *.jpeg, *.jpg, *.png, *.webp
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
        className={`${files.length == 0 ? "hidden" : "block"} relative w-auto max-w-[calc(100%)] md:max-w-[calc(50%)]`}
      >
        <button
          onClick={removeImage}
          className="cursor-pointer absolute z-10 right-10 top-5 pb-2 w-10 h-10
            border-3 rounded-full text-4xl/4 text-neutral-700 bg-neutral-50
            hover:text-neutral-800 hover:bg-neutral-200"
        >
          &times;
        </button>
        {thumbs}
      </div>
    </section>
  );
}

export default ImageDropzone;
